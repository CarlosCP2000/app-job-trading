import { Component, ChangeDetectorRef} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import {Subscription} from "rxjs";
import {OfferService} from "../../services/offer/offer.service";
import {ImageOffer, Offer, OfferRequest, RequestOfferRequest, ResponseOffer} from "../../models/offer";
import {NgForOf, NgIf} from "@angular/common";
import {LoadingScreenComponent} from "../../core/components/loading-screen/loading-screen.component";

@Component({
  selector: 'app-detail-work',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule,
    NgIf,
    NgForOf,
    LoadingScreenComponent
  ],
  templateUrl: './detail-work.component.html',
  styleUrl: './detail-work.component.scss'
})
export class DetailWorkComponent {

  private _subscription = new Subscription();
  public offer!: Offer;
  public imagesOffer: ImageOffer[] = [];
  public loadingForm = true;

  public errorMessage: string = '';
  public isErrorModalOpen = false;

  public requestOfferRequest: RequestOfferRequest = {
    offer_id: 0,
    user_id: ''
  };

  public offerRequest: OfferRequest = {
    id: 0,
    offer_id: 0,
    user_id: '',
    status: 0,
    created_at: new Date(),
    updated_at: new Date()
  }

  isModalOpen = false;
  selectedIndex = 0;


  constructor(private offerService: OfferService, private cdr: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    this.getParams();
    const offerId = sessionStorage.getItem('selectedOfferId');

    this.requestOfferRequest.user_id = this.offerService.getUserId();

    if (offerId && !isNaN(Number(offerId))) {
      this.requestOfferRequest.offer_id = Number(offerId);
      this.getOffer(Number(offerId));
    } else {
      console.error("No se pudo recuperar un ID válido de la oferta.");
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private getParams(): void {
    const urlData = new URL(document.location.toString());
    const ObjectToken = urlData.searchParams.get('token');
    if (ObjectToken) sessionStorage.setItem('access-token', ObjectToken);
  }

  public getOffer(id: number): void {
    this.loadingForm = true;
    this._subscription.add(
      this.offerService.selectOffer(id).subscribe({
        next: (data) => {
          this.offer = data.data.offer;
        },
        error: (err) => {
          console.error('Error:', err);
        },
        complete: () => {
          console.log('complete');
        }
      })
    );


    this._subscription.add(
      this.offerService.selectImagesOffer(id).subscribe({
        next: (data) => {
          this.imagesOffer = data.data.offer_images.filter(image => image.image !== '');
        },
        error: (err) => {
          console.error('Error:', err);
          this.loadingForm = false;
        },
        complete: () => {
          console.log('complete');

          this.cdr.detectChanges();
          this.loadingForm = false;

        }
      })
    );
  }

  public onSendRequest(): void{

    this.loadingForm = true;

    this._subscription.add(
      this.offerService.requestOfferId(this.requestOfferRequest).subscribe({
        next: (res) => {
          this.offerRequest = res.data;
          console.log("Request", this.offerRequest);
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorMessage = err;
          this.isErrorModalOpen = true;
          this.loadingForm = false;
        },
        complete: () => {
          console.log('complete');
          this.router.navigate(['/request-sent']);
          this.loadingForm = false;
        }
      })
    );
  }

  public closeErrorModal() {
    this.isErrorModalOpen = false;
  }

  openModal(index: number): void {
    this.selectedIndex = index;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  prevImage(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.imagesOffer.length - 1;
    }
  }

  nextImage(): void {
    if (this.selectedIndex < this.imagesOffer.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }


}
