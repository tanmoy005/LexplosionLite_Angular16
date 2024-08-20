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
    private apiService: ApiService
  ) {}

  @ViewChild('countrySelect') countrySelect: MatSelect;

  ngOnInit(): void {
    this.selectedCountry = this.countryList[0]; // Default selection
    this.countryCodeFormControl.setValue(this.selectedCountry);
  }

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
    Validators.required,
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
    this.isDropdownOpen = false;
  }

  countryCode: number | null = 1;
  countryList: CountryData[] = CountryListForPhoneNumberSection;

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
      this.phoneNumber?.trim() !== '' &&
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
    const isRegistrationCredentialsFine = this.checkRegistrationCredentials();

    if (isRegistrationCredentialsFine) {
      const stateVariable = {
        username: this.username,
        businessname: this.businessname,
        headquarterAddress: this.headquarterAddress,
        countryCode: this.countryCode,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password,
      };
      // const payload = { email: this.email };
      // try {
      //   this.apiService.postSendOTP(payload).subscribe((response) => {
      //     if (response.success) {
      //       this.snackbar.showSuccess('OTP successfully sent to your email.');
      //       this.router.navigate(['/verify-email'], { state: stateVariable });
      //     } else {
      //       this.snackbar.showError(
      //         'Some error occurred while verifying your email!'
      //       );
      //     }
      //   });
      // } catch (error) {
      //   this.snackbar.showError(
      //     'Some error occurred while verifying your email!'
      //   );
      // }

      this.router.navigate(['/verify-email'], { state: stateVariable });
    } else {
      this.snackbar.showError(
        'Please enter all field values in correct format and check terms and conditions.'
      );
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
