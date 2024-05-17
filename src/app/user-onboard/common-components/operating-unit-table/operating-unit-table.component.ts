



//====================================== Testing Version ===========================//


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

import { AddNewOperatingUnitDialogComponent } from './add-new-operating-unit-dialog/add-new-operating-unit-dialog.component';


import { OPUnitDetails } from 'src/app/shared/menu-items/operating-unit-details';



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
          AddNewOperatingUnitDialogComponent
          ]
})

export class OperatingUnitTableComponent implements OnInit{
  
  constructor(public dialog: MatDialog,private router: Router, private fieldDefinitionService: ApiService) {}
  @Input() entity = {
    "position": 1,
    "name": "Test Entity",
    "country": 1,
    "countryLabel": "India",
    "industry": 3,
    "industryLabel": "Manufacturing",
    "entityType": 1,
    "entityTypeLabel": "Company",
    "emailID": "",
    "laws": "",
    "lawModules": [
        1,
        2
    ],
    "lawModulesLabel": [
        "Labour",
        "Operational"
    ],
    "operatingUnit": "",
    "actions": ""
  };
  operatingUnitTypes: any;
  states: any

  ngOnInit(): void {
    //this.fetchOperatingUniTypes();
    if (this.entity.countryLabel === 'India') {
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
  displayedColumns: string[] = ['position', 'name', 'entity', 'ownership',
                                'type', 'location', 'zone', 'employees','activities','laws','actions'];

  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<OPUnitDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
 

  
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
    const dialogRef = this.dialog.open(AddNewOperatingUnitDialogComponent, {
      data: { entityTable: this ,entityName: entityName, industry: this.entity.industryLabel,
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
  selector: 'dialog-content-example-dialog',
  templateUrl: 'example-law-details-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})

export class ViewLawsDialog {
}
