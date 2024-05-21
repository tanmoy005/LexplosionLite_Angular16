import { Component ,Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeCountCardComponent } from '../employee-count-card/employee-count-card.component';
import { MatButtonModule } from '@angular/material/button';
import { OperatingUnitTableComponent } from '../operating-unit-table.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OriginalType } from 'src/app/shared/menu-items/original-drop-down-menu-items';

import { TransformedType } from 'src/app/shared/menu-items/transfered-dropdown-menu-items';

import { OPUnitDetails } from 'src/app/shared/menu-items/operating-unit-details';





function transformOperatingUnitTypes(data: OriginalType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    description: item.description
  }));
}


@Component({
  selector: 'app-add-new-operating-unit-dialog',
  templateUrl: './add-new-operating-unit-dialog.component.html',
  styleUrls: ['./add-new-operating-unit-dialog.component.scss'],
  standalone:true,
  imports:[MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    DropdownComponent,
    MatSelectModule,
    EmployeeCountCardComponent
  ]
})



export class AddNewOperatingUnitDialogComponent {

  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  transformedDataOperatingUnits: TransformedType[] = [];
  transformedStates: TransformedType[] = [];

  operatingUnitName: string = '';
  operatingUnitType: string = '';
  state: string = '';
  activity: string = '';
  locatedAt: string = '';
  ownership: string = '';
  employeeData:any;
  apprenticeDataCount:any;
  childLabourDataCount: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: {entityName: string, industry: string,entityTable: 
    OperatingUnitTableComponent,operatingUnitTypes:OriginalType[],states:OriginalType[],
    entityPosition:number},
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddNewOperatingUnitDialogComponent>) {
   
    this.transformedDataOperatingUnits = transformOperatingUnitTypes(this.data.operatingUnitTypes);
    this.transformedStates = transformOperatingUnitTypes(this.data.states)

  }
  isDataValid(): boolean {
    return (
      this.operatingUnitName.trim() !== '' &&
      this.operatingUnitType !== '' &&
      this.state!== '' &&
      this.activity.trim() !== '' &&
      this.locatedAt.trim() !== '' &&
      this.ownership.trim() !== ''
    );
  }

  addEntity() {
   
    if (this.isDataValid()) {
      const operatingUnitTypeName = this.findOperatingUnitTypeName(this.operatingUnitType);
      const newData: OPUnitDetails = {
        position: 1,
        name: this.operatingUnitName,
        entity:'',
        ownership:'',
        type: operatingUnitTypeName, 
        location:'',
        zone:'',
        employees:'',
        activities:'',
        laws: '',
        actions:'',
        entityPosition:this.data.entityPosition
      };
      console.log('op unit added!',newData)
      this.data.entityTable.addOpUnitData(newData);
      this.snackbar.showSuccess("Sucessfully added Operating Unit");
      this.dialogRef.close();
      
    } else {
      
      this.snackbar.showError("Please fill all the fields");
    
    }
  }
  findOperatingUnitTypeName(id: any): string  {
    const operatingUnitType = this.data.operatingUnitTypes.find(type => type.id === id);
    return operatingUnitType ? operatingUnitType.name : '';
  }

  onSelectedValueChanged(value: any,columnvalue: String) {
    if (columnvalue === 'operatingUnitType'){
     this.operatingUnitType = value
    }
    if (columnvalue === 'states'){
     this.state = value
    }
    if (columnvalue === 'activity'){
     this.activity = value
    }
    if (columnvalue === 'locatedAt'){
     this.locatedAt = value
    }
    if (columnvalue === 'ownership'){
     this.ownership = value
    }
     
   }

   employeeCountData(value:any){
    this.employeeData = value
    console.log('employee data',value)
   }
   
   apprenticesData(value:any){
    this.apprenticeDataCount = value
    console.log('apprentice data',value)
   }
   
   childLabourData(value:any){
    this.childLabourDataCount = value
    console.log('child labour data',value)
   }

  CloseDialog(){
    this.dialogRef.close();
  }


}
