import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { CountryList } from 'src/app/shared/menu-items/country-list';
import { CountryData } from 'src/app/shared/menu-items/country-list';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css'],
  standalone : true,
  imports: [CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatIconModule,DropdownComponent],
})
export class BusinessCardComponent {
  countryList : CountryData[] = CountryList

  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

}
