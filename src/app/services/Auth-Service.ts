import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private encryptStorage = new EncryptStorage(environment.localStorageKey);

  constructor() {}

  getAuthToken(): string | null {
    const { token } = this.encryptStorage.getItem('login-details') || {};
    return token || null;
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
