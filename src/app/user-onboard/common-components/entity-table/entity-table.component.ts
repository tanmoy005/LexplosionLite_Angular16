// import {Component, ViewChild} from '@angular/core';
// import {MatTable, MatTableModule} from '@angular/material/table';
// import {MatButtonModule} from '@angular/material/button';
// import {MatCardModule} from '@angular/material/card';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';



// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// // 1. SL - cell, numeric
// // 2. Name - cell, editable, string
// // 3. Country - cell, dropdown
// // 4. Industry - cell, dropdown 
// // 5. Type - cell, dropdown 
// // 6. Email ID - cell, editable, string
// // 7. Laws - button
// // 8. Operating Unit - button
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
// @Component({
//   selector: 'app-entity-table',
//   templateUrl: './entity-table.component.html',
//   styleUrls: ['./entity-table.component.scss'],
//   standalone: true,
//   imports: [MatButtonModule, MatTableModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule],
// })
// export class EntityTableComponent{
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = [...ELEMENT_DATA];
//   constructor(){ }
//   @ViewChild(MatTable) table: MatTable<PeriodicElement>;
//   addData() {
//     const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
//     this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
//     this.table.renderRows();
//   }
//   removeData() {
//     this.dataSource.pop();
//     this.table.renderRows();
//   }
// }

// import { Component, ViewChild } from '@angular/core';
// // import { MatTable } from '@angular/material/table';
// // import {Component, ViewChild} from '@angular/core';
// import {MatTable, MatTableModule} from '@angular/material/table';
// import {MatButtonModule} from '@angular/material/button';
// import {MatCardModule} from '@angular/material/card';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';
// import { FormsModule } from '@angular/forms';
// import { NgStyle } from '@angular/common';


// export interface BusinessDetails {
//   position: number;
//   name: string;
//   country: string;
//   industry: string;
//   type: string;
// }

// @Component({
//   selector: 'app-entity-table',
//   templateUrl: './entity-table.component.html',
//   styleUrls: ['./entity-table.component.scss'],
//   standalone: true,
//   imports:[MatInputModule,MatCardModule,FormsModule,MatTableModule,NgStyle,MatSelectModule,MatButtonModule]
// })


// export class EntityTableComponent {
//   displayedColumns: string[] = ['position', 'name', 'country', 'industry', 
//                                 'type', 'laws', 'operatingUnit'];

//   dataSource: BusinessDetails[] = 
//     [{position: 1, name: 'Tata Steel', country: "India", industry: 'Manufacturing', type:"abc"},
//      {position: 2, name: 'Tata Tea', country: "India", industry: 'Tea', type:"abc"},
//      {position: 3, name: 'Tata Consultancy Services', country: "India", industry: 'IT', type:"abc"}];

//   @ViewChild(MatTable) table: MatTable<BusinessDetails>;
//   addData() {
//     const newRow: BusinessDetails = {
//       position: this.dataSource.length + 1,
//       name: '',
//       country: '',
//       industry: '',
//       type: ''
//     };
//     this.dataSource.push(newRow);
//     this.table.renderRows();

//     console.log("CURRENT DATA", this.dataSource);
//   }

//   removeData(index: number) {
//     this.dataSource.splice(index, 1);
//     this.dataSource = this.dataSource.map((row, idx) => ({ ...row, position: idx + 1 }));
//     this.table.renderRows();
//   }
// }


import { Component, ViewChild, Inject } from '@angular/core';
// import { MatTable } from '@angular/material/table';
// import {Component, ViewChild} from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Input } from '@angular/core';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from '../../component-interfaces';
import { findIndex } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TreeNode, treeDataitem } from 'src/app/shared/menu-items/tree-items';


export interface BusinessDetails {
  position: number;
  name: string;
  country: string;
  industry: string;
  type: string;
  emailID: string;
  laws: string;
  operatingUnit: string;
  actions: string
}

interface FormData {
  name: string;
  country: string;
  entityType: string;
  industry: string;
  lawModules: string[]; // Assuming lawModules is an array of strings
}

const ELEMENT_DATA: BusinessDetails[] = [
  {
    position: 1, name: 'Tata Steel', country: "India", industry: 'Manufacturing', type: "abc",
    emailID: "examplemail.com", laws: "", operatingUnit: "", actions: ''
  },
  {
    position: 2, name: 'Tata Tea', country: "India", industry: 'Tea',
    type: "abc", emailID: "examplemail.com", laws: "", operatingUnit: "", actions: ''
  },
  {
    position: 3, name: 'Tata Consultancy Services', country: "India", industry: 'IT', type: "abc",
    emailID: "examplemail.com", laws: "", operatingUnit: "", actions: ''
  }
];


/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.css'],
  standalone: true,
  imports: [MatInputModule, MatCardModule, FormsModule, MatTableModule, NgStyle,
    MatSelectModule, MatButtonModule, MatIconModule, MatMenuModule, MatFormFieldModule]
})

export class EntityTableComponent {
  constructor(public dialog: MatDialog, private router: Router, private apiService: ApiService) { }

  displayedColumns: string[] = ['position', 'name', 'country', 'industry',
    'type', 'emailID', 'laws', 'operatingUnit', 'actions'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<BusinessDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() entityTypesList: any;
  @Input() industryTypesList: any;
  @Input() lawCategoriesList: any;

  viewAddEntityDialog() {
    this.openEntityDialog();
  }

  addEntityData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length)
    const randomRow = this.dataSource[randomElementIndex];

