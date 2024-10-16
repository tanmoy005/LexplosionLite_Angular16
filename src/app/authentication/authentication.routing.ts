import { Routes } from '@angular/router';
import { AppSideRegisterComponent } from './register/register.component';
import { VerifyEmailPageComponent } from './register/verify-email-page/verify-email-page.component';
import { loginGuard } from '../login.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: 'register',
    component: AppSideRegisterComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailPageComponent,
    //canActivate: [loginGuard],
  },
];
