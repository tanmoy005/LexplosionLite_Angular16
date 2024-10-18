import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

interface TokenResponse {
  tokenData: {
    access_token: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string | null = null;
  private refreshTokenUrl =
    'https://enginebackendqa.komrisk.com/v1/refreshToken';

  constructor(private http: HttpClient) {}

  private encryptStorage: EncryptStorage = new EncryptStorage(
    environment.localStorageKey
  );
  getToken(): string | null {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    const token = encryptStorage.getItem('token');
    return token;
  }

  setToken(token: string): void {
    this.encryptStorage.setItem('token', token);
  }

  refreshToken(): Observable<TokenResponse> {
    // Call the API to get a new token
    console.log('refresh token api called');
    return this.http
      .post<TokenResponse>(`${this.refreshTokenUrl}`, {
        tokenData: {
          access_token: this.encryptStorage.getItem('token'),
        },
      })
      .pipe(
        tap((response: any) => {
          this.setToken(response.msg);
        })
      );
  }

  logout(): void {}
}
