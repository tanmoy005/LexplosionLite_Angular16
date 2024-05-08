import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  url =''
  constructor(private http: HttpClient ) { }

  userRegistration(data: any){
    return this.http.post(this.url,data)
  }
}
