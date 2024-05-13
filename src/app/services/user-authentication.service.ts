import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  CreateBusinessURL = 'https://enginebackendqa.komrisk.com/v1/login'
  loginURL = 'https://enginebackendqa.komrisk.com/v1/login'

  constructor(private http: HttpClient) { }

  userRegistration(data: any) : Observable<any>{
    console.log('user registration data', data)
    return this.http.post(this.CreateBusinessURL, data)
  }

  userLogin(data: any): Observable<any> {
    // Make the HTTP POST request and return the observable
    return this.http.post(this.loginURL, data);
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
