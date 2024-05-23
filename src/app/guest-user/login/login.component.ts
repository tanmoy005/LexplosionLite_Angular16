import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material-module';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';


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
    MaterialModule,
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
    private _snackBar: MatSnackBar, private apiService: ApiService, 
    private snackbar: SnackbarService ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  successdurationInSeconds = 2;
  failuredurationInSeconds = 4;

  // entityTypes: any;
  // industryActivities: any;
  // states: any;
  // operatingUnitTypes:any;
  // komriskLawCategories:any


  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  // Getter methods to access form controls in template
  get username() { return this.usernameFormControl.value; }
  get password() { return this.passwordFormControl.value; }


  
  loginResponse: any;

  fetchDefinitions() {
    const fieldPayload=["entityTypes","industryActivities","states","operatingUnitTypes","komriskLawCategories"]

    this.apiService.getFieldDefinition(fieldPayload).subscribe((response) => {
      console.log('those are operating unit types', response)
      const encryptStorage = new EncryptStorage(environment.localStorageKey);
      encryptStorage.setItem('entityTypes', response.data.entityTypes);
      encryptStorage.setItem('industryActivities', response.data.industryActivities);
      encryptStorage.setItem('states', response.data.states);
      encryptStorage.setItem('operatingUnitTypes', response.data.operatingUnitTypes);
      encryptStorage.setItem('komriskLawCategories', response.data.komriskLawCategories);
      
    })
  }

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
        this.snackbar.showSuccess("Login Successful!");
        console.log('response', response);
        const encryptStorage = new EncryptStorage(environment.localStorageKey);
        encryptStorage.setItem('login-details', response);
        this.fetchDefinitions()
        this.router.navigate(['/entity-details'], { state: { entity: '' } });
      })
      // Handle successful login, such as redirecting to a dashboard
    }
    catch (error) {
      //console.error('Error occurred during login:', error);
      //alert("Some error occurred while logging in");
       this.snackbar.showError("Some error occurred while logging you in!");
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