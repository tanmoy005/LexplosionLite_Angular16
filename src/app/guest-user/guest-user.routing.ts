import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppSideLoginComponent } from './login/login.component';


export const GuestUserRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: AppSideLoginComponent,
  }
];
