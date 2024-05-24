import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgHeroiconsModule, SolidIconsModule} from "@dimaslz/ng-heroicons";

@Component({
  selector: 'app-register-work',
  standalone: true,
  imports: [
    RouterLink,
    SolidIconsModule,
    NgHeroiconsModule
  ],
  templateUrl: './register-work.component.html',
  styleUrl: './register-work.component.scss'
})
export class RegisterWorkComponent {

}
