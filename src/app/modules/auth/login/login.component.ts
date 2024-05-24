import { Component } from '@angular/core';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgHeroiconsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
