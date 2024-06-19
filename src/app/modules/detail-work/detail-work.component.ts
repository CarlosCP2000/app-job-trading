import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";

@Component({
  selector: 'app-detail-work',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule
    ],
  templateUrl: './detail-work.component.html',
  styleUrl: './detail-work.component.scss'
})
export class DetailWorkComponent {

}
