import { Component ,ViewEncapsulation } from '@angular/core';
import { FormGroup,  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DemoMaterialModule } from 'src/app/demo-material-module';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule,ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {UserAuthenticationService} from '../../services/user-authentication.service'

import { BusinessCardComponent } from 'src/app/user-onboard/common-components/business-card/business-card.component';
import { RegHeaderComponent } from './reg-header/reg-header.component';
import {MatDividerModule} from '@angular/material/divider';
import { catchError, tap } from 'rxjs';


import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
   standalone: true,
  templateUrl: './register.component.html',
  imports: [DemoMaterialModule, MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    CommonModule,
    BusinessCardComponent,
    RegHeaderComponent,
    MatDividerModule,
    

    ],
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})






export class AppSideRegisterComponent {

  constructor(private authService: UserAuthenticationService, private router: Router ,public dialog: MatDialog) {}
  


  usernameFormControl = new FormControl('', [Validators.required]);
  companynameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  passwordFormControl = new FormControl('', [Validators.required]);

  countryCodeFormControl = new FormControl('', [Validators.required, countryCodeValidator]);

  phoneNumberFormControl = new FormControl('', [Validators.required, phoneNumberValidator]);


  get username() { return this.usernameFormControl.value; }
  get businessname() { return this.companynameFormControl.value; }
  get email() { return this.emailFormControl.value; }
  get password() { return this.passwordFormControl.value; }
  get countryCode() { return this.countryCodeFormControl.value; }
  get phoneNumber() { return this.phoneNumberFormControl.value; }

  // handleRegistration(event: any){
  //   console.log("Handle login clicked!")
  //   console.log("Username - ", this.businessname);
  //   console.log("Password - ", this.password);

  //   const createBusinessPayload =

  //   {"name": this.businessname,
  //   "description":"Kolkata 2022"}
  //   try {
  //     // const response =  this.authService.userLogin(loginPayload); 
  //     this.authService.userRegistration(createBusinessPayload).pipe(
  //       tap(response => {
         
  //         console.log('Create Business Successful', response);

  //         // try{
  //         //   this.authService.userRegistration(createBusinessPayload).pipe(

  //         //   )
  //         // }
         
  //         this.router.navigate(['/entity-details']);
  //       }),
  //       catchError(error => {
  //         // Handle error
  //         console.error('Login error:', error);
  //         throw error; 
  //       })
  //     ).subscribe();
      
  //   } 
  //   catch (error) {
  //     //console.error('Error occurred during login:', error);
  //     alert("Some error occurred while logging in");
  //     // Handle login error, such as displaying an error message
  //   }
  // }
  handleRegistration(event: any){
    console.log("Handle login clicked!")
    console.log("Username - ", this.businessname);
    console.log("Password - ", this.password);

    // const createBusinessPayload =

    // {"name": this.businessname,
    // "description":"Kolkata 2022"}
    // try {
    //   // const response =  this.authService.userLogin(loginPayload); 
    //   this.authService.userRegistration(createBusinessPayload).pipe(
    //     tap(response => {
         
    //       console.log('Create Business Successful', response);

    //       const createUserPayload={
    //         "id":null,
    //         "firstName":"Test",
    //         "lastName":"User",
    //         "email":"testff@test.com",
    //         "mobile":"9076543210",
    //         "companyId":54,
    //         "roleId":4
    //       }
    //       try {
    //         // const response =  this.authService.userLogin(loginPayload); 
    //         this.authService.userCreateUser(createUserPayload).pipe(
    //           tap(response => {
    //             // Handle successful response
    //             console.log('Login successful:', response);
    //             //this.routerService.navigate(['/entity-details']); 
    //           }),
    //           catchError(error => {
    //             // Handle error
    //             console.error('Login error:', error);
    //             throw error; // Rethrow the error to propagate it downstream
    //           })
    //         ).subscribe();
    //         // console.log('Login successful:', response);
    //         // Handle successful login, such as redirecting to a dashboard
    //       } 
    //       catch (error) {
    //         //console.error('Error occurred during login:', error);
    //         alert("Some error occurred while logging in");
    //         // Handle login error, such as displaying an error message
    //       }
    //       // this.router.navigate(['/verify-email']);
    //     }),
    //     catchError(error => {
    //       // Handle error
    //       console.error('Login error:', error);
    //       throw error; 
    //     })
    //   ).subscribe();
      
    // } 
    // catch (error) {
    //   //console.error('Error occurred during login:', error);
    //   alert("Some error occurred while logging in");
    //   // Handle login error, such as displaying an error message
    // }
    this.router.navigate(['/verify-email']);
  }

  termsConditionModalOpen (){
    
      this.dialog.open(TermsConditionDialog);
  
  }
  }
  

  


  function countryCodeValidator(control: AbstractControl): { [key: string]: any } | null {
    const countryCode = control.value;
    if (countryCode && countryCode.toString().length !== 2) {
      return { 'invalidCountryCode': true };
    }
    return null;
  }

  function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const phoneNumber = control.value;
    // Regular expression for validating phone numbers (10 digits)
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (phoneNumber && !phoneNumberPattern.test(phoneNumber)) {
      return { 'invalidPhoneNumber': true };
    }
    return null;
  }
  

 

  @Component({
    selector: 'terms-and-condition-dialog',
    templateUrl: 'terms-condition-dialog.html',
    standalone: true,
    imports: [MatDialogModule,MatButtonModule],
  })
  export class TermsConditionDialog {}