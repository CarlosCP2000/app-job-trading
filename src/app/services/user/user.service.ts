import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {RegisterRequest, ResponseUser, User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlCreateUser: string = 'http://localhost:3000/api/v1/auth/create';

  constructor(private _http: HttpClient) { }

  public createUser(user: RegisterRequest): Observable<ResponseUser> {
    return this._http.post<ResponseUser>(this.urlCreateUser, user).pipe(map(response => response));
  }
}
