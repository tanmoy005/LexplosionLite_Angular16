import { Component, ViewChild,Inject,OnInit   } from '@angular/core';

import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeCountCardComponent } from './employee-count-card/employee-count-card.component';

import {ApiService} from '../../../services/api.service'

import { DropdownComponent } from '../dropdown/dropdown.component';

import { SnackbarService } from 'src/app/shared/snackbar.service';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from '../../component-interfaces';
import { findIndex } from 'rxjs';




export interface OPUnitDetails {
  position: number;
  name: string;
  industry: string;
  type: string;
  emailID:string;
  laws: string; 
  department: string; 
  actions:string
}

export interface OriginalType {
  id: number;
  name: string;
  description: string | null;
}

export interface TransformedType {
  value: number;
  label: string;
  description: string | null;
}

function transformOperatingUnitTypes(data: OriginalType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    description: item.description
  }));
}

const ELEMENT_DATA: OPUnitDetails[] = [
 
];

/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-operating-unit-table',
  templateUrl: 'operating-unit-table.component.html',
  styleUrls: ['./operating-unit-table.component.css'],
  standalone: true,
  imports:[MatInputModule,MatCardModule,FormsModule,MatTableModule,NgStyle,
          MatSelectModule,MatButtonModule,MatIconModule,MatMenuModule,
          CommonModule,DropdownComponent,
          ]
})

export class OperatingUnitTableComponent implements OnInit{
  constructor(public dialog: MatDialog,private router: Router, private fieldDefinitionService: ApiService) {}

  operatingUnitTypes: any;
  states: any

  ngOnInit(): void {
    //this.fetchOperatingUniTypes();
    if (this.entity.country === 'India') {
      this.fetchstates();
    } else {
      this.states = [{
        'id':1,
        'name':'Singapore'
      }]; 
    }
    this.fetchOperatingUniTypes();
  }

  fetchOperatingUniTypes(){
  const fieldPayload=['operatingUnitTypes']

  this.fieldDefinitionService.getFieldDefinition(fieldPayload).subscribe((response) => {
   console.log('those are operating unit types',response)
   this.operatingUnitTypes = response.data.operatingUnitTypes;
  })
}
fetchstates(){
  const fieldPayload=['states']

  this.fieldDefinitionService.getFieldDefinition(fieldPayload).subscribe((response) => {
   console.log('those states',response)
   this.states = response.data.states;
  })
}
  displayedColumns: string[] = ['position', 'name', 'industry', 
                                 'type','emailID','laws','department','actions'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<OPUnitDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @Input() entity:any;


  

  addOpUnitData(newData: OPUnitDetails) {
    newData['position'] = this.dataSource.length + 1
    this.dataSource.push(newData);
    this.table.renderRows();
    
  }
  

  rearrangeDataSource() {
    
    this.dataSource.sort((a, b) => a.position - b.position);
    
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].position = i + 1;
    }
  }


  removeEntityData(position: number) {
   
    const rowIndex = this.dataSource.findIndex(row => row.position === position);
  
    
    if (rowIndex !== -1) {
      
      this.dataSource.splice(rowIndex, 1);
     
      this.rearrangeDataSource();
      
      this.table.renderRows();
    }
  }
  

  openEntityDialog(entityName: string) {
    const dialogRef = this.dialog.open(AddNewEntityDialog, {
      data: { entityTable: this ,entityName: entityName,
        operatingUnitTypes:this.operatingUnitTypes,
      states:this.states}
    });
  }

  openLawDialog() {
    const dialogRef = this.dialog.open(ViewLawsDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateBackToEntityDetailsPage(){
    this.router.navigate(['/entity-details'],{ state: this.entity }); 
  }


  openopUnitMenuDialog(action: string, position:number) {
    console.log("ACTION SELECTED",action,position);

   

    switch(action) {
      case 'Delete':
        this.removeEntityData(position);
        break;
      // Add other cases for different actions if needed
      default:
        break;
    }

   
  }
  
  
}


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'example-add-new-row-dialog.html',
  standalone:true,
  imports:[MatDialogModule,MatButtonModule,MatCardModule,MatInputModule,FormsModule,
    MatFormFieldModule,MatSelectModule,CommonModule,DropdownComponent,
    EmployeeCountCardComponent
  ]
})

export class AddNewEntityDialog {
  transformedDataOperatingUnits: TransformedType[] = [];
  transformedStates: TransformedType[] = [];

  operatingUnitName: string = '';
  operatingUnitType: string = '';
  state: string = '';
  activity: string = '';
  locatedAt: string = '';
  ownership: string = '';

  selectedOperatingUnitType: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: {entityName: string, entityTable: 
    OperatingUnitTableComponent,operatingUnitTypes:OriginalType[],states:OriginalType[]},
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddNewEntityDialog>) {
   
    this.transformedDataOperatingUnits = transformOperatingUnitTypes(this.data.operatingUnitTypes);
    this.transformedStates = transformOperatingUnitTypes(this.data.states)

  }

  
 
  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

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
        industry: '',
        type: operatingUnitTypeName, 
        emailID: 'examplemail.com', 
        laws: '', 
        department: '', 
        actions: '' 
      };
      this.data.entityTable.addOpUnitData(newData);
      this.snackbar.showSuccess("Sucessfully added Operating Unit");
      this.dialogRef.close();
      
    } else {
      
      this.snackbar.showError("Please fill all the fields");
    
    }
  }

  CloseDialog(){
    this.dialogRef.close();
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
  
  findOperatingUnitTypeName(id: any): string  {
    const operatingUnitType = this.data.operatingUnitTypes.find(type => type.id === id);
    return operatingUnitType ? operatingUnitType.name : '';
  }
}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'example-law-details-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})

export class ViewLawsDialog {
}
