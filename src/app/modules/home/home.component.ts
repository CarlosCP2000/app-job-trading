import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {OutlineIconsModule, SolidIconsModule} from "@dimaslz/ng-heroicons";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule,
        OutlineIconsModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private _subscription = new Subscription();
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  constructor() {
  }

}
