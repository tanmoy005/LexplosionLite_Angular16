



//====================================== Testing Version ===========================//


import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Input } from '@angular/core';

import { ApiService } from '../../../services/api.service'



import {
  MatDialog,
} from '@angular/material/dialog';

import { AddNewOperatingUnitDialogComponent } from './add-new-operating-unit-dialog/add-new-operating-unit-dialog.component';


import { OPUnitDetails } from 'src/app/shared/menu-items/operating-unit-details';

import { DialogService } from 'src/app/services/Dialog.service';
import { Subscription } from 'rxjs';
import { treeDataitem, TreeNode } from 'src/app/shared/menu-items/tree-items';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { FetchOPUnits } from 'src/app/shared/menu-items/fetch-op-unit-interface';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { EntitiesList } from 'src/app/shared/menu-items/fetch-op-unit-interface';
import { Activities } from 'src/app/shared/menu-items/fetch-op-unit-interface';
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
  // @Input() entity: any={}; 
  @Input() entity: EntityDataType; 
  @Input() isDotsCliscked: boolean; 
  operatingUnitTypes: FieldDefinitionInterfaces.OperatingUnitTypes[]=[];
  states: FieldDefinitionInterfaces.States[]=[]
  opUnitDataFromApi:FetchOPUnits[]

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
    
      this.opUnitDataFromApi=response.data
      const opResponseData:OPUnitDetails[]= response.data.map((opUnits: FetchOPUnits) => ({
        position: opUnits.id,
        name: opUnits.name,
        entity: opUnits.entities.map((item: EntitiesList) => item.id),
        entityNames:[],
        ownershipID: opUnits.ownership.id,
        ownership: opUnits.ownership.name,
        type: opUnits.operatingUnitType.name,
        location: '', 
        zone: opUnits.locatedAt.name, 
        locationId: opUnits.locatedAt.id,
        employees: '', 
        activities: opUnits.activities.map((item:Activities )=> item.id), 
        laws: '', 
        actions: '' ,
        totalEmployeeCount: opUnits.noOfDeMale+opUnits.noOfDeFemale+opUnits.noOfClMale+opUnits.noOfClFemale
                            +opUnits.noOfChild+opUnits.noOfApprentice
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
    // if (newData['opUnitPosition']!==0){

    // }
    // else{
    //   this.dataSource.push(newData);
    // }
   

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
        entity:this.entity,
        opUnitPosition:0
      }
    });
  }

  openEntityDialogForEdit(entityName: string, position:number) {
    console.log('entityName', entityName);


    this.dialog.open(AddNewOperatingUnitDialogComponent, {
      data: {
        entityTable: this, entityName: entityName, industry: this.entity.industryLabel,
        operatingUnitTypes: this.operatingUnitTypes,
        states: this.states,
        entityPosition:this.entity.position,
        entity:this.entity,
        opUnitPosition:position,
        selectedOP:this.getOpUnitDetailsForEdit(position)
      }
    });
  }

  getOpUnitDetailsForEdit(id: number): FetchOPUnits {
    const opUnit = this.opUnitDataFromApi.find(item => item.id === id);
    if (!opUnit) {
      throw new Error(`Operating unit with id ${id} not found`);
    }
    return opUnit;
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
      case 'Edit':
        this.openEntityDialogForEdit(this.entity.name,position);  
        break;
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
