import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank/blank.component';
import { InitialLayoutComponent } from './layouts/initial-layout/initial-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    //redirectTo: '/dashboard',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: InitialLayoutComponent,
    children: [
  
      {
        path: '',
        loadChildren: () => import('./guest-user/guest-user.module').then(m => m.GuestUserModule)
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: InitialLayoutComponent,
  
    children: [
  
      {
        path: '',
        loadChildren: () => import('./guest-user/guest-user.module').then(m => m.GuestUserModule)
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
     
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
 

];
