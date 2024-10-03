import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

// interface TokenResponse {
//   newToken: string;
// }

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
    const token = this.encryptStorage.getItem('token');
    return token;
    // return this.token;
  }

  setToken(token: string): void {
    this.encryptStorage.setItem('token', token);
  }

  refreshToken(): Observable<TokenResponse> {
    // Call the API to get a new token
    return this.http
      .post<TokenResponse>(`${this.refreshTokenUrl}`, {
        tokenData: {
          access_token: this.encryptStorage.getItem('token'),
        },
      })
      .pipe(
        tap((response: TokenResponse) => {
          this.setToken(response.tokenData.access_token);
        })
      );
  }

  logout(): void {
    //this.token = null;
    //const encryptStorage = new EncryptStorage(environment.localStorageKey);
    this.encryptStorage.removeItem('token');
    //localStorage.removeItem('refreshToken');
  }
}
