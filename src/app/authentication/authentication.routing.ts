import { Routes } from '@angular/router';

import { AppSideRegisterComponent } from './register/register.component';
import { AppSideLoginComponent } from './login/login.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent,
  },
  {
    path: 'register',
    component: AppSideRegisterComponent,
  },

];

