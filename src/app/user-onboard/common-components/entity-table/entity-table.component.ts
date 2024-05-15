import { Component, ViewChild, Inject } from '@angular/core';
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
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MatListModule } from '@angular/material/list';



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
  countryLabel: string;
  entityType: string;
  entityTypeLabel: string;
  industry: string;
  industryLabel: string;
  lawModules: string[];
  lawModulesLabel: string[];
}

const ELEMENT_DATA: BusinessDetails[] = [
  // {
  //   position: 1, name: 'Tata Steel', country: "India", industry: 'Manufacturing', type: "abc",
  //   emailID: "examplemail.com", laws: "", operatingUnit: "", actions: ''
  // },
  // {
  //   position: 2, name: 'Tata Tea', country: "India", industry: 'Tea',
  //   type: "abc", emailID: "examplemail.com", laws: "", operatingUnit: "", actions: ''
  // },
  // {
  //   position: 3, name: 'Tata Consultancy Services', country: "India", industry: 'IT', type: "abc",
  //   emailID: "examplemail.com", laws: "", operatingUnit: "", actions: ''
  // }
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

  addEntityData(formData: FormData) {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length)
    const randomRow = this.dataSource[randomElementIndex];

    // Create a new row with the same data as the random row
    const newRow: BusinessDetails = {
      position: this.dataSource.length + 1, // New position is one greater than the last present row's position
      name: formData.name,
      country: formData.countryLabel,
      industry: formData.industryLabel,
      type: formData.entityTypeLabel,
      emailID: '',
      laws: '',
      operatingUnit: '',
      actions: ''
    };
    this.dataSource.push(newRow);
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
    const name: string = 'Law List';
    const dialogRef = this.dialog.open(ViewLawsDialog, {
      data: { name: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openOpDialog() {
    const name: string = 'Operating Unit List';
    const dialogRef = this.dialog.open(ViewLawsDialog, {
      data: { name: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateToAddOpUnit(entity: BusinessDetails[]) {
    this.router.navigate(['/oprating-unit-details'], { state: entity });
  }


  openEntityMenuDialog(action: string, position: number) {
    console.log("ACTION SELECTED", action, position);
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
  }
}

const initialFormData: FormData = {
  name: '',
  country: '',
  countryLabel:'',
  entityType: '',
  entityTypeLabel:'',
  industry: '',
  industryLabel:'',
  lawModules: [],
  lawModulesLabel:[]
};

export interface OriginalType {
  id: number;
  name: string;
  description: string;
}

export interface OriginalIndustryType {
  iId: number;
  industry: string;
  subIndustry: string | null;
}

export interface TransformedType {
  value: number;
  label: string;
  description: string | null;
}

function transformEntityTypes(data: OriginalType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    description: item.description
  }));
}

function transformLawCategories(data: OriginalType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.description,
    description: item.description
  }));
}

function transformIndustryTypes(data: OriginalIndustryType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.iId,
    label: item.industry,
    description: item.subIndustry
  }));
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'example-add-new-row-dialog.html',
  standalone: true,
  styleUrls: ['./entity-table.component.css'],
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, 
    MatSelectModule, CommonModule, DropdownComponent]
})

export class AddNewEntityDialog {
  industryTypesList: any;
  distinctIndutryTypesList: any;
  transformedEntityList: TransformedType[] = [];
  transformedIndustryList: TransformedType[] = [];
  transformedLawCategoryList:TransformedType[]=[];

  countryList = [
    {"label": "India","value":1},
    {"label": "Singapore","value":2}
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

  formData:any;
  formLabeledData:any;
  selectedCountry:any;
  selectedEntity:any;
  selectedIndustry:any;
  requiredFormDataFields = ['name','country','entityType', 'industry', 'lawModules']

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: { entityTable: EntityTableComponent}, 
  public dialogRef: MatDialogRef<AddNewEntityDialog>,
  private apiService:ApiService, private snackbar:SnackbarService){
  
  this.industryTypesList = this.data.entityTable.industryTypesList;

  this.transformedEntityList = transformEntityTypes(this.data.entityTable.entityTypesList);
  this.transformedLawCategoryList = transformLawCategories(this.data.entityTable.lawCategoriesList);

  this.distinctIndutryTypesList = [];
  this.formData = initialFormData
  this.formLabeledData = initialFormData

  const seenIds = new Set();
  for (let industry of this.industryTypesList) {
    if (!seenIds.has(industry.iId)) {
      this.distinctIndutryTypesList.push(industry);
      seenIds.add(industry.iId);
    }
  }
  this.transformedIndustryList = transformIndustryTypes(this.distinctIndutryTypesList);
  }

  entityDataitem = treeDataitem;

  onSelectedValueChanged(value:any,field:string){
    this.formData[field]=value;
  }

  onTextFieldChange(event:any, field:string){
    this.formData[field]=event.target.value;
  }

  addEntity() {
    const maxId = getMaxIdFromChildren(treeDataitem);   

    let isAnyFieldBlank = false;

    console.log(this.formData)

    for (const field of this.requiredFormDataFields) {
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
      this.selectedCountry = this.countryList.find((country)=> country.value === this.formData.country);
      this.selectedEntity = this.transformedEntityList.find((entity)=> entity.value === this.formData.entityType);
      this.selectedIndustry= this.transformedIndustryList.find((industry)=> industry.value === this.formData.industry);
  
      this.formData.countryLabel = this.selectedCountry.label;
      this.formData.entityTypeLabel = this.selectedEntity.label;
      this.formData.industryLabel = this.selectedIndustry.label;
      this.formData.lawModulesLabel = this.formData.lawModules;
      this.data.entityTable.addEntityData(this.formData);
      const entity = {
        id: maxId + 1,
        label: 'Child Node ' + maxId,
      }
      treeDataitem?.children?.push(entity);
      console.log("FORMDATA SUBMITTED", this.formData);
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
  imports: [MatDialogModule, MatButtonModule, MatListModule],
})

export class ViewLawsDialog {
  data = {'name':'Laws'}
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

