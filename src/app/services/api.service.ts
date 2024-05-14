import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://enginebackendqa.komrisk.com/v1/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Example API call to get data
 private getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data`);
  }

  // Example API call to post data
 private postData(apiUrl:string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${apiUrl}`, data);
  }
  postLoginData(data: any): Observable<any> {
   return this.postData('login', data);
  }

  // Add more methods for other API calls as needed
}
