// import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { TokenService } from './tokenService';
import { Injectable } from '@angular/core';
import { SnackbarService } from '../shared/snackbar.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private tokenService: TokenService, private snackBar: SnackbarService) {}


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    console.log('the interceptor is called');
    // Attach the access token to the request
    if (token) {
      request = this.addTokenToRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        console.log('error12', error?.error?.error);
        this.snackBar.showError(
          error?.error?.error
        );
        return throwError(() => error?.error?.error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        //Authorization: `Bearer abcd`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.refreshToken().pipe(
        switchMap((response: any) => {
          const { msg } = response;
          this.isRefreshing = false;
          console.log('the token from refresh api', msg);

          this.tokenService.setToken(msg);

          this.refreshTokenSubject.next(msg);
          return next.handle(this.addTokenToRequest(request, msg));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          //this.tokenService.logout();

          return throwError(() => new Error(error?.error?.error));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    }
  }
}
