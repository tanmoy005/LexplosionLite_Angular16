import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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
    createAdminCompany: 'company',
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
    countriesForCompany: 'company/getCountriesForCompany',
    newUserVerification: 'verification/verify-email',
    fetchFeatures: 'definition/features-list',
    saveLaws: 'entity-details/entity-result/saveLawsKomriskLite',
    createWorkSpace: 'api/workspaces/createNewWorkSpace',
    getOrderDetails: 'komrisk/getOrderDetails',
    initiatePayment: 'initiate-payment',
    getRefreshToken: 'refreshToken',
  };

  private endpointsWithoutAuthToken = [
    this.endpoints.userLogin,
    this.endpoints.definition,
    this.endpoints.createAdminCompany,
    this.endpoints.newUserVerification,
  ];

  constructor(private http: HttpClient, private snackBar: SnackbarService) {}

  // getAuthToken() {
  //   const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //   const { token } = encryptStorage.getItem('login-details');
  //   return token;
  // }
  getAuthToken() {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    const token = encryptStorage.getItem('token');
    return token;
  }

  // getCompanyId() {
  //   const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //   const { token } = encryptStorage.getItem('login-details');
  //   return token;
  // }

  getCompanyId() {
    // Retrieve the login details from encrypted storage
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    const loginDetails = encryptStorage.getItem('login-details');

    const { user } = loginDetails;

    const companyId = user?.companies?.[0]?.id;

    if (companyId) {
      encryptStorage.setItem('company-id', companyId);
    } else {
    }
  }

  private setHeaderJson(apiUrl: string) {
    // var headerJSON;
    let headerJSON = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (!this.endpointsWithoutAuthToken.includes(apiUrl)) {
      // headerJSON = { 'Content-Type': 'application/json' };
      headerJSON = headerJSON.set(
        'Authorization',
        // `Bearer ${this.getAuthToken()}`
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImZpcnN0TmFtZSI6IkxleCIsImxhc3ROYW1lIjoiQWRtaW4iLCJuYW1lIjoiTGV4IEFkbWluIiwiZW1haWwiOiJhZG1pbkBsZXhwbG9zaW9uLmluIiwibW9iaWxlIjoiODcwOTQ3NDU1NiIsImNvbXBhbmllcyI6W3siaWQiOjQwNiwibmFtZSI6IkxFWFBMT1NJT04gTE9HSUMgVEVTVElORyAyLjAgZW5naW5lIiwiY29tcGFueUlkIjpudWxsLCJjb21wYW55VXJsIjpudWxsfV0sInJvbGUiOnsiaWQiOjEsImF1dGhvcml0eSI6IkxFWF9JVF9BRE1JTiIsIm1vZHVsZXMiOlt7ImlkIjoxLCJuYW1lIjoiVVNFUiBNQU5BR0VNRU5UIiwiY2FuQ3JlYXRlIjp0cnVlLCJjYW5SZWFkIjp0cnVlLCJjYW5VcGRhdGUiOnRydWUsImNhbkRlbGV0ZSI6dHJ1ZX0seyJpZCI6MywibmFtZSI6IkNPTVBBTlkgTUFOQUdFTUVOVCIsImNhbkNyZWF0ZSI6dHJ1ZSwiY2FuUmVhZCI6dHJ1ZSwiY2FuVXBkYXRlIjp0cnVlLCJjYW5EZWxldGUiOnRydWV9XX0sImlhdCI6MTcyNDIxOTc3NywiZXhwIjoxNzMxNDE5Nzc3fQ.GR2KxeVSrutpmap49LDR4pH_GJoUQ5lhiyMkFisNZNmoWyZ_ny9wcODblZGXGu0QHyIrC9RQonbFTLtl6WAauQ`
      );
    }
    return headerJSON;
  }
  private handleErrors<T>() {
    return catchError((error: HttpErrorResponse) => {
      this.snackBar.showError(error?.error?.error); // Assuming error?.error?.error has the actual error message
      return throwError(() => new Error(error?.error?.error)); // Forward the error
    });
  }
  private postData(apiUrl: string, data: any): Observable<any> {
    const headerJSON = this.setHeaderJson(apiUrl);
    return this.http
      .post<any>(`${this.baseUrl}/${apiUrl}`, data, { headers: headerJSON })
      .pipe(this.handleErrors());
  }
  private getData(apiUrl: string): Observable<any> {
    const headerJSON = this.setHeaderJson(apiUrl);
    return this.http
      .get<any>(`${this.baseUrl}/${apiUrl}`, { headers: headerJSON })
      .pipe(this.handleErrors());
  }

  postLoginData(data: any): Observable<any> {
    return this.postData(this.endpoints.userLogin, data);
  }

  postCreateAdminCompany(data: any): Observable<any> {
    return this.postData(this.endpoints.createAdminCompany, data);
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

  postCountriesforCompanies(data: any): Observable<any> {
    return this.postData(this.endpoints.countriesForCompany, data);
  }

  postNewUserVerification(data: any): Observable<any> {
    return this.postData(this.endpoints.newUserVerification, data);
  }
  postFetchFeatureList(data: any): Observable<any> {
    return this.postData(this.endpoints.fetchFeatures, data);
  }
  postSaveLawsList(data: any): Observable<any> {
    return this.postData(this.endpoints.saveLaws, data);
  }
  postCreateWorkSpace(data: any): Observable<any> {
    return this.postData(this.endpoints.createWorkSpace, data);
  }
  getOrderDetails(data: any): Observable<any> {
    return this.postData(this.endpoints.getOrderDetails, data);
  }
  initiatePayment(
    amount: string,
    companyId: string,
    promoCode: string | null
  ): Observable<any> {
    return this.getData(
      `${this.endpoints.initiatePayment}?amount=${amount}&company_id=${companyId}&promo_code=${promoCode}`
    );
  }

  postGetRefreshToken(data: any): Observable<any> {
    return this.postData(this.endpoints.getRefreshToken, data);
  }
}
