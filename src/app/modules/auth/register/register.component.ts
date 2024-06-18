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
import {UserService} from '../../../services/user/user.service';
import {AlertForm, RegisterRequest, ResponseUser} from '../../../models/user';
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import bcrypt from 'bcryptjs';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    SolidIconsModule,
    RouterLink
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public alertForm: AlertForm;
  public loadingForm: boolean;
  public errorMessage: string | null = null;
  private _subscription = new Subscription();



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

  ngOnInit(): void { }

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email_notifications: ['', Validators.required],
      identification_type: ['DNI', Validators.required],
      identification_number: ['', Validators.required],
      favorite_phrase: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });

    this.catchTokenUrl();
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

  private async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);

    } catch (error) {
      console.error('Error al encriptar la contraseña:', error);
      throw error;
    }
  }

  async onSendForm() {
    this.loadingForm = true;
    const formValue = this.registerForm.value;

    try {
      this.user = {
        ...this.user,
        username: formValue.username,
        password: await this.encryptPassword(formValue.password),
        name: formValue.name,
        lastname: formValue.lastname,
        email_notifications: formValue.username,
        identification_type: formValue.identification_type,
        identification_number: formValue.identification_number,
        favorite_phrase: formValue.favorite_phrase,
      };

      this._subscription.add(
        this.userService.createUser(this.user).subscribe(
          (res) => {
            this.loadingForm = false;
            if (res.error) {
              this.errorMessage = res.msg;
            } else if (res.type === 'success') {
              this.router.navigate(['/home']);
            }
          },
          (error) => {
            this.loadingForm = false;
            this.errorMessage = 'Hubo un error en el registro. Por favor, inténtelo de nuevo.';
          }
        )
      );
    } catch (error) {
      console.error('Error al encriptar la contraseña:', error);
      this.loadingForm = false;
      this.errorMessage = 'Hubo un error al encriptar la contraseña. Por favor, inténtelo de nuevo.';
    }
  }

  catchTokenUrl() {
    const urlData = new URL(window.location.href);
    const token = urlData.searchParams.get('token');
    if (token) {
      sessionStorage.setItem('access-token', token);
    }
  }
}
