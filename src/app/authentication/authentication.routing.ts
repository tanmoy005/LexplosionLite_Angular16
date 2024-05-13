import { Routes } from '@angular/router';

import { AppSideRegisterComponent } from './register/register.component';
import { AppSideLoginComponent } from '../guest-user/login/login.component';

import { VerifyEmailPageComponent } from './register/verify-email-page/verify-email-page.component';

export const AuthenticationRoutes: Routes = [
 
  }, {
    path: 'login',
    component: AppSideLoginComponent,
  {
    path: 'register',
    component: AppSideRegisterComponent,
  },
  {
    path: 'verify-email',
    component: VerifyEmailPageComponent,
  },

];

