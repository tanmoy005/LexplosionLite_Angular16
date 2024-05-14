import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://enginebackendqa.komrisk.com/v1/'; // Replace with your API endpoint
  
  private endpoints = {
                        userLogin:'login',
                        createCompany:'company',
                        createUser:'user',
                        addEntity: 'entity-details/entity',
                        addOperatingUnit:'entity-details/operating-unit',
                        applicableLaws:'entity-details/applicable-laws',
                        entityTree:'entity-details/entity/tree'
                      }

  private endpointsWithoutAuthToken = [this.endpoints.userLogin]

  constructor(private http: HttpClient) {}
  
  // GET requests: Generic Methods and Endpoint Calls
  // Example API call to get data
  private getData(apiUrl:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${apiUrl}`);
  }

  // POST requests: Generic Methods and Endpoint Calls
  // Example API call to post data

  // Sample authtoken fetching method from localstorage
  getAuthToken(){
    return localStorage.getItem('authorization')
  }

  private postData(apiUrl:string, data: any): Observable<any> {
    var headerJSON;

    if(this.endpointsWithoutAuthToken.includes(apiUrl)){
      headerJSON = {'Content-Type': 'application/json'}
    }
    else{
      headerJSON = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getAuthToken()}`,}
    }
    return this.http.post<any>(`${this.baseUrl}/${apiUrl}`, data,{headers:headerJSON});
  }


  // Method to post login data to login API url 
  postLoginData(data: any): Observable<any> {
   return this.postData(this.endpoints.userLogin, data);
  }

  // Method to post company registration data to company API url 
  postCreateCompany(data:any):Observable<any>{
    return this.postData(this.endpoints.createCompany,data)
  }

  // Method to post user registration data to user registration API url 
  postCreateUser(data:any):Observable<any>{
    return this.postData(this.endpoints.createUser,data)
  }

  // Method to post entity creation data to entity creation API url 
  postCreateEntity(data:any):Observable<any>{
    return this.postData(this.endpoints.addEntity,data)
  }

  // Method to post operating unit creation data to operating unit creation API url 
  postCreateOperatingUnit(data:any):Observable<any>{
    return this.postData(this.endpoints.addOperatingUnit,data)
  }

  // Method to post user entered "company", "entity" and "operatingUnit" to applicable law fetching API url
  // and fetch applicable laws 
  postApplicableLaws(data:any):Observable<any> {
    return this.postData(this.endpoints.applicableLaws,data)
  }

  // Method to post user entered "company", "entity" and "operatingUnit" to the entity tree fetching API url
  // and fetch the entity tree
  postEntityTree(data:any):Observable<any> {
    return this.postData(this.endpoints.entityTree,data)
  }


  // Add more methods for other API calls as needed
}
