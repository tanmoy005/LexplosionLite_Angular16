import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SnackbarService } from '../shared/snackbar.service';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://enginebackendqa.komrisk.com/v1/'; // Replace with your API endpoint

  private endpoints = {
    userLogin: 'login',
    createCompany: 'company',
    createUser: 'user',
    addEntity: 'entity-details/entity',
    addOperatingUnit: 'entity-details/operating-unit',
    applicableLaws: 'entity-details/applicable-laws',
    entityTree: 'entity-details/entity/tree',
    definition:'definition'
  }

  private endpointsWithoutAuthToken = [this.endpoints.userLogin, this.endpoints.definition]

  constructor(private http: HttpClient, private snackBar: SnackbarService) { }

  // GET requests: Generic Methods and Endpoint Calls
  // Example API call to get data
  private getData(apiUrl: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${apiUrl}`);
  }

  // POST requests: Generic Methods and Endpoint Calls
  // Example API call to post data

  // Sample authtoken fetching method from localstorage
  getAuthToken() {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    const { token } = encryptStorage.getItem('login-details');
    console.log('token', token);
    console.log('environment', environment.localStorageKey);
    
    return token
  }

  private postData(apiUrl: string, data: any): Observable<any> {
    var headerJSON;

    if (this.endpointsWithoutAuthToken.includes(apiUrl)) {
      headerJSON = { 'Content-Type': 'application/json' }
    }
    else {
      headerJSON = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      }
    }
    return this.http.post<any>(`${this.baseUrl}/${apiUrl}`, data, { headers: headerJSON }).pipe(
      catchError(({ error }: HttpErrorResponse) => {
               this.snackBar.showError(error?.error);
        return throwError(() => new Error(error?.error)); // Return a custom error message
      })
    );
  };


  // Method to post login data to login API url 
  postLoginData(data: any): Observable<any> {
    return this.postData(this.endpoints.userLogin, data);
  }

  // Method to post company registration data to company API url 
  postCreateCompany(data: any): Observable<any> {
    return this.postData(this.endpoints.createCompany, data)
  }

  // Method to post user registration data to user registration API url 
  postCreateUser(data: any): Observable<any> {
    return this.postData(this.endpoints.createUser, data)
  }

  // Method to post entity creation data to entity creation API url 
  postCreateEntity(data: any): Observable<any> {
    return this.postData(this.endpoints.addEntity, data)
  }

  // Method to post operating unit creation data to operating unit creation API url 
  postCreateOperatingUnit(data: any): Observable<any> {
    return this.postData(this.endpoints.addOperatingUnit, data)
  }

  // Method to post user entered "company", "entity" and "operatingUnit" to applicable law fetching API url
  // and fetch applicable laws 
  postApplicableLaws(data: any): Observable<any> {
    return this.postData(this.endpoints.applicableLaws, data)
  }

  // Method to post user entered "company", "entity" and "operatingUnit" to the entity tree fetching API url
  // and fetch the entity tree
  postEntityTree(data: any): Observable<any> {
    return this.postData(this.endpoints.entityTree, data)
  }

  // Method to fetch a field's (Ex. Entity Type, Modules, Laws) possible values
  getFieldDefinition(data:any): Observable<any> {
    return this.postData(this.endpoints.definition, data)
  }
  
}


// Add more methods for other API calls as needed

