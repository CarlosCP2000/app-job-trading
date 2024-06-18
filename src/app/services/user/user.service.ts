import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {LoginRequest, RegisterRequest, ResponseLogin, ResponseUser, User} from '../../models/user';
import {EnvServiceProvider} from "../env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlCreateUser: string = 'http://localhost:55000/api/v1/auth/' + 'register';

  private urlLoginUser: string = 'http://localhost:55000/api/v1/auth/' + 'login';

  constructor(private _http: HttpClient) { }

  public createUser(user: RegisterRequest): Observable<ResponseUser> {
    return this._http.post<ResponseUser>(this.urlCreateUser, user).pipe(map(response => response));
  }

  public loginUser(user: LoginRequest): Observable<ResponseLogin> {
    return this._http.post<ResponseLogin>(this.urlLoginUser, user).pipe(map(response => response));
  }
}
