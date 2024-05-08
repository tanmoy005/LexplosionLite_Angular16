import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  url =' https://enginebackend.komrisk.com:3000/v1/company'
  loginURL='https://enginebackend.komrisk.com:3000/v1/login'

  constructor(private http: HttpClient ) { }

  userRegistration(data: any){
    console.log('user registration data',data)
    return this.http.post(this.url,data)
  }

  userLogin(data:any){
    var message;
    this.http.post(this.loginURL,data).subscribe((data) =>{
      message = data;
    })
    return message;
    // return this.http.post(this.loginURL,data)
  }

}
