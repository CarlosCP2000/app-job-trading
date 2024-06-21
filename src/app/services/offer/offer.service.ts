import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {EnvServiceProvider} from "../env/env.service.provider";
import {Observable} from "rxjs";
import {RequestCreateOffer, RequestListOffer, ResponseCreateOffer, ResponseOffers} from "../../models/offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private _httpClient: HttpClient = inject(HttpClient);
  constructor(){}

  private urlSelectOffers: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offers';

  private urlCreateOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/create';

  private urlUpdateOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/update';

  private urlDeleteOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/delete';


  private selectTokens() {
    let token = localStorage.getItem('Token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public createOffer(data: RequestCreateOffer): Observable<ResponseCreateOffer> {
    let headers = this.selectTokens();
    return this._httpClient.post<ResponseCreateOffer>(this.urlCreateOffer, data, {headers});
  }
  public selectOffers(data: RequestListOffer): Observable<ResponseOffers> {
    let headers = this.selectTokens();
    let params = new HttpParams({fromObject: {...data}});
    return this._httpClient.get<ResponseOffers>(this.urlSelectOffers, {headers, params});
  }

  public getUserId(): string {

    const token = localStorage.getItem('Token') || '';
    const [header, payload, signature] = token.split('.');
    const payloadDecoded = window.atob(payload);
    const payloadObj = JSON.parse(payloadDecoded);

    return payloadObj.user.id;
  }

}
