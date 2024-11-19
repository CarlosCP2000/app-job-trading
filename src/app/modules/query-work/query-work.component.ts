import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import {ImageOffer, Offer, RequestListOffer, ResponseImageOffer} from "../../models/offer";
import {OfferService} from "../../services/offer/offer.service";
import {Subscription} from "rxjs";
import {CategoryService} from "../../services/shared/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingScreenComponent} from "../../core/components/loading-screen/loading-screen.component";

@Component({
  selector: 'app-query-work',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule,
        NgIf,
        NgForOf,
        FormsModule,
        ReactiveFormsModule,
        LoadingScreenComponent
    ],
  templateUrl: './query-work.component.html',
  styleUrl: './query-work.component.scss'
})

export class QueryWorkComponent {

  @Input() info: RequestListOffer = {
    category: '',
    user_id: ''
  }

  public offers: Offer[] = [];
  private _subscription = new Subscription();
  searchTerm: string = '';
  loadingForm = true;


  constructor(private offerService: OfferService, private categoryService: CategoryService, private router: Router) {
    this.info.category = this.categoryService.getCategory();
    this.info.user_id = this.offerService.getUserId();
  }

  ngOnInit() {
    this.getParams();
    this.getOffers();
  }

  private getParams(): void {
    const urlData = new URL(document.location.toString());
    const ObjectToken = urlData.searchParams.get('token');
    if (ObjectToken) sessionStorage.setItem('access-token', ObjectToken);
  }

  public getOffers(): void {
    this.loadingForm = true;
    this._subscription.add(
      this.offerService.selectOffers(this.info).subscribe({
        next: (data) => {
          this.offers = data.data.offers.data;
          return this.offers;
        },
        error: (err) => {
          console.error('Error:', err);
        },
        complete: () => {
          console.log('complete');
          this.loadingForm = false;
        }
      })
    );
  }

  public selectOffer(id: number) {
    sessionStorage.setItem('selectedOfferId', id.toString());
    this.offerService.setIdOffer(id);
    this.router.navigate(['/detail-work']);
  }

  filteredOffers() {
    return this.offers.filter(offer =>
      offer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
