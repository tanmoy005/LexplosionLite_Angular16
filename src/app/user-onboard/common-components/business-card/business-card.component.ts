import { Component, ViewEncapsulation } from '@angular/core';
import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';
import { Output, EventEmitter, OnInit } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
// import { ApiService } from '../services/api.service';
import { ApiService } from 'src/app/services/api.service';

function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //return encryptStorage.getItem('company-id');
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BusinessCardComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  countryList: CountryData[] = CountryList;
  encryptStorage = new EncryptStorage(environment.localStorageKey);

  newCountryNameList: any;
  transformedCountries: any;

  companyName: any = '';
  countryForCompany: any = [];
  countryForCompanyIdList: any = [];
  fieldPayload = ['countries'];
  apiCountryList: any = [];

  fetchCountriesForCompanies(payload: any) {
    this.apiService.postCountriesforCompanies(payload).subscribe((response) => {
      if (response) {
        this.countryForCompany = response['countries'];
        const countryIds = response['countries'].map(
          (country: any) => country.company_country.CountryId
        );
        this.countryForCompanyIdList = countryIds;
        console.log('the country for companies id', countryIds);
        const matchingCountries = this.apiCountryList.filter((country: any) =>
          countryIds.includes(country.id)
        );
        // this.countryForCompanyIdList = matchingCountries;
        console.log('the matching country list', matchingCountries);
      }
      console.log('the country for company', response['countries']);
      return response['countries'];
    });
  }

  ngOnInit(): void {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);

    const { user } = encryptStorage.getItem('login-details');
    const userCompanies = user.companies;
    const userCompanyName =
      userCompanies.length > 0 ? userCompanies[0]['name'] : '';
    // return userCompanyName;
    this.companyName = userCompanyName;

    const savedCountries = this.encryptStorage.getItem('countries');
    this.apiCountryList = savedCountries;
    this.transformedCountries = savedCountries.map(
      (country: { id: any; name: any }) => ({
        value: country.id,
        label: country.name,
        icon: undefined,
      })
    );

    const fetchCountryforCompanyPayload = {
      companyId: getCompanyId(),
    };
    this.fetchCountriesForCompanies(fetchCountryforCompanyPayload);
  }

  @Output() selectedCountryChange: EventEmitter<any> = new EventEmitter<any>();

  // onCountryValueChange(value: any) {
  //   this.selectedCountryChange.emit(value);
  // }
  selectedCountryList: any = [];

  onCountryValueChange(value: any) {
    console.log('the country selected', value);
    this.selectedCountryList = value;
    this.selectedCountryChange.emit(value);
  }

  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
}