    // Create a new row with the same data as the random row
    const newRow: BusinessDetails = {
      position: this.dataSource.length + 1, // New position is one greater than the last present row's position
      name: randomRow.name,
      country: randomRow.country,
      industry: randomRow.industry,
      type: randomRow.type,
      emailID: randomRow.emailID,
      laws: '',
      operatingUnit: '',
      actions: ''
    };
    this.dataSource.push(newRow);
    // console.log(this.entityTypesList)
    // console.log(this.industryTypesList)
    // console.log(this.lawCategoriesList)
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
      treeDataitem?.children?.splice(rowIndex, 1)
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

  // handleMenuItemAction(result:string) {
  //   switch(result) {
  //     case 'Delete':
  //       this.removeEntityData();
  //       break;
  //     // Add other cases for different actions if needed
  //     default:
  //       break;
  //   }
  // }

  navigateToAddOpUnit(entity: BusinessDetails[]) {
    this.router.navigate(['/oprating-unit-details'], { state: entity });
    //console.log(entity);
  }


  openEntityMenuDialog(action: string, position: number) {
    console.log("ACTION SELECTED", action, position);

    // const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, { 
    //   restoreFocus: false, 
    //   data: { action, entityTable: this } 
    // });

    switch (action) {
      case 'Delete':
        this.removeEntityData(position);
        break;
      case 'Add Operating Unit':
        const entity = this.dataSource.filter((entity) => entity.position === position)
        // console.log(entity)
        // const entityName = entity.name
        this.navigateToAddOpUnit(entity);
        break
      case 'Edit':
        break

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

const initialFormData: FormData = {
  name: '',
  country: '',
  entityType: '',
  industry: '',
  lawModules: []
};



@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'example-add-new-row-dialog.html',
  standalone: true,
  styleUrls: ['./entity-table.component.css'],
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatSelectModule, CommonModule]
})
export class AddNewEntityDialog {

  entityTypesList: any;
  industryTypesList: any;
  distinctIndutryTypesList: any;
  lawCategoriesList: any;


  countryList = [
    { "label": "India", "value": "ind" },
    { "label": "Singapore", "value": "sing" }
  ]

  // Sample entity creation payload format
  //   {
  //     "id": null,
  //     "name": "Test Entity-2",
  //     "company": 1,
  //     "entityType": 1,
  //     "entityTypeSearch": null,
  //     "industries": [
  //         1
  //     ],
  //     "komriskLawCategories": [
  //         4
  //     ]
  //  }

  formData = initialFormData

  constructor(@Inject(MAT_DIALOG_DATA)
  public data: { entityTable: EntityTableComponent },
    public dialogRef: MatDialogRef<AddNewEntityDialog>,
    private apiService: ApiService, private snackbar: SnackbarService) {

    this.entityTypesList = this.data.entityTable.entityTypesList;
    this.industryTypesList = this.data.entityTable.industryTypesList;
    this.lawCategoriesList = this.data.entityTable.lawCategoriesList;
    this.distinctIndutryTypesList = [];

    const seenIds = new Set();

    for (let industry of this.industryTypesList) {
      if (!seenIds.has(industry.iId)) {
        this.distinctIndutryTypesList.push(industry);
        seenIds.add(industry.iId);
      }
    }
    // console.log("Distinct entities", this.distinctIndutryTypesList);
  }

  moduleOptions = [{ "label": "Labour", "value": "LAB" },
  { "label": "Operation", "value": "OPS" },
  { "label": "Fiscal", "value": 'FISC' }]
  entityDataitem = treeDataitem;



  addEntity() {

    const maxId = getMaxIdFromChildren(treeDataitem);

    // // Send the form data to the backend
    // console.log("Entity added successfully:", this.formData);

    let isAnyFieldBlank = false;

    for (let field in this.formData) {
      if (this.formData.hasOwnProperty(field)) {
        const fieldValue = this.formData[field as keyof FormData];
        if (field === "lawModules" && (fieldValue as string[]).length === 0) {
          isAnyFieldBlank = true;
          break;
        } else if (typeof fieldValue === 'string' && fieldValue === '') {
          isAnyFieldBlank = true;
          break;
        }
      }
    }

    if (isAnyFieldBlank) {
      this.snackbar.showError("Please enter all the field values.")
    }

    else {
      this.data.entityTable.addEntityData();
      const entity = {
        id: maxId + 1,
        label: 'Child Node ' + maxId,
      }
      treeDataitem?.children?.push(entity);
      this.dialogRef.close();
    }
  }

  closeEntityDialog() {
    this.dialogRef.close();
  }
}

function getMaxIdFromChildren(node: TreeNode): number {
  const rootChildren = treeDataitem.children;
  let maxId = 0;

  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map(child => child.id));
  }
  return maxId;
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'example-law-details-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})

export class ViewLawsDialog {
}


// @Component({
//   selector: 'dialog-from-menu-dialog',
//   templateUrl: 'example-entity-menu-dialog.html',
//   standalone: true,
//   imports: [MatDialogModule, MatButtonModule,MatMenuModule],
// })

// export class DialogFromMenuExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }

