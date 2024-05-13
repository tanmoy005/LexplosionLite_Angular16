import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank/blank.component';
import { InitialLayoutComponent } from './layouts/initial-layout/initial-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    //redirectTo: '/dashboard',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  

  // {
  //   path: '',
  //   component: BlankComponent,
  
  //   children: [
  
  //     {
  //       path: '',
  //       loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  //     }
  //   ]
  // },
  {
    path: '',
    component: BlankComponent,
  
    children: [
  
      {
        path: '',
        loadChildren: () => import('./user-onboard/user-onboard.module').then(m => m.UserOnboardModule)
      }
    ]
  },
  {
    path: '',
    component: InitialLayoutComponent,
  
    children: [
  
      {
        path: '',
        loadChildren: () => import('./guest-user/guest-user-module.module').then(m => m.GuestUserModuleModule)
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
     
      {
        path: 'component',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
 

];
