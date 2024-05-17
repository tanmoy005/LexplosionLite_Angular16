import { Component,ViewEncapsulation } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css'],
  standalone : true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,
    MatSelectModule,MatIconModule,DropdownComponent,
    MatButtonModule,MatMenuModule],
})
export class BusinessCardComponent {
  countryList : CountryData[] = CountryList

  @Output() selectedCountryChange: EventEmitter<any> = new EventEmitter<any>();

  onCountryValueChange(value: any) {
    this.selectedCountryChange.emit(value);
  }
  
  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

}
