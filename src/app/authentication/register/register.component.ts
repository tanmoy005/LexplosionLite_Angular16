import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UserAuthenticationService } from '../../services/user-authentication.service';


import {
  MatDialog,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // standalone: true,
  // imports: [MaterialModule, MatButtonModule,
  //   MatInputModule,
  //   MatFormFieldModule,
  //   FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
  //   CommonModule,
  //   BusinessCardComponent,
  //   RegHeaderComponent,
  //   MatDividerModule,
  //   DropdownComponent

  //   ],
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppSideRegisterComponent {
  constructor(
    private authService: UserAuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  usernameFormControl = new FormControl('', [Validators.required]);
  companynameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  //countryCodeFormControl = new FormControl('', [Validators.required, countryCodeValidator]);

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    phoneNumberValidator,
  ]);

  agreeToTerms: boolean = false;
  consentToPromotionalInfo: boolean = false;

  get username() {
    return this.usernameFormControl.value;
  }
  get businessname() {
    return this.companynameFormControl.value;
  }
  get email() {
    return this.emailFormControl.value;
  }
  get password() {
    return this.passwordFormControl.value;
  }
  //get countryCode() { return this.countryCodeFormControl.value; }
  get phoneNumber() {
    return this.phoneNumberFormControl.value;
  }

  countryCode: number | null = null;
  countryList: CountryData[] = CountryList;

  checkRegistrationCredentials() {
    var registrationCredentialsStatus = false;

    if (
      this.username?.trim() !== '' &&
      this.businessname?.trim() !== '' &&
      this.email?.trim() !== '' &&
      this.emailFormControl.valid &&
      this.countryCode !== null &&
      this.phoneNumber?.trim() !== '' &&
      this.phoneNumberFormControl.valid &&
      this.agreeToTerms &&
      this.consentToPromotionalInfo
    ) {
      registrationCredentialsStatus = true;
    }

    return registrationCredentialsStatus;
  }

  handleCountryCodeChange(value: any) {
    // console.log("Value changed",value);
    this.countryCode = value;
  }

  handleRegistration(event: any) {
    console.log('Handle login clicked!');
    console.log('Username - ', this.businessname);
    console.log('Password - ', this.password);

    const stateVariabl = {
      businessname: this.businessname,
    };

    const isRegistrationCredentialsFine = this.checkRegistrationCredentials();

    if (isRegistrationCredentialsFine) {
      this.router.navigate(['/verify-email'], { state: stateVariabl });
    } else {
      this.snackbar.showError(
        'Please enter all field values in correct format and check terms and conditions.'
      );
    }
  }

  termsConditionModalOpen() {
    this.dialog.open(TermsConditionDialog);
  }
}

function countryCodeValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const countryCode = control.value;
  console.log('Country code', countryCode);
  if (countryCode && countryCode.toString().length !== 2) {
    return { invalidCountryCode: true };
  }
  return null;
}

function phoneNumberValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const phoneNumber = control.value;

  const phoneNumberPattern = /^[0-9]{10}$/;
  if (phoneNumber && !phoneNumberPattern.test(phoneNumber)) {
    return { invalidPhoneNumber: true };
  }
  return null;
}

@Component({
  selector: 'terms-and-condition-dialog',
  templateUrl: 'terms-condition-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class TermsConditionDialog {}
