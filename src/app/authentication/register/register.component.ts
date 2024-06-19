import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
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
import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

const passwordMatchValidator: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  //console.log("Password, Confirm password", password, confirmPassword);
  const status =
    password && confirmPassword && password === confirmPassword
      ? null
      : { passwordsMismatch: true };

  console.log(status);

  return password && confirmPassword && password === confirmPassword
    ? null
    : { passwordsMismatch: true };
};

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
    private fb: FormBuilder
  ) {}

  usernameFormControl = new FormControl('', [Validators.required]);
  companynameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  headquarterAddressFormControl = new FormControl('', [Validators.required]);

  // passwordFormControl = new FormControl('', [Validators.required, passwordValidator()]);
  // confirmPasswordFormControl = new FormControl('',[Validators.required, passwordMatchValidator(this.passwordFormControl.value)])
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );

    this.passwordFormControl = this.form.get('password') as FormControl;
    this.confirmPasswordFormControl = this.form.get(
      'confirmPassword'
    ) as FormControl;
  }

  passwordFormControl!: FormControl;
  confirmPasswordFormControl!: FormControl;

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

  countryCode: number | null = null;
  countryList: CountryData[] = CountryList;

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
      this.password.trim() !== '' &&
      this.passwordFormControl.valid &&
      this.confirmPassword.trim() !== '' &&
      this.confirmPasswordFormControl.valid &&
      this.countryCode !== null &&
      this.phoneNumber?.trim() !== '' &&
      this.phoneNumberFormControl.valid &&
      this.agreeToTerms
      // &&
      // this.consentToPromotionalInfo
    ) {
      registrationCredentialsStatus = true;
    }

    return registrationCredentialsStatus;
  }

  handleCountryCodeChange(value: any) {
    this.countryCode = value;
  }

  handleRegistration(event: any) {
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
    //this.dialog.open(TermsConditionDialog);

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
