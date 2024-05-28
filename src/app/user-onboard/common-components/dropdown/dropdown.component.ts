import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output,EventEmitter, ViewEncapsulation,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // standalone: true,
  // imports: [
  //   MatFormFieldModule,
  //   MatSelectModule,
  //    NgIf,NgFor  ]
})
export class DropdownComponent implements OnInit {
  @Input() label: string;
  @Input() options: { value: any, label: string, icon?: string }[];
  @Input() IsMultiSelection: boolean = false;
  @Input() IsRequired: boolean = false;

  @Input() unchangeableValues: any[] = [];
  @Input() changeableValues: Number | any[]= [];
  @Input() type: string= 'default';
  
  valuesReceived: any[] = [];

  ngOnInit(): void {
    this.combineValues();
  }

  combineValues(): void {
    if(Array.isArray(this.changeableValues)){
      this.changeableValues = [...this.changeableValues, ...this.unchangeableValues]
    }
    //console.log("Values recv.", this.changeableValues, typeof this.changeableValues);
  }
  
  //selectedValue: any;
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter<any>();

  isDropdownOpened: boolean = false;


  onSelectionChange(event: any) {
    this.selectedValueChange.emit(event.value);
  }
  toggleDropdown(){
    !this.isDropdownOpened;
  }


  // onSelectionChange(event: any) {
  //   if (!this.isValueUnchangeable(event.value)) {
  //     this.selectedValueChange.emit(event.value);
  //   }
  // }

  isValueDisabled(value: any): boolean {
    return this.unchangeableValues.includes(value);
  }
  


}
