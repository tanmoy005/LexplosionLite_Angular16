import { Component ,EventEmitter,Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-employee-count-card',
  templateUrl: './employee-count-card.component.html',
  styleUrls: ['./employee-count-card.component.scss'],
  // standalone: true,
  // imports:[
  //   MatCardModule,
  //   MatButtonModule,
  //   MatInputModule,
  //   MatSelectModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   CommonModule
  // ]
})
export class EmployeeCountCardComponent {
  @Output() employeeDataChange = new EventEmitter<any>();
  @Output() apprenticesChange = new EventEmitter<number>();
  @Output() childLaboursChange = new EventEmitter<number>();

  header_list = ["Direct",
    "Contract Labours",
    "Inter-State Migrants"
  ];

  employeeData = this.header_list.map(header => ({
    header: header,
    male: '',
    female: ''
  }));

  
  apprenticesCount: number = 0;
  childLaboursCount: number = 0;



  ngOnInit() {
    // Emit initial data
    this.emitEmployeeData();
    

  }

  onInputChange() {
    this.emitEmployeeData();
    console.log('this is new employee data',this.employeeData)
  }

  emitEmployeeData() {
    this.employeeDataChange.emit(this.employeeData);
  }

  emitApprenticesCount() {
    this.apprenticesChange.emit(this.apprenticesCount);
  }

  emitChildLaboursCount() {
    this.childLaboursChange.emit(this.childLaboursCount);
  }

}
