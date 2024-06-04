import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  CreateBusinessURL = 'https://enginebackendqa.komrisk.com/v1/company';
  CreateUserURL = 'https://enginebackendqa.komrisk.com/v1/user';
  loginURL = 'https://enginebackendqa.komrisk.com/v1/login';

  constructor(private http: HttpClient, private apiService: ApiService) {}

  userRegistration(data: any): Observable<any> {
    return this.http.post(this.CreateBusinessURL, data);
  }

  userCreateUser(data: any): Observable<any> {
    return this.http.post(this.CreateUserURL, data);
  }

  userLogin(data: any): Observable<any> {
    return this.apiService.postLoginData(data);
  }
}

export class EntityService {
}
