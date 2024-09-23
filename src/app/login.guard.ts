import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './services/Auth-Service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedUrls = [
    '/entity-details',
    '/laws',
    '/payment',
    'golive',
    '/subscription',
  ];

  if (authService.isAuthenticated()) {
    router.navigate(['/entity-details']);
    return false;
  } else {
    return true;
  }

  //router.navigate(['/home']);
  // return true;
};

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from './services/Auth-Service';

// export const loginGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   const allowedUrls = [
//     '/entity-details',
//     '/laws',
//     '/payment',
//     '/golive',
//     '/subscription',
//   ];
//   if (authService.isAuthenticated()) {
//     if (!allowedUrls.includes(state.url)) {
//       router.navigate(['/entity-details']);
//       return false;
//     } else {
//       // router.navigateByUrl(state.url);
//       return false;
//     }
//   }

//   return true;
// };
