import { Component, ViewChild,Inject,OnInit   } from '@angular/core';
// import { MatTable } from '@angular/material/table';
// import {Component, ViewChild} from '@angular/core';
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

import {ApiService} from '../../../services/api.service'



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

const ELEMENT_DATA: OPUnitDetails[] = [
  {position: 1, name: 'Tata Steel', industry: 'Manufacturing', type:"abc", 
  emailID:"examplemail.com", laws:"", department:"",actions:''},
  {position: 2, name: 'Tata Tea',industry: 'Tea',
   type:"abc", emailID:"examplemail.com", laws:"", department:"",actions:''},
  {position: 3, name: 'Tata Consultancy Services', industry: 'IT', type:"abc",
  emailID:"examplemail.com", laws:"", department:"",actions:''}
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
          CommonModule]
})

export class OperatingUnitTableComponent implements OnInit{
  constructor(public dialog: MatDialog,private router: Router, private fieldDefinitionService: ApiService) {}

  operatingUnitTypes: any;
  states: any

  ngOnInit(): void {
    this.fetchOperatingUniTypes();
    this.fetchstates();
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


  // viewAddEntityDialog() {
  //   this.openEntityDialog();
  // }

  addOpUnitData(){
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length)
    const randomRow = this.dataSource[randomElementIndex];

    // Create a new row with the same data as the random row
    const newRow: OPUnitDetails = {
      position: this.dataSource.length + 1, // New position is one greater than the last present row's position
      name: randomRow.name,
      industry: randomRow.industry,
      type: randomRow.type,
      emailID:randomRow.emailID,
      laws:'',
      department:'',
      actions:''
    };
    this.dataSource.push(newRow);
    console.log(this.dataSource)
    //this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  rearrangeDataSource() {
    // Sort the dataSource by position
    this.dataSource.sort((a, b) => a.position - b.position);
    // Update the position numbering of the rows
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].position = i + 1;
    }
  }


  removeEntityData(position: number) {
    // Find the index of the row with the matching position
    const rowIndex = this.dataSource.findIndex(row => row.position === position);
  
    // Check if the rowIndex is valid
    if (rowIndex !== -1) {
      // Remove the element at the found index
      this.dataSource.splice(rowIndex, 1);
      // Rearrange the position numbering of the remaining rows
      this.rearrangeDataSource();
      // Re-render the table rows
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

    // const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, { 
    //   restoreFocus: false, 
    //   data: { action, entityTable: this } 
    // });

    switch(action) {
      case 'Delete':
        this.removeEntityData(position);
        break;
      // Add other cases for different actions if needed
      default:
        break;
    }

    // dialogRef.afterClosed().subscribe(result => {
    //   // If a result is returned, handle the menu item action
    //   console.log("After dialog close",action);
    //   if (result) {
    //     this.handleMenuItemAction(result);
    //   }
    // });
  }
  
  
}


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'example-add-new-row-dialog.html',
  standalone:true,
  imports:[MatDialogModule,MatButtonModule,MatCardModule,MatInputModule,FormsModule,MatFormFieldModule,MatSelectModule,CommonModule]
})
export class AddNewEntityDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {entityName: string, entityTable: 
    OperatingUnitTableComponent,operatingUnitTypes:any,states:any}) {
    //console.log('operating unit types',this.data.operatingUnitypes)
  }
  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
  addEntity() {
    // console.log('Entity Name:', this.data.entityName);
    // console.log('operating unit types:', this.data.operatingUnitTypes);
    this.data.entityTable.addOpUnitData();
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
