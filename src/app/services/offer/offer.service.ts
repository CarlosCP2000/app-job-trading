import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvServiceProvider} from "../env/env.service.provider";
import {Observable} from "rxjs";
import {RequestCreateOffer, Response, ResponseCreateOffer} from "../../models/offer";

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

  public createOffer(user: RequestCreateOffer): Observable<ResponseCreateOffer> {

    const token = localStorage.getItem('Token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<ResponseCreateOffer>(this.urlCreateOffer, user, {headers});
  }

}
