import {inject, Injectable} from '@angular/core';
import {encryptText} from "../../core/utils/crypto/cypher";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest, RegisterRequest, ResponseLogin, ResponseUser} from "../../models/auth";
import {EnvServiceProvider} from "../env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpClient: HttpClient = inject(HttpClient);
  constructor(){}

  private urlCreateUser: string = EnvServiceProvider.useFactory().ENGINE_AUTH + '/register';

  private urlLoginUser: string = EnvServiceProvider.useFactory().ENGINE_AUTH + '/login';

  public createUser(user: RegisterRequest): Observable<ResponseUser> {
    return this._httpClient.post<ResponseUser>(this.urlCreateUser, user);
  }

  public loginUser(value: LoginRequest) : Observable<ResponseLogin>{
    const data = {
      username: value.username,
      password: encryptText(value.password, '123456789%'),
    };

    return this._httpClient.post<ResponseLogin>(this.urlLoginUser, data);
  }

  public getUserId(): void {

    const token = localStorage.getItem('Token') || '';
    const [header, payload, signature] = token.split('.');
    const payloadDecoded = window.atob(payload);
    const payloadObj = JSON.parse(payloadDecoded);

    return payloadObj.user.id;
  }
}
