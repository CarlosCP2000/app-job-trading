import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";

@Component({
  selector: 'app-request-sent',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule
  ],
  templateUrl: './request-sent.component.html',
  styleUrl: './request-sent.component.scss'
})
export class RequestSentComponent {

}
