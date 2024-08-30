import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CountryData } from 'src/app/shared/menu-items/country-list';
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

import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryListForPhoneNumberSection } from 'src/app/shared/menu-items/country-list';
import { UserSuccessfulModalComponent } from './user-successful-modal/user-successful-modal.component';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

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

function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //return encryptStorage.getItem('company-id');
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}
@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss'],
})
export class CreateNewUserComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}
  isDropdownOpen = false;
  selectedCountry: CountryData | null = null;

  roleList: any = [{ value: 4, label: 'Functional Group' }];

  countryCodeFormControl = new FormControl();

  countryList: CountryData[] = CountryListForPhoneNumberSection;
  countryCode: number | null = 1;

  countryNameList: CountryData[] = CountryList;

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    phoneNumberValidator,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  companyName: string = '';

  ngOnInit(): void {
    this.selectedCountry = this.countryList[0]; // Default selection
    this.countryCodeFormControl.setValue(this.selectedCountry);

    const encryptStorage = new EncryptStorage(environment.localStorageKey);

    const { user } = encryptStorage.getItem('login-details');
    const userCompanies = user.companies;
    const userCompanyName =
      userCompanies.length > 0 ? userCompanies[0]['name'] : '';
    // return userCompanyName;
    this.companyName = userCompanyName;
  }

  @ViewChild('countrySelect') countrySelect: MatSelect;
  form: FormGroup;

  nameFormControl = new FormControl('', [Validators.required]);

  handleBackButtonClick(event: any) {
    window.location.reload();
    // this.isBackClicked.emit(true);
    // this.handleTableDataLoadingFromOperatingUnit.emit(true);
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

  onBusinessValueChange(value: any) {
    console.log('the business selected', value);
  }

  openSuccessUserDialog() {
    const dialogRef = this.dialog.open(UserSuccessfulModalComponent);
    dialogRef.componentInstance.isAddNewUserClickedModal.subscribe(() => {
      this.handleCancelClick();
    });
  }

  get name() {
    return this.nameFormControl.value;
  }

  get phoneNumber() {
    return this.phoneNumberFormControl.value;
  }

  get email() {
    return this.emailFormControl.value;
  }

  handleRegistration(event: any) {
    // const isRegistrationCredentialsFine = this.checkRegistrationCredentials();

    const usernameParts = this.name?.trim().split(' ') || [''];

    const payload = {
      id: null,
      firstName: usernameParts[0] || '',
      lastName: usernameParts.slice(1).join(' ') || '',
      email: this.email,
      mobile: this.phoneNumber,
      roleId: 1,

      source: 'engine',

      companyIds: [getCompanyId()],
    };

    console.log('the create new user payload', payload);
    // this.openSuccessUserDialog();

    try {
      this.apiService.postCreateUser(payload).subscribe((response) => {
        if (response) {
          // this.router.navigate(['/entity-details'], { state: { entity: '' } });
          this.snackbar.showSuccess('A new user is created');
          this.openSuccessUserDialog();
        }
      });
    } catch (e) {
      this.snackbar.showError('Some error occurred while creating user');
    }

    //const payload = { otp: this.otp, email: this.stateData.email };
    //this.authService.handleAdminUserCreation(payload);
    // this.router.navigate(['/verify-email'], { state: payload });
  }

  handleCancelClick() {
    this.nameFormControl.reset('');
    this.phoneNumberFormControl.reset('');
    this.emailFormControl.reset('');
    this.selectedCountry = this.countryList[0]; // Resetting to default selected country
    this.countryCodeFormControl.setValue(this.selectedCountry);
    this.countryCode = 1; // Reset to default country code
  }
}
