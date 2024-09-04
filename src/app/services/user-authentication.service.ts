import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SnackbarService } from '../shared/snackbar.service';
import { environment } from 'dotenv';
import { EncryptStorage } from 'encrypt-storage';
import { Router } from '@angular/router';
import { operatingUnitFetchDefinitions } from '../user-onboard/component-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  // CreateBusinessURL = 'https://enginebackendqa.komrisk.com/v1/company';
  // CreateUserURL = 'https://enginebackendqa.komrisk.com/v1/user';
  // loginURL = 'https://enginebackendqa.komrisk.com/v1/login';
  environment: any = environment;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackbar: SnackbarService,
    private router: Router,
    private opUnitFetchObj: operatingUnitFetchDefinitions
  ) {}

  // userRegistration(data: any): Observable<any> {
  //   return this.http.post(this.CreateBusinessURL, data);
  // }

  // userCreateUser(data: any): Observable<any> {
  //   return this.http.post(this.CreateUserURL, data);
  // }

  userLogin(data: any): Observable<any> {
    return this.apiService.postLoginData(data);
  }

  userRegistration(data: any): Observable<any> {
    return this.apiService.postCreateAdminCompany(data);
  }

  handleUserLogin(payload: any) {
    try {
      this.userLogin(payload).subscribe((response) => {
        this.snackbar.showSuccess('Login Successfull');
        const encryptStorage = new EncryptStorage(environment.localStorageKey);
        encryptStorage.setItem('login-details', response);
        this.opUnitFetchObj.fetchEntityOPUnitDefinitions();
        this.router.navigate(['/entity-details'], { state: { entity: '' } });
        // window.location.reload();
      });
    } catch (error) {
      this.snackbar.showError('Some error occurred while logging you in!');
    }
  }
  // postCreateAdminCompany(data: any): Observable<any> {
  //   return this.postData(this.endpoints.createAdminCompany, data);
  // }

  handleAdminUserCreation(payload: any) {
    try {
      this.userRegistration(payload).subscribe((response) => {
        this.snackbar.showSuccess('User Creation Successful!');
        const encryptStorage = new EncryptStorage(environment.localStorageKey);
        encryptStorage.setItem('login-details', response);
        this.opUnitFetchObj.fetchEntityOPUnitDefinitions();
        // this.router.navigate(['/entity-details'], { state: { entity: '' } });
        this.router.navigate(['/verify-email'], { state: payload });
      });
    } catch (error) {
      this.snackbar.showError('Some error occured while user creation !');
    }
  }
}

export class EntityService {}
