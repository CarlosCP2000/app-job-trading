import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {OnboardingComponent} from "./modules/auth/onboarding/onboarding.component";
import {HomeComponent} from "./modules/home/home.component";
import {CategoriesComponent} from "./modules/categories/categories.component";
import {RegisterWorkComponent} from "./modules/register-work/register-work.component";

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
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'register-work',
    component: RegisterWorkComponent
  }
];
