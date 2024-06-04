import { Routes } from '@angular/router';
import { AppSideRegisterComponent } from './register/register.component';
import { VerifyEmailPageComponent } from './register/verify-email-page/verify-email-page.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'register',
    component: AppSideRegisterComponent,
  },
  {
    path: 'verify-email',
    component: VerifyEmailPageComponent,
  },
];
