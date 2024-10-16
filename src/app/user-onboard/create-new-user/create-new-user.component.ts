import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
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
  @Output() isBackClicked = new EventEmitter<boolean>();

  phoneNumberFormControl = new FormControl('', [phoneNumberValidator]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  companyName: string = '';

  ngOnInit(): void {
    this.selectedCountry = this.countryList[0];
    this.countryCodeFormControl.setValue(this.selectedCountry);

    const encryptStorage = new EncryptStorage(environment.localStorageKey);

    const { user } = encryptStorage.getItem('login-details');
    const userCompanies = user.companies;
    const userCompanyName =
      userCompanies.length > 0 ? userCompanies[0]['name'] : '';

    this.companyName = userCompanyName;
  }

  @ViewChild('countrySelect') countrySelect: MatSelect;
  form: FormGroup;

  nameFormControl = new FormControl('', [Validators.required]);

  handleBackButtonClick(event: any) {
    this.isBackClicked.emit(true);
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

  onBusinessValueChange(value: any) {}

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

    try {
      this.apiService.postCreateUser(payload).subscribe((response) => {
        if (response) {
          this.snackbar.showSuccess('A new user is created');
          this.openSuccessUserDialog();
        }
      });
    } catch (e) {}
  }

  handleCancelClick() {
    this.isBackClicked.emit(true);
  }
}
