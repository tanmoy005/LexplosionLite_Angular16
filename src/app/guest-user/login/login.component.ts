import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

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
    CommonModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
// const obje = {
//   next: (response:any) => {
//     console.log('Response:dads', response);
//   },
//   error: (err:any) => {
//     console.error('Error in subscription:', err);
//     // Handle the error here (e.g., display an error message to the user)
//     // this.toastr.error('An error occurredasdasd. Please try again later.', 'Error');
//   }
// }
export class AppSideLoginComponent {

  constructor(private authService: UserAuthenticationService, private router: Router,
    private _snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  successdurationInSeconds = 2;
  failuredurationInSeconds = 4;

  openSuccessSnackBar() {
    this._snackBar.open('Login Successful!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.successdurationInSeconds * 1000,
    });
  }

  openWrongCredentialsSnackBar() {
    this._snackBar.open('Given Username or Password is wrong.', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.failuredurationInSeconds * 1000,
    });
  }

  openServerErrorSnackBar() {
    this._snackBar.open('Some error occurred while logging you in. Please try again', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.failuredurationInSeconds * 1000,
    });
  }




  // navigate to another component, with or without data
  // here "entity" is the data being sent
  // this.router.navigate(['/oprating-unit-details'],{ state: entity }); 
  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  // Getter methods to access form controls in template
  get username() { return this.usernameFormControl.value; }
  get password() { return this.passwordFormControl.value; }


  // handleLogin(event: any){
  //   console.log("Handle login clicked!")
  //   console.log("Username - ", this.username);
  //   console.log("Password - ", this.password);

  //   const loginPayload = {"unique_key":this.username,"password":this.password}
  //   try {
  //     // const response =  this.authService.userLogin(loginPayload); 
  //     this.authService.userLogin(loginPayload).pipe(
  //       tap(response => {
  //         // Handle successful response
  //         console.log('Login successful:', response);
  //         // this.routerService.navigate(['/oprating-unit-details']); 
  //       }),
  //       catchError(error => {
  //         // Handle error
  //         console.error('Login error:', error);
  //         throw error; // Rethrow the error to propagate it downstream
  //       })
  //     ).subscribe();
  //     // console.log('Login successful:', response);
  //     // Handle successful login, such as redirecting to a dashboard
  //   } 
  //   catch (error) {
  //     //console.error('Error occurred during login:', error);
  //     alert("Some error occurred while logging in");
  //     // Handle login error, such as displaying an error message
  //   }
  // }
  loginResponse: any;
  handleLogin(event: any) {
    console.log("Handle login clicked!")
    console.log("Username - ", this.username);
    console.log("Password - ", this.password);

    const loginPayload = { "unique_key": this.username, "password": this.password }
    try {
      // const response =  this.authService.userLogin(loginPayload); 
      //this.authService.userLogin(loginPayload).pipe(
      // this.apiService.postLoginData(loginPayload).pipe(
      //   tap(response => {
      //     // Handle successful response
      //     console.log('Login successful:', response);
      //     //this.openSuccessSnackBar();

      //     // this.routerService.navigate(['/oprating-unit-details']); 
      //     this.router.navigate(['/entity-details'],{ state: { entity: '' } }); 
      //   }),
      //   catchError(error => {
      //     // Handle error
      //     console.error('Login error:', error);
      //     this.openWrongCredentialsSnackBar()
      //     throw error; // Rethrow the error to propagate it downstream
      //   })
      // ).subscribe();
      // console.log('Login successful:', response);


      this.authService.userLogin(loginPayload).subscribe((response) => {
        console.log('response', response);
        const encryptStorage = new EncryptStorage(environment.localStorageKey);
        encryptStorage.setItem('login-details', response);
        this.router.navigate(['/entity-details'], { state: { entity: '' } });
      })
      // Handle successful login, such as redirecting to a dashboard
    }
    catch (error) {
      //console.error('Error occurred during login:', error);
      //alert("Some error occurred while logging in");
      this.openServerErrorSnackBar();
      // Handle login error, such as displaying an error message
    }
  }
}

// ngOnInit(): void{
//   this.getMethod();
// }
// public getMethod(){
//   this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) =>{
//   console.log("FAKE API data", data);
//   });
// }
// public postMethod(){
//   const header = new HttpHeaders({
//     'Content-type': 'application/json; charset=UTF-8',
//   })
//     const body = JSON.stringify({
//                           title: 'foo',
//                           body: 'bar',
//                           userId: 1,
//                         })
//     this.http.post('https://jsonplaceholder.typicode.com/posts',body,{headers:header}).subscribe((data)=>{
//     console.log("POST API data", data)
//     })
// }