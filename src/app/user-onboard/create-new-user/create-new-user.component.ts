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
import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryListForPhoneNumberSection } from 'src/app/shared/menu-items/country-list';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss'],
})
export class CreateNewUserComponent implements OnInit {
  isDropdownOpen = false;
  selectedCountry: CountryData | null = null;

  countryCodeFormControl = new FormControl();

  countryList: CountryData[] = CountryListForPhoneNumberSection;
  countryCode: number | null = 1;

  ngOnInit(): void {
    this.selectedCountry = this.countryList[0]; // Default selection
    this.countryCodeFormControl.setValue(this.selectedCountry);
  }

  @ViewChild('countrySelect') countrySelect: MatSelect;

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
}
