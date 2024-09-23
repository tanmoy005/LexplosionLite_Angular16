import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/Auth-Service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    console.log('the authentication is true');
    router.navigate(['/entity-details']);
    return false;
  } else {
    console.log('the authentication is false');
    router.navigate(['/home']);
    return false;
  }
};
