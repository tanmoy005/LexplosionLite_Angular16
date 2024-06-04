import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EmployeeCardInterface } from 'src/app/shared/menu-items/employee-card-data-interface';

@Component({
  selector: 'app-employee-count-card',
  templateUrl: './employee-count-card.component.html',
  styleUrls: ['./employee-count-card.component.scss'],
})
export class EmployeeCountCardComponent {
  @Output() employeeDataChange = new EventEmitter<EmployeeCardInterface[]>();
  @Output() apprenticesChange = new EventEmitter<number>();
  @Output() childLaboursChange = new EventEmitter<number>();
  @Input() employeeDataInitial: EmployeeCardInterface[];
  @Input() apprenticeInitial: number;
  @Input() childInitial: number;

  header_list = ['Direct', 'Contract Labours', 'Inter-State Migrants'];

  employeeData = this.header_list.map((header) => ({
    header: header,
    male: 0,
    female: 0,
  }));

  apprenticesCount: number = 0;
  childLaboursCount: number = 0;

  ngOnInit() {
    if (this.employeeDataInitial && this.employeeDataInitial.length) {
      this.employeeData = this.employeeDataInitial;
      console.log('the emp data coming', this.employeeDataInitial);
    }

    if (this.apprenticeInitial != null) {
      this.apprenticesCount = this.apprenticeInitial;
    }

    if (this.childInitial != null) {
      this.childLaboursCount = this.childInitial;
    }

    this.emitEmployeeData();
    this.emitApprenticesCount();
    this.emitChildLaboursCount();
  }

  onInputChange() {
    this.emitEmployeeData();
    console.log('this is new employee data', this.employeeData);
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
