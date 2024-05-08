import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  url =' https://enginebackend.komrisk.com:3000/v1/company'
  constructor(private http: HttpClient ) { }

  userRegistration(data: any){
    console.log('user registration data',data)
    return this.http.post(this.url,data)
  }
}
