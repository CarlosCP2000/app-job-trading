import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {OutlineIconsModule, SolidIconsModule} from "@dimaslz/ng-heroicons";
import {Subscription} from "rxjs";
import {LoadingScreenComponent} from "../../core/components/loading-screen/loading-screen.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule,
        OutlineIconsModule,
        LoadingScreenComponent,
        NgIf
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  loadingForm: boolean = false;

  private _subscription = new Subscription();
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  constructor() {
  }

}
