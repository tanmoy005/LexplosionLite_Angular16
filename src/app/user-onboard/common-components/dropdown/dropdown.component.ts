import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
     NgIf,NgFor  ]
})
export class DropdownComponent {
  @Input() label: string;
  @Input() options: { value: any, label: string, icon: string }[];
  selectedValue: any;
}
