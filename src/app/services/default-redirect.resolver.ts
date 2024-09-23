// import { ResolveFn } from '@angular/router';

// export const defaultRedirectResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };

// import { ResolveFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from './Auth-Service';

// export const defaultRedirectResolver: ResolveFn<string> = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   //return true;

//   // Check if the user is authenticated
//   if (authService.isAuthenticated()) {
//     console.log('is authenticated', true);
//     return '/entity-details';
//   } else {
//     console.log('is authenticated', false);
//     return '/home';
//   }
// };

import { Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
// import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './Auth-Service';

export const loginResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = new AuthService();
  const router = new Router();

  if (authService.isAuthenticated()) {
    console.log('authenticated');
    router.navigate(['/dashboard']);
    return null;
  } else {
    console.log('not authenticated');
    router.navigate(['/login']);
    return null;
  }
};
