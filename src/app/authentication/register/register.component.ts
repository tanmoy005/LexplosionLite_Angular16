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

  constructor(private authService: UserAuthenticationService, private router: Router) {}
  


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

  handleRegistration(event: any){
    console.log("Handle login clicked!")
    console.log("Username - ", this.businessname);
    console.log("Password - ", this.password);

    const createBusinessPayload =
    {"name": this.businessname,
    "description":"Kolkata 2022"}
    try {
      const response =  this.authService.userRegistration(createBusinessPayload); 
      console.log('Login successful:', response);
      
    } 
    catch (error) {
      
      alert("Some error occurred while logging in");
      
    }
    
    this.router.navigate(['/verify-email']);
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
  

 

