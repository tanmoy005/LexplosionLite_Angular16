import { Component, ViewEncapsulation } from '@angular/core';
import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BusinessCardComponent {
  countryList: CountryData[] = CountryList;

  @Output() selectedCountryChange: EventEmitter<any> = new EventEmitter<any>();

  onCountryValueChange(value: any) {
    this.selectedCountryChange.emit(value);
  }

  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
}
