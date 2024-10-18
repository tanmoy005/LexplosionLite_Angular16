import { Routes } from '@angular/router';

import { BlankComponent } from './layouts/blank/blank/blank.component';
import { InitialLayoutComponent } from './layouts/initial-layout/initial-layout.component';
import { NewUserVerificationComponent } from './user-onboard/new-user-verification/new-user-verification.component';
import { loginGuard } from './login.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    //canActivate: [redirectGuard],
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./user-onboard/user-onboard.module').then(
            (m) => m.UserOnboardModule
          ),
      },
    ],
  },
  {
    path: '',
    component: InitialLayoutComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./guest-user/guest-user.module').then(
            (m) => m.GuestUserModule
          ),
        canActivate: [loginGuard],
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: 'verify',
    component: NewUserVerificationComponent,
  },
];
