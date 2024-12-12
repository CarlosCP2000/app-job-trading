import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {EnvServiceProvider} from "../env/env.service.provider";
import {Observable} from "rxjs";
import {
  ImageOffer,
  Offer,
  RequestCreateOffer,
  RequestListOffer, RequestOfferRequest,
  ResponseCategory,
  ResponseCreateOffer, ResponseImageOffer, ResponseOffer, ResponseOfferRequest,
  ResponseOffers
} from "../../models/offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private _httpClient: HttpClient = inject(HttpClient);
  constructor(){}

  private urlSelectOffers: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offers';

  private urlCreateOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer';

  private urlUpdateOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/update';

  private urlDeleteOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/delete';

  private urlGetCategory: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/category';

  private urlSelectOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/getInfo';

  private urlSelectImagesOffer: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/image';

  private urlRequestOfferId: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/request';

  private urlAssignOfferId: string = EnvServiceProvider.useFactory().ENGINE_OFFER + '/offer/assign';

  private selectTokens() {
    let token = sessionStorage.getItem('access-token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public createOffer(data: RequestCreateOffer): Observable<ResponseCreateOffer> {
    let headers = this.selectTokens();
    return this._httpClient.post<ResponseCreateOffer>(this.urlCreateOffer, data, {headers});
  }

  public selectOffers(): Observable<ResponseOffers> {
    let headers = this.selectTokens();
    return this._httpClient.get<ResponseOffers>(this.urlSelectOffers, {headers});
  }
  public selectOffersByUser(data: RequestListOffer): Observable<ResponseOffers> {
    let headers = this.selectTokens();
    let params = new HttpParams({fromObject: {...data}});
    return this._httpClient.get<ResponseOffers>(this.urlSelectOffers, {headers, params});
  }

  public selectOffer(id: number): Observable<ResponseOffer> {
    let headers = this.selectTokens();
    return this._httpClient.get<ResponseOffer>(this.urlSelectOffer+'/'+id, {headers});
  }

  public selectImagesOffer(id: number): Observable<ResponseImageOffer>{
    let headers = this.selectTokens();
    return this._httpClient.get<ResponseImageOffer>(this.urlSelectImagesOffer+'/'+id, {headers});
  }

  public selectCategory(): Observable<ResponseCategory>{
    let headers = this.selectTokens();
    return this._httpClient.get<ResponseCategory>(this.urlGetCategory,{headers});
  }

  public requestOfferId(data: RequestOfferRequest) {
    let headers = this.selectTokens();
    return this._httpClient.post<ResponseOfferRequest>(this.urlRequestOfferId, data, {headers});
  }

  public getUserId(): string {

    const token = sessionStorage.getItem('access-token') || '';
    const [header, payload, signature] = token.split('.');
    const payloadDecoded = window.atob(payload);
    const payloadObj = JSON.parse(payloadDecoded);

    return payloadObj.user.id;
  }

  private id: number = 0;
  public setIdOffer(id: number) {
    this.id = id;
    console.log("Number",this.id)
  }
  public getIdOffer() {
      return this.id;
  }

}
