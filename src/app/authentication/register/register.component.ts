import {
  Component,
  ViewEncapsulation,
  OnInit,
  Inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryListForPhoneNumberSection } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { ApiService } from 'src/app/services/api.service';

import { CountryList } from 'src/app/shared/menu-items/country-list';
import { loginSource } from 'dotenv';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

// import { CountryData } from 'src/app/shared/menu-items/country-list';

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      isValidLength;

    return !passwordValid ? { passwordInvalid: true } : null;
  };
}

export function confirmPasswordValidator(
  passwordControl: AbstractControl
): ValidatorFn {
  return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppSideRegisterComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: UserAuthenticationService
  ) {}

  @ViewChild('countrySelect') countrySelect: MatSelect;

  fieldPayload = ['countries'];
  isLoading: boolean = false;
  // fetchEntityOPUnitDefinitions() {
  //   this.apiService
  //     .getFieldDefinition(this.fieldPayload)
  //     .subscribe((response) => {
  //       const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //       encryptStorage.setItem('countries', response.data.countries);

  //       //return response.data.countries;
  //     });
  //   //const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //   //return encryptStorage.getItem('countries');
  // }
  fetchEntityOPUnitDefinitions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getFieldDefinition(this.fieldPayload).subscribe(
        (response) => {
          const encryptStorage = new EncryptStorage(
            environment.localStorageKey
          );
          encryptStorage.setItem('countries', response.data.countries);
          resolve(response.data.countries); // Resolving the promise with countries
        },
        (error) => {
          reject(error); // Handle errors and reject the promise
        }
      );
    });
  }

  // ngOnInit(): void {
  //   // const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //   // this.countryList = this.fetchEntityOPUnitDefinitions();
  //   this.newCountryNameList = this.fetchEntityOPUnitDefinitions();
  //   const allCountries = this.fetchEntityOPUnitDefinitions();
  //   this.transformedCountries = allCountries.map(
  //     (country: { id: any; name: any }) => ({
  //       value: country.id,
  //       label: country.name,
  //       icon: undefined,
  //     })
  //   );
  //   this.selectedCountry = this.countryList[0]; // Default selection
  //   this.countryCodeFormControl.setValue(this.selectedCountry);
  // }
  async ngOnInit(): Promise<void> {
    this.newCountryNameList = await this.fetchEntityOPUnitDefinitions();

    const allCountries = await this.fetchEntityOPUnitDefinitions();

    this.transformedCountries = allCountries.map(
      (country: { id: any; name: any }) => ({
        value: country.id,
        label: country.name,
        icon: undefined,
      })
    );

    // this.selectedCountry = this.newCountryNameList[0];
    this.selectedCountry = this.countryList[0];
    const countryCode = this.countryList[0];
    //console.log('the country in on in it', countryCode);
    //this.countryCodeFormControl.setValue(this.selectedCountry);
    //this.countryCodeFormControl.setValue(countryCode);
    //countryList: CountryData[] = CountryListForPhoneNumberSection;
    //this.countryList = CountryListForPhoneNumberSection;
    const preSelectedCountry = {
      value: 2,
      label: '+65',
      icon: './assets/images/singapore_flag.png',
      code: '',
    };

    // Set the pre-selected value to the FormControl
    this.countryCodeFormControl.setValue(preSelectedCountry);
  }

  newCountryNameList: any;
  transformedCountries: any;
  usernameFormControl = new FormControl('', [Validators.required]);
  companynameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  headquarterAddressFormControl = new FormControl('', [Validators.required]);

  countryCodeFormControl = new FormControl();

  form: FormGroup;

  passwordFormControl = new FormControl('', [
    Validators.required,
    passwordValidator(),
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    confirmPasswordValidator(this.passwordFormControl),
  ]);

  isDropdownOpen = false;
  selectedCountry: CountryData | null = null;

  phoneNumberFormControl = new FormControl('', [
    //Validators.required,
    phoneNumberValidator,
  ]);

  agreeToTerms: boolean = false;
  isAgreeToTermsButtonClicked: boolean = false;

  consentToPromotionalInfo: boolean = false;

  get username() {
    return this.usernameFormControl.value;
  }
  get businessname() {
    return this.companynameFormControl.value;
  }
  get headquarterAddress() {
    return this.headquarterAddressFormControl.value;
  }
  get email() {
    return this.emailFormControl.value;
  }
  get password() {
    return this.passwordFormControl.value;
  }
  get confirmPassword() {
    return this.confirmPasswordFormControl.value;
  }

  get phoneNumber() {
    return this.phoneNumberFormControl.value;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      setTimeout(() => this.countrySelect.open(), 0);
    }
  }

  onCountryChange(event: any) {
    this.selectedCountry = event.value;
    this.countryCode = this.selectedCountry?.value;
    console.log('the selected country code', this.selectedCountry);
    this.isDropdownOpen = false;
  }
  onDropdownStateChange(isOpen: boolean): void {
    if (isOpen === false) {
      this.toggleDropdown();
    }
  }
  onCountryValueChange(value: any) {
    this.selectedCountryList = value;
  }
  selectedCountryList: any;
  countryCode: number | null = 1;
  countryList: CountryData[] = CountryListForPhoneNumberSection;
  //countryList: CountryData[];

  countryNameList: CountryData[] = CountryList;

  updateCheckBoxStateAndOpenConditionModal(checkedStatus: boolean) {
    if (checkedStatus) {
      this.termsConditionModalOpen();
    } else {
      this.isAgreeToTermsButtonClicked = false;
      this.agreeToTerms = false;
    }
  }

  checkRegistrationCredentials() {
    var registrationCredentialsStatus = false;

    if (
      this.username?.trim() !== '' &&
      this.businessname?.trim() !== '' &&
      this.headquarterAddress?.trim() !== '' &&
      this.email?.trim() !== '' &&
      this.emailFormControl.valid &&
      this.password?.trim() !== '' &&
      this.passwordFormControl.valid &&
      this.confirmPassword?.trim() !== '' &&
      this.confirmPassword === this.password &&
      this.countryCode !== null &&
      //this.phoneNumber?.trim() !== '' &&
      this.phoneNumberFormControl.valid &&
      this.agreeToTerms
    ) {
      registrationCredentialsStatus = true;
    }

    return registrationCredentialsStatus;
  }

  handleCountryCodeChange(value: any) {
    this.countryCode = value;
  }

  handleRegistration(event: any) {
    // const isRegistrationCredentialsFine = this.checkRegistrationCredentials();
    // const usernameParts = this.username?.trim().split(' ') || [''];
    // //this.isLoading = true;
    // if (isRegistrationCredentialsFine) {
    //   const payload = {
    //     // name: this.username,
    //     name: this.businessname,
    //     description: this.headquarterAddress,
    //     firstName: usernameParts[0] || '',
    //     lastName: usernameParts.slice(1).join(' ') || '',
    //     email: this.email,
    //     mobile: this.phoneNumber,
    //     password: this.password,
    //     source: loginSource,
    //     //countries: [1],
    //     countries: this.selectedCountryList,
    //   };
    //   this.router.navigate(['/verify-email'], { state: payload });
    // } else {
    //   this.snackbar.showError(
    //     'Please enter all field values in correct format and check terms and conditions.'
    //   );
    //   //this.isLoading = false;
    // }
    const isRegistrationCredentialsFine = this.checkRegistrationCredentials();
    const usernameParts = this.username?.trim().split(' ') || [''];
    this.isLoading = true;
    if (isRegistrationCredentialsFine) {
      const payload = {
        // name: this.username,
        name: this.businessname,
        description: this.headquarterAddress,
        firstName: usernameParts[0] || '',
        lastName: usernameParts.slice(1).join(' ') || '',
        email: this.email,
        mobile: this.phoneNumber,
        password: this.password,
        source: loginSource,
        //countries: [1],
        countries: this.selectedCountryList,
      };
      this.authService.handleAdminUserCreation(payload);
      this.isLoading = false;
      // this.router.navigate(['/verify-email'], { state: payload });
    } else {
      this.snackbar.showError(
        'Please enter all field values in correct format and check terms and conditions.'
      );
      this.isLoading = false;
    }
  }

  termsConditionModalOpen() {
    const dialogRef = this.dialog.open(TermsConditionDialog, {
      data: { registrationPage: this },
    });

    dialogRef
      .afterClosed()
      .subscribe((termsAndConditionAcceptanceStatus: boolean) => {
        if (termsAndConditionAcceptanceStatus) {
          this.agreeToTerms = true;
        } else {
          this.agreeToTerms = false;
        }
      });
  }
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
export class TermsConditionDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      registrationPage: AppSideRegisterComponent;
    },
    public dialogRef: MatDialogRef<TermsConditionDialog>
  ) {}

  termsAgreeButtonClicked: boolean;

  ngOnInit(): void {
    this.termsAgreeButtonClicked = false;
  }

  updateCheckBoxStatusAgreed(event: any) {
    this.termsAgreeButtonClicked = true;
    this.dialogRef.close(this.termsAgreeButtonClicked);
  }

  updateCheckBoxStatusDeclined(event: any) {
    this.termsAgreeButtonClicked = false;
    this.dialogRef.close(this.termsAgreeButtonClicked);
  }

  closeDialog() {
    this.dialogRef.close(this.termsAgreeButtonClicked);
  }
}
