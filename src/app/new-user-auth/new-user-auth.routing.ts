import { Routes } from '@angular/router';
import { UserVerificationComponent } from './user-verification/user-verification.component';

export const NewUserAuthRoutes: Routes = [
  {
    path: 'userVerification',
    component: UserVerificationComponent,
  },
];
