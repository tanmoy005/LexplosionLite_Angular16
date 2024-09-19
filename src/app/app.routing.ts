import { UserOnboardModule } from './user-onboard/user-onboard.module';
import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank/blank.component';
import { InitialLayoutComponent } from './layouts/initial-layout/initial-layout.component';
import { authGuard } from './auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    // pathMatch: 'prefix',
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
      },
    ],
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
        canActivate: [authGuard],
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
];
