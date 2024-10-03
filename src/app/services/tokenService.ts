import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface TokenResponse {
  newToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string | null = null;
  private refreshTokenUrl = 'auth/refresh-token';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;

    localStorage.setItem('token', token);
  }

  refreshToken(): Observable<TokenResponse> {
    // Call the API to get a new token
    return this.http
      .post<TokenResponse>(`${this.refreshTokenUrl}`, {
        refreshToken: localStorage.getItem('refreshToken'),
      })
      .pipe(
        tap((response: TokenResponse) => {
          this.setToken(response.newToken);
        })
      );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
