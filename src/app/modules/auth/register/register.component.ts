import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from '../../../services/auth/auth.service';
import {AlertForm, RegisterRequest} from '../../../models/auth';
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import bcrypt from "bcryptjs";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    SolidIconsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public alertForm: AlertForm;
  public loadingForm: boolean;
  public errorMessage: string | null = null;
  private _subscription = new Subscription();

  private saltRounds = 10;

  public user: RegisterRequest = {
    username: '',
    name: '',
    lastname: '',
    password: '',
    email_notifications: '',
    identification_type: '',
    identification_number: '',
    favorite_phrase: ''
  };

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    localStorage.removeItem('Token');
  }

  constructor(private fb: FormBuilder, private router: Router, private AuthService: AuthService){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email_notifications: [''],
      identification_type: [''],
      identification_number: [''],
      favorite_phrase: [''],
    }, { validators: this.passwordMatchValidator });

    this.alertForm = { type: '', message: '', visible: false };
    this.loadingForm = false;
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { mismatch: true };
  };

  private encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    return bcrypt.hashSync(password, salt);
  }
  onSendForm() {

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.registerForm.markAllAsTouched()
      return;
    }

    this.loadingForm = true;
    const formValue = this.registerForm.value;

      this.user = {
        ...this.user,
        username: formValue.username,
        password: this.encryptPassword(formValue.password),
        name: formValue.name,
        lastname: formValue.lastname,
        email_notifications: formValue.username,
        identification_type: formValue.identification_type,
        identification_number: (Math.floor(Math.random() * (999999999 - 99999999 + 1)) + 99999999).toString(),
        favorite_phrase: formValue.favorite_phrase,
      };

      this._subscription.add(
        this.AuthService.createUser(this.user).subscribe({
          next: (res) => {
            if (res.error) {
              this.errorMessage = 'Error al iniciar sesión';
              return;
            }
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Hubo un error en el registro. Por favor, inténtelo de nuevo:', err);
            this.errorMessage = 'Hubo un error en el registro. Por favor, inténtelo de nuevo.';
          },
          complete: () => {
            this.loadingForm = false;
            console.log('completo')
          }
        }
        )
      );
  }

}
