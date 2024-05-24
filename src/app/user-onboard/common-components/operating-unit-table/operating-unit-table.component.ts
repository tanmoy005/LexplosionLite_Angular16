



//====================================== Testing Version ===========================//


import { Component, ViewChild, Inject, OnInit , OnDestroy } from '@angular/core';

import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeCountCardComponent } from './employee-count-card/employee-count-card.component';

import { ApiService } from '../../../services/api.service'

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

import { DialogService } from 'src/app/services/Dialog.service';
import { Subscription } from 'rxjs';
import { treeDataitem, TreeNode } from 'src/app/shared/menu-items/tree-items';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces'


// const ELEMENT_DATA: OPUnitDetails[] = [];

function getMaxIdFromGrandchildren (children:TreeNode): number {
  const rootChildren = children.children;

  let maxId = 0;
  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map(child => child.id));
  }
  return maxId;
}

/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-operating-unit-table',
  templateUrl: 'operating-unit-table.component.html',
  styleUrls: ['./operating-unit-table.component.css'],
 
})

export class OperatingUnitTableComponent implements OnInit {
  private subscription: Subscription;
  encryptStorage = new EncryptStorage(environment.localStorageKey);
  constructor(public dialog: MatDialog, private router: Router, private apiService: ApiService,
    private opDialogService: DialogService
  ) { }
  @Input() entity: any={}; 
  @Input() isDotsCliscked: boolean; 
  operatingUnitTypes: FieldDefinitionInterfaces.OperatingUnitTypes[]=[];
  states: FieldDefinitionInterfaces.States[]=[]

  ngOnInit(): void {
    this.fetchOpUnitList()
    
    const savedStates = this.encryptStorage.getItem('states');
    const savedUniTypes = this.encryptStorage.getItem('operatingUnitTypes');

    
    this.states = savedStates;
    this.operatingUnitTypes = savedUniTypes
    
    this.subscription = this.opDialogService.openDialog$.subscribe(() => {
      this.openEntityDialog(this.entity.name);
    });

 
    
    if (this.isDotsCliscked === true){
      this.openEntityDialog(this.entity.name);
    }
    else{
    if (Array.isArray(this.entity.operatingUnit) && this.entity.operatingUnit.length === 0) {
      this.openEntityDialog(this.entity.name);
    }
  }
    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchOpUnitList(){
    const payLoad={"entity":this.entity.id}
    this.apiService.fetcheOperatingUnit(payLoad).subscribe((response) => {
      console.log('fetched op unit values',response)
    

      const opResponseData:OPUnitDetails[]= response.data.map((opUnits: any) => ({
        position: opUnits.id,
        name: opUnits.name,
        entity: opUnits.entities.map((item: any) => item.id),
        entityNames:[],
        ownershipID: opUnits.ownership.id,
        ownership: opUnits.ownership.name,
        type: opUnits.operatingUnitType.name,
        location: '', 
        zone: opUnits.locatedAt.name, 
        locationId: opUnits.locatedAt.id,
        employees: '', 
        activities: opUnits.activities.map((item:any )=> item.id), 
        laws: '', 
        actions: '' 
      }));

      console.log('the transformed op unit datas',opResponseData)
      this.dataSource = opResponseData
    })
    
  }
 
  displayedColumns: string[] = ['position', 'name', 'entity', 'ownership',
                                'type', 'location', 'zone', 'employees','activities','laws','actions'];

  // dataSource = [...ELEMENT_DATA];

  dataSource:OPUnitDetails[] = []

  @ViewChild(MatTable) table: MatTable<OPUnitDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


 

  addOpUnitData(newData: OPUnitDetails) {
    newData['position'] = this.dataSource.length + 1
    console.log('the new op unit data',newData)
    this.dataSource.push(newData);

    const childrenToAddGrandChildrenTo = treeDataitem.children?.find((children)=>children.id === this.entity.childrenID) 
    if(childrenToAddGrandChildrenTo !== undefined){
      // console.log("Grand Children", childrenToAddGrandChildrenTo);
      const grandChildrenAddingIndex = treeDataitem.children?.indexOf(childrenToAddGrandChildrenTo);
      const maxId = getMaxIdFromGrandchildren(childrenToAddGrandChildrenTo);

      const entity = {
        id: maxId + 1,
        label: 'Grandchild Node ' + String(maxId+1),
        children:[]
      }

      childrenToAddGrandChildrenTo?.children?.push(entity);
    }
    
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
    console.log('entityName', entityName);

    this.dialog.open(AddNewOperatingUnitDialogComponent, {
      data: {
        entityTable: this, entityName: entityName, industry: this.entity.industryLabel,
        operatingUnitTypes: this.operatingUnitTypes,
        states: this.states,
        entityPosition:this.entity.position,
        entity:this.entity
      }
    });
  }

  openLawDialog() {
    const dialogRef = this.dialog.open(ViewLawsDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateBackToEntityDetailsPage() {
    this.router.navigate(['/entity-details'], { state: this.entity });
  }


  openopUnitMenuDialog(action: string, position: number) {
    console.log("ACTION SELECTED", action, position);



    switch (action) {
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
