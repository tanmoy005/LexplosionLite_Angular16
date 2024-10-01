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
    router.navigate(['/dashboard']);
  } else {
    router.navigate(['/login']);
  }
  return null;
};
