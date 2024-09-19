// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './services/Auth-Service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //return true;
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);

    return false;
  }
};
