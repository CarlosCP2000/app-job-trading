import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SolidIconsModule} from "@dimaslz/ng-heroicons";

@Component({
  selector: 'app-register-work',
  standalone: true,
    imports: [
        RouterLink,
        SolidIconsModule
    ],
  templateUrl: './register-work.component.html',
  styleUrl: './register-work.component.scss'
})
export class RegisterWorkComponent {

}
