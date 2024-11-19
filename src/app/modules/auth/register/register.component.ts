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
import {LoadingScreenComponent} from "../../../core/components/loading-screen/loading-screen.component";


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
    imports: [
        ReactiveFormsModule,
        SolidIconsModule,
        RouterLink,
        NgIf,
        LoadingScreenComponent
    ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public alertForm: AlertForm;
  public loadingForm: boolean;
  public errorMessage: string | null = null;
  private _subscription = new Subscription();
  public showAlert: boolean = false;

  public passwordVisible: boolean = false;

  private saltRounds = 10;

  public user: RegisterRequest = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    identification_type: '',
    identification_number: '',
    favorite_phrase: '',
    cellphone: ''
  };

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    sessionStorage.removeItem('access-token');
  }

  constructor(private fb: FormBuilder, private router: Router, private AuthService: AuthService){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      identification_type: [''],
      identification_number: [''],
      favorite_phrase: [''],
      cellphone: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
    },{ validator: this.passwordMatchValidator });

    this.alertForm = { type: '', message: '', visible: false };
    this.loadingForm = false;
  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('password_confirmation');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  private encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  showTemporaryAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false; // Oculta la alerta después de 3 segundos
    }, 3000); // Tiempo en milisegundos (3000 ms = 3 segundos)
  }

  onSendForm() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos';
      console.log(this.errorMessage);
      this.registerForm.markAllAsTouched()
      return;
    }
    this.loadingForm = true;
    const formValue = this.registerForm.value;

      this.user = {
        ...this.user,
        name: formValue.name,
        lastname: formValue.lastname,
        email: formValue.email,
        password: formValue.password,
        password_confirmation: formValue.password,
        identification_type: 'DNI',
        identification_number: '-',
        favorite_phrase: '-',
        cellphone: formValue.cellphone,
      };

        this._subscription.add(
          this.AuthService.createUser(this.user).subscribe({
            next: (res) => {
              if (res && (res && res.error)) {
                this.errorMessage = 'Error al iniciar sesión';
                this.loadingForm = false;
                return;
              }
              this.router.navigate(['/login']);
            },
            error: (err) => {
              this.loadingForm = false;
              console.error('Hubo un error en el registro. Por favor, inténtelo de nuevo:', err);
              this.errorMessage = 'Hubo un error en el registro. Por favor, inténtelo de nuevo.';
              this.showTemporaryAlert();
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
