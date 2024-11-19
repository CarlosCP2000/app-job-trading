import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";
import {LoadingScreenComponent} from "../../core/components/loading-screen/loading-screen.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-published-success',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule,
        LoadingScreenComponent,
        NgIf
    ],
  templateUrl: './published-success.component.html',
  styleUrl: './published-success.component.scss'
})
export class PublishedSuccessComponent {

}
