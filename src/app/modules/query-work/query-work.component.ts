import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";

@Component({
  selector: 'app-query-work',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule
  ],
  templateUrl: './query-work.component.html',
  styleUrl: './query-work.component.scss'
})
export class QueryWorkComponent {

}
