import { Component, ViewChild, Inject } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Input } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { TreeNode, treeDataitem } from 'src/app/shared/menu-items/tree-items';
import * as EntityInterfaces from 'src/app/shared/menu-items/entity-interfaces';
import { AddEntityDialog } from './add-entity-dialog-component';
import { ViewEntityLawsDialog } from './entity-laws-dialog-component';

const ELEMENT_DATA: EntityInterfaces.BusinessDetails[] = [];
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
  displayedColumns: string[] = EntityInterfaces.EntityColumns;
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<EntityInterfaces.BusinessDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() entityTypesList: any;
  @Input() industryTypesList: any;
  @Input() lawCategoriesList: any;
  @Input() countryList: any;

  viewAddEntityDialog() {
    this.openEntityDialog();
  }

  addEntityData(formData: EntityInterfaces.FormData) {
    // Create a new row with the same data as the random row
    const newRow: EntityInterfaces.BusinessDetails = {
     // New position is one greater than the last present row's position
      position: this.dataSource.length + 1, 
      name: formData.name,
      country: formData.country,
      countryLabel:formData.countryLabel,
      industry: formData.industry,
      industryLabel: formData.industryLabel,
      entityType: formData.entityType,
      entityTypeLabel: formData.entityTypeLabel,
      emailID: '',
      laws: '',
      lawModules:formData.lawModules,
      lawModulesLabel:formData.lawModulesLabel,
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

    // console.log("RECEIVED COUNTRY in ADD-ENT-TABLE", this.countryList);

    const dialogRef = this.dialog.open(AddEntityDialog, {
      data: { entityTable: this }
    });
  }

  openLawDialog() {
    const name: string = 'Law List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openOpDialog() {
    const name: string = 'Operating Unit List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateToAddOpUnit(entity: EntityInterfaces.BusinessDetails) {
    this.router.navigate(['/oprating-unit-details'], { state: entity });
  }

  openEntityMenuDialog(action: string, position: number) {
    var blankEntity =  {position: position,
                        name: '',
                        country: '',
                        countryLabel:'',
                        industry: '',
                        industryLabel:'',
                        entityType: '',
                        entityTypeLabel: '',
                        emailID: '',
                        laws: '',
                        lawModules: [],
                        lawModulesLabel:[],
                        operatingUnit: '',
                        actions: ''}
    switch (action) {
      case 'Delete':
        this.removeEntityData(position);
        break;
      case 'Add Operating Unit':
        var entity = this.dataSource.find((entity) => entity.position === position);
        if(entity===undefined){
          entity = blankEntity
        }  
        this.navigateToAddOpUnit(entity);
        break
      case 'Edit':
        break
      default:
        break;
    }
  }
}
