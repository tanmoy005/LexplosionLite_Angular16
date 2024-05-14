import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class UserAuthenticationService {
  CreateBusinessURL = 'https://enginebackendqa.komrisk.com/v1/company'
  CreateUserURL ='https://enginebackendqa.komrisk.com/v1/user'
  loginURL = 'https://enginebackendqa.komrisk.com/v1/login'

  constructor(private http: HttpClient, private apiService:ApiService) { }

  userRegistration(data: any) : Observable<any>{
    console.log('user registration data', data)
    return this.http.post(this.CreateBusinessURL, data)
  }

  userCreateUser(data: any) : Observable<any>{
    console.log('user Create User data', data)
    return this.http.post(this.CreateUserURL, data)
  }

  userLogin(data: any): Observable<any> {
    // Make the HTTP POST request and return the observable
    // return this.http.post(this.loginURL, data);
    return this.apiService.postLoginData(data);
  }
  //   this.http.post(this.loginURL, data).subscribe((response) => {
  //     message = response;
  //   },
  //     (error) => {
  //       // Handle any errors here
  //       console.error('Login error:', error);
  //     })

  //   return message;
  //   // return this.http.post(this.loginURL,data)
  // }

  
}

export class EntityService{
  // addEntityURL = 
}


