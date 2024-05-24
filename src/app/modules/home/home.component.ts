import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
