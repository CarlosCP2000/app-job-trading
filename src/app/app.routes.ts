import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {RegisterComponent} from "./modules/auth/register/register.component";
import {OnboardingComponent} from "./modules/auth/onboarding/onboarding.component";
import {HomeComponent} from "./modules/home/home.component";
import {CategoriesComponent} from "./modules/categories/categories.component";
import {RegisterWorkComponent} from "./modules/register-work/register-work.component";
import {AuthGuard} from "./core/guard/auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-work',
    component: RegisterWorkComponent,
    canActivate: [AuthGuard]
  }
];
