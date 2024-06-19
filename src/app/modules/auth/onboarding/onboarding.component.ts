import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {

  private _subscription = new Subscription();
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    localStorage.removeItem('Token');
  }

  constructor() {
  }


}
