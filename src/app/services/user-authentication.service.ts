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

  handleSaveAuthDetails(response: any) {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    encryptStorage.setItem('login-details', response);
    console.log('token from login', response.token);
    encryptStorage.setItem('token', response.token);
  }

  // handleUserLogin(payload: any) {
  //   try {
  //     this.userLogin(payload).subscribe((response) => {
  //       this.snackbar.showSuccess('Login Successfull');
  //       const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //       encryptStorage.setItem('login-details', response);
  //       this.opUnitFetchObj.fetchEntityOPUnitDefinitions();
  //       this.router.navigate(['/entity-details'], { state: { entity: '' } });
  //       // window.location.reload();
  //     });
  //   } catch (error) {
  //     this.snackbar.showError('Some error occurred while logging you in!');
  //   }
  // }

  handleUserLogin(payload: any) {
    this.userLogin(payload).subscribe({
      next: (response) => {
        this.snackbar.showSuccess('Login Successful');

        this.handleSaveAuthDetails(response);

        this.opUnitFetchObj.fetchEntityOPUnitDefinitions(() => {
          this.router.navigate(['/entity-details'], { state: { entity: '' } });
        });
      },
      error: () => {},
    });
  }

  // postCreateAdminCompany(data: any): Observable<any> {
  //   return this.postData(this.endpoints.createAdminCompany, data);
  // }

  // handleAdminUserCreation(payload: any) {
  //   try {
  //     this.userRegistration(payload).subscribe((response) => {
  //       this.snackbar.showSuccess('User Creation Successful!');
  //       const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //       encryptStorage.setItem('login-details', response);
  //       this.opUnitFetchObj.fetchEntityOPUnitDefinitions();
  //       // this.router.navigate(['/entity-details'], { state: { entity: '' } });
  //       this.router.navigate(['/verify-email'], { state: payload });
  //     });
  //   } catch (error) {
  //     this.snackbar.showError('Some error occured while user creation !');
  //   }
  // }
  handleAdminUserCreation(payload: any) {
    this.userRegistration(payload).subscribe({
      next: (response) => {
        this.snackbar.showSuccess('User Creation Successful!');
        // const encryptStorage = new EncryptStorage(environment.localStorageKey);
        // encryptStorage.setItem('login-details', response);
        // encryptStorage.setItem('token', response.token);
        this.handleSaveAuthDetails(response);

        // Provide a callback function
        this.opUnitFetchObj.fetchEntityOPUnitDefinitions(() => {
          this.router.navigate(['/verify-email'], { state: payload });
        });
      },
      error: () => {
        //this.snackbar.showError('Some error occurred while creating the user!');
      },
    });
  }
}

export class EntityService {}
