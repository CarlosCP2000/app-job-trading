import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertForm, LoginRequest, ResponseLogin} from '../../../models/auth';
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import CryptoJS from 'crypto-js';
import {AuthService} from '../../../services/auth/auth.service';

import {NgIf} from "@angular/common";
import {LoadingScreenComponent} from "../../../core/components/loading-screen/loading-screen.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingScreenComponent,
    SolidIconsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  public alertForm: AlertForm;
  public loadingForm: boolean;
  public errorMessage: string | null = null;
  private _subscription = new Subscription();
  public showAlert: boolean = false;

  public passwordVisible: boolean = false;

  public user: LoginRequest = {
    email: '',
    password: ''
  };

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    sessionStorage.removeItem('access-token');
  }

  constructor(private fb: FormBuilder, private router: Router, private AuthService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.alertForm = {type: '', message: '', visible: false};
    this.loadingForm = false;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  private generateRandomIV(): string {
    const iv = CryptoJS.lib.WordArray.random(16);
    const ivHex = iv.toString(CryptoJS.enc.Hex);
    return ivHex;
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
      email: formValue.email,
      password: formValue.password,
    };

    this._subscription.add(
      this.AuthService.loginUser(this.user).subscribe({
        next: (res) => {
          if (res.error) {
            this.errorMessage = 'Error al iniciar sesión';
            return;
          }
          this.catchTokenUrl(res)
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loadingForm = false;
          console.error('Error al iniciar sesión:', err);
          this.errorMessage = 'Error al iniciar sesión';
          this.showTemporaryAlert();
        },
        complete: () => {
          this.loadingForm = false;
        }

      })
    );
  }

  showTemporaryAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false; // Oculta la alerta después de 3 segundos
    }, 3000); // Tiempo en milisegundos (3000 ms = 3 segundos)
  }

  catchTokenUrl(res: ResponseLogin) {
    const token = res.data.token;
    if (token) {
      sessionStorage.setItem('access-token', token);
    }
  }

}
