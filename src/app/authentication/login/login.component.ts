import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DemoMaterialModule, 
    MatButtonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    CommonModule ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AppSideLoginComponent {

  constructor(private http: HttpClient) { }


  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  // Getter methods to access form controls in template
  get username() { return this.usernameFormControl.value; }
  get password() { return this.passwordFormControl.value; }

  // ngOnInit(): void{
  //   this.getMethod();
  // }

  // public getMethod(){
  //   this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) =>{
  //   console.log("FAKE API data", data);
  //   });
  // }

  public postMethod(){

    const header = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    })
      
      const body = JSON.stringify({
                            title: 'foo',
                            body: 'bar',
                            userId: 1,
                          })

      this.http.post('https://jsonplaceholder.typicode.com/posts',body,{headers:header}).subscribe((data)=>{
      console.log("POST API data", data)
      })
  }

  handleLogin(event: any){
    console.log("Handle login clicked!")
    console.log("Username - ", this.username);
    console.log("Password - ", this.password);
    
    this.postMethod();
  }
}
