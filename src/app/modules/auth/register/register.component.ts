import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import { UserService } from '../../../services/user/user.service';
import {AlertForm, RegisterRequest, User} from '../../../models/user';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent implements OnInit{

  public registerForm: FormGroup;

  public alertForm: AlertForm;
  public loadingForm: boolean;

  private _subscription = new Subscription();

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
  }


  public user: RegisterRequest = {
    username: '',
    name: '',
    lastname: '',
    password: '',
    email_notifications: '',
    identification_type: '',
    identification_number: ''
  }

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email_notifications: ['', Validators.required],
      identification_type: ['', Validators.required],
      identification_number: ['', Validators.required],
    });
    this.catchTokenUrl();
    this.alertForm = {type:'', message: '', visible:false};
    this.loadingForm = false;
  }


  onSendForm() {
    this.loadingForm = true;
    //this.generateTransaction();

    const formValue = this.registerForm.value;
    this.user = {
      ...this.user,
      username: formValue.username,
      password: formValue.password,
      name: formValue.name,
      lastname: formValue.lastname,
      email_notifications: formValue.username,
      identification_type: formValue.identification_type,
      identification_number: formValue.identification_number,
    };

    this._subscription.add(
      this.userService.createUser(this.user).subscribe(
        (res) => {
          this.loadingForm = false;
          if (res.error || !this.registerForm.valid) {
            this.alertForm = {
              type: 'error',
              visible: true,
              message: 'Error al crear usuario'
            }
          } else {
            this.alertForm = {
              type: 'success',
              visible: true,
              message: 'Usuario registrado'
            }
          }
        }
      ));
  }

  catchTokenUrl(){
    const urlData = new URL(window.location.href);
    const token = urlData.searchParams.get('token');
    if(token) {
      sessionStorage.setItem('access-token',token);
    }
  }


}

