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
import { DropdownComponent } from 'src/app/user-onboard/common-components/dropdown/dropdown.component';

import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';

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
    DropdownComponent

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

  

  countryList : CountryData[] = CountryList


  handleRegistration(event: any){
    console.log("Handle login clicked!")
    console.log("Username - ", this.businessname);
    console.log("Password - ", this.password);

    const stateVariabl = {
      businessname: this.businessname,
     
  };

    this.router.navigate(['/verify-email'], { state: stateVariabl });
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







    