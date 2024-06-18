import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {RegisterComponent} from "./modules/auth/register/register.component";
import {OnboardingComponent} from "./modules/auth/onboarding/onboarding.component";
import {HomeComponent} from "./modules/home/home.component";
import {CategoriesComponent} from "./modules/categories/categories.component";
import {RegisterWorkComponent} from "./modules/register-work/register-work.component";
import {FilterWorkComponent} from "./modules/filter-work/filter-work.component";
import {QueryWorkComponent} from "./modules/query-work/query-work.component";
import {DetailWorkComponent} from "./modules/detail-work/detail-work.component";
import {PublishedSuccessComponent} from "./modules/published-success/published-success.component";
import {RequestSentComponent} from "./modules/request-sent/request-sent.component";

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
    component: HomeComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'register-work',
    component: RegisterWorkComponent
  },
  {
    path: 'filter-work',
    component: FilterWorkComponent
  },
  {
    path: 'query-work',
    component: QueryWorkComponent
  },
  {
    path: 'detail-work',
    component: DetailWorkComponent
  },
  {
    path: 'published-success',
    component: PublishedSuccessComponent
  },
  {
    path: 'request-sent',
    component: RequestSentComponent
  }
];
