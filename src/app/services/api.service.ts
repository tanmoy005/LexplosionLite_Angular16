import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SnackbarService } from '../shared/snackbar.service';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import {
  demoKomriskFeaturesListInterface,
  demoKomriskAndKomriskLiteAPIFeaturesList,
} from './../shared/menu-items/demokomriskFeaturesList';
import { StateListInterface, StateList } from '../shared/menu-items/state-list';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://enginebackendqa.komrisk.com/v1/';

  private endpoints = {
    userLogin: 'login',
    createCompany: 'company',
    fetchCompanyList: 'company/list',
    createUser: 'user',
    addEntity: 'entity-details/entity',
    fetchEntityList: 'entity-details/entity/list',
    addOperatingUnit: 'entity-details/operating-unit',
    fetchOperatingUnit: 'entity-details/operating-unit/list',
    applicableLaws: 'entity-details/applicable-laws',
    entityTree: 'entity-details/entity/tree',
    definition: 'definition',
    sendOTP: 'verification/send-otp',
    verifyOTP: 'verification/verify-otp',
  };

  private endpointsWithoutAuthToken = [
    this.endpoints.userLogin,
    this.endpoints.definition,
  ];

  constructor(private http: HttpClient, private snackBar: SnackbarService) {}

  getAuthToken() {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    const { token } = encryptStorage.getItem('login-details');
    return token;
  }

  private postData(apiUrl: string, data: any): Observable<any> {
    var headerJSON;

    if (this.endpointsWithoutAuthToken.includes(apiUrl)) {
      headerJSON = { 'Content-Type': 'application/json' };
    } else {
      headerJSON = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      };
    }
    return this.http
      .post<any>(`${this.baseUrl}/${apiUrl}`, data, { headers: headerJSON })
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.snackBar.showError(error?.error);
          return throwError(() => new Error(error?.error));
        })
      );
  }

  postLoginData(data: any): Observable<any> {
    return this.postData(this.endpoints.userLogin, data);
  }

  postCreateCompany(data: any): Observable<any> {
    return this.postData(this.endpoints.createCompany, data);
  }

  postFetchCompanyList(data: any): Observable<any> {
    return this.postData(this.endpoints.fetchCompanyList, data);
  }

  postCreateUser(data: any): Observable<any> {
    return this.postData(this.endpoints.createUser, data);
  }

  postSendOTP(data: any): Observable<any> {
    return this.postData(this.endpoints.sendOTP, data);
  }

  postVerifyOTP(data: any): Observable<any> {
    return this.postData(this.endpoints.verifyOTP, data);
  }

  postCreateEntity(data: any): Observable<any> {
    return this.postData(this.endpoints.addEntity, data);
  }

  postFetchEntityList(data: any): Observable<any> {
    return this.postData(this.endpoints.fetchEntityList, data);
  }

  fetcheOperatingUnit(data: any): Observable<any> {
    return this.postData(this.endpoints.fetchOperatingUnit, data);
  }

  postCreateOperatingUnit(data: any): Observable<any> {
    return this.postData(this.endpoints.addOperatingUnit, data);
  }

  postApplicableLaws(data: any): Observable<any> {
    return this.postData(this.endpoints.applicableLaws, data);
  }

  postEntityTree(data: any): Observable<any> {
    return this.postData(this.endpoints.entityTree, data);
  }

  getFieldDefinition(data: any): Observable<any> {
    return this.postData(this.endpoints.definition, data);
  }
  getDemoKomriskFeatureData(): demoKomriskFeaturesListInterface {
    return demoKomriskAndKomriskLiteAPIFeaturesList;
  }
  getDemoStateData(id: number): StateListInterface | undefined {
    return StateList.find((item) => item.id === id);
  }
}
