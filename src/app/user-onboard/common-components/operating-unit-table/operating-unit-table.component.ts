import { Component, ViewChild,Inject  } from '@angular/core';
// import { MatTable } from '@angular/material/table';
// import {Component, ViewChild} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from '../../component-interfaces';
import { findIndex } from 'rxjs';


// 1. SL - cell, numeric
// 2. Name - cell, editable, string
// 4. Industry - cell, dropdown 
// 5. Type - cell, dropdown 
// 6. Email ID - cell, editable, string
// 7. Laws - button
// 8. Department - button
// 9. blank - ...

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
          MatSelectModule,MatButtonModule,MatIconModule,MatMenuModule]
})

export class OperatingUnitTableComponent {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['position', 'name', 'industry', 
                                 'type','emailID','laws','department','actions'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<OPUnitDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

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
  

  openEntityDialog() {
    const dialogRef = this.dialog.open(AddNewEntityDialog, {
      data: { entityTable: this }
    });
  }

  openLawDialog() {
    const dialogRef = this.dialog.open(ViewLawsDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  imports:[MatDialogModule]
})
export class AddNewEntityDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { entityTable: OperatingUnitTableComponent }) {}

  addEntity() {
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
