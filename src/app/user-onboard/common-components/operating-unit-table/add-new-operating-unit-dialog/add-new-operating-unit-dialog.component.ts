//import { OPUnitDetailsWithEntity } from './../../../../shared/menu-items/entity-to-opunit-data-interface';
import { Component ,Inject,OnInit} from '@angular/core';
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

import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces'
import { ApiService } from 'src/app/services/api.service';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { EmployeeCardInterface } from 'src/app/shared/menu-items/employee-card-data-interface';
import {OPUnitDetailsWithEntity} from'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { FetchOPUnits } from 'src/app/shared/menu-items/fetch-op-unit-interface';

function transformOperatingUnitTypes(data: OriginalType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    description: item?.description??""
  }));
}

export interface TransformedType1 {
  value: number;
  label: string;
}

export interface TransformedRadioGroup {
  value:number;
  label: string;
  isChecked:boolean;
}


export interface Workforce {
  header: string;
  male: number;
  female: number;
}

@Component({
  selector: 'app-add-new-operating-unit-dialog',
  templateUrl: './add-new-operating-unit-dialog.component.html',
  styleUrls: ['./add-new-operating-unit-dialog.component.scss'],

})



export class AddNewOperatingUnitDialogComponent implements OnInit{
  encryptStorage = new EncryptStorage(environment.localStorageKey);
  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
  dialogHeaderTitle: string = 'Add New Operating Unit';
  dialogHeaderImage: string = '';
  color:string ='#fff';

  transformedDataOperatingUnits: TransformedType[] = [];
  transformedStates: TransformedType[] = [];

  operatingUnitName: string = '';
  operatingUnitType: number ;
  state: number ;
  activity: string = '';
  locatedAt: string = '';
  ownership: number ;
  employeeData:EmployeeCardInterface[];
 
  zone:number

  // editOpUnitDataDetails:OPUnitDetailsWithEntity
  editOpUnitDataDetails:FetchOPUnits
  noOfDeMale: number = 0;
  noOfDeFemale: number = 0;
  noOfClMale: number = 0;
  noOfClFemale: number = 0;
  noOfIsmMale: number = 0;
  noOfIsmFemale: number = 0;
  noOfApprentice:number =0;
  noOfChild: number=0;
  // ownershipDropdown: string[] = ['Owned', 'Leased'];
  
  ownershipDropdown: TransformedRadioGroup[] = [
    {'label':'Owned','value':1, 'isChecked':false},
    {'label':'Leased','value':2, 'isChecked':false}
  ];
  // zoneDropdown: string[] = ['SEZ', 'STPI', 'Not Applicable'];
  zoneDropdown: TransformedRadioGroup [] = [
    {'label':'SEZ','value':2,'isChecked':false}, 
    {'label':'STPI','value':1, 'isChecked':false}, 
    {'label': 'Not Applicable','value':3,'isChecked':false}
];
  entityList:TransformedType[] = []
  industryActivityList:{
    iId: number,
    industry: string,
    subIndustry: string,
    aId: string,
    activity: string
      }[]=[]
  filteredActivitiesList:{value:string,
    label:string
  }[] =[]
  selectedActivitiesList:number[]=[]
  selectedEntities:number[]=[this.data.entity.id]

  constructor(@Inject(MAT_DIALOG_DATA) public data: {entityName: string, industry: string,entityTable: 
    OperatingUnitTableComponent,operatingUnitTypes:OriginalType[],states:OriginalType[],
    entityPosition:number,
    entity:EntityDataType,
    opUnitPosition:number,
    selectedOP:FetchOPUnits},
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddNewOperatingUnitDialogComponent>,
    private apiService:ApiService,) {
   
    this.transformedDataOperatingUnits = transformOperatingUnitTypes(this.data.operatingUnitTypes);
    this.transformedStates = transformOperatingUnitTypes(this.data.states)
    this.entityList = transformOperatingUnitTypes(this.data.entity.entityList)
    console.log('trans op unit types',this.transformedDataOperatingUnits)
    //console.log('the op unit coming in modal',this.data.entity.operatingUnit)
    //this.selectedEntities =  this.data.entity.id
    // console.log("filtered Activities List",this.filteredActivitiesList)
    //console.log('the entity is',this.data.entity)

    // if (this.data.opUnitPosition !== 0){
    // console.log('the opunit position is',this.getOpUnitDetailsForEdit(this.data.opUnitPosition))
    // this.editOpUnitDataDetails = this.getOpUnitDetailsForEdit(this.data.opUnitPosition)
   
    // }
    const savedindustryActivities = this.encryptStorage.getItem('industryActivities');
    this.industryActivityList = savedindustryActivities
    this.filteredActivitiesList = this.getActivitiesByIndustryId(this.data.entity.industry[0])

  }


  ngOnInit(): void {
    if (this.data.opUnitPosition !== 0) {
      console.log('The opunit position is', this.data.selectedOP);
      this.operatingUnitName = this.data.selectedOP.name
      this.operatingUnitType= this.data.selectedOP.operatingUnitType.id
      this.ownership =this.data.selectedOP.ownership.id;

      const ownershipSelectedIndex = this.ownershipDropdown.findIndex((ownership)=> ownership.value === this.ownership);
      this.ownershipDropdown[ownershipSelectedIndex].isChecked = true;

      const zoneSelectedIndex = this.zoneDropdown.findIndex((zone)=>zone.value === this.data.selectedOP.locatedAt.id);
      this.zoneDropdown[zoneSelectedIndex].isChecked = true;

      this.state = this.data.selectedOP.state.id
      this.selectedActivitiesList = this.data.selectedOP.activities.map((item => item.id))
      //console.log('the selected activities are',this.selectedActivitiesList);
      console.log("Selected ownership", this.ownership);
      // this.editOpUnitDataDetails = this.getOpUnitDetailsForEdit(this.data.opUnitPosition);
      // this.operatingUnitName = this.editOpUnitDataDetails.name;
      // this.operatingUnitType= this.editOpUnitDataDetails.operatingUnitType
      // // console.log('the op unit ownership',this.editOpUnitDataDetails.ownership)
      // this.ownership = this.editOpUnitDataDetails.ownership
      // console.log('the op unit ownership',this.ownership)
      // this.zone = this.editOpUnitDataDetails.locatedAt
      // this.state = this.editOpUnitDataDetails.state
    }
  }

  addEntity() {
      this.addNewOpUnit()

      const operatingUnitTypeName = this.findOperatingUnitTypeName(this.operatingUnitType);
      const ownershipName = this.findOwnerShipName(this.ownership) ;
      const zoneName = this.findZoneName(this.zone)
      
     
      const newData: OPUnitDetails = {
        position: 1,
        name: this.operatingUnitName,
        entity:this.selectedEntities,
        entityNames:[],
        //ownership:this.ownership,
        ownershipID: this.ownership,
        ownership:ownershipName,
        type: operatingUnitTypeName, 
        location:'',
        locationId:this.zone,
        zone:zoneName,
        employees:'',
        activities:'',
        laws: '',
        actions:'',
        totalEmployeeCount:0,
        opUnitPosition:this.data.opUnitPosition,
        entityPosition:this.data.entityPosition
      };
      //console.log('op unit added!',newData)
      this.data.entityTable.addOpUnitData(newData);
      
      this.snackbar.showSuccess("Sucessfully added Operating Unit");
      this.dialogRef.close();
      
    
  }
  findOperatingUnitTypeName(id: number): string  {
    const operatingUnitType = this.data.operatingUnitTypes.find(type => type.id === id);
    return operatingUnitType ? operatingUnitType.name : '';
  }

  findZoneName(id: number): string  {
    const zoneType = this.zoneDropdown.find(type => type.value === id);
    return zoneType ? zoneType.label : '';
  }
  findOwnerShipName(id: number): string  {
    const ownerShipType = this.ownershipDropdown.find(type => type.value === id);
    return ownerShipType ? ownerShipType.label : '';
  }

  onSelectedValueChanged(value: any,columnvalue: String) {
    if (columnvalue === 'operatingUnitType'){
     this.operatingUnitType = value
    }
    if (columnvalue === 'states'){
     this.state = value
    }
    if (columnvalue === 'activity'){
   
      this.selectedActivitiesList= value
    }
   
    if (columnvalue === 'entityList'){
      this.selectedEntities = value
     
      console.log('the selected entity list is',value)
     }
     
   }

   employeeCountData(value:EmployeeCardInterface[]){
    this.employeeData = value
    console.log('employee data',value)
    this.extractValues(this.employeeData)
    
   }
   
   apprenticesData(value:number){
    this.noOfApprentice = value
    console.log('apprentice data',value)
   }
   
   childLabourData(value:number){
    this.noOfChild = value
    console.log('child labour data',value)
   }

  CloseDialog(){
    this.dialogRef.close();
  }

  onOwnershipSelectionChange(event: any): void {
    this.ownership = event.value;
    console.log('Selected ownership Value: ', this.ownership);
  }

  onZoneSelectionChange(event: any): void {
    this.zone = event.value;
    console.log('Selected zone Value: ', this.zone);
  }

  getActivitiesByIndustryId(iId: number){
    return this.industryActivityList
      .filter(item => item.iId === iId)
      .map(item => ({ value: item.aId, label: item.activity }));
    //this.filteredActivitiesList = this.data.entity.industry.filter(country => this..includes(country.value));
  }

   extractValues(data: Workforce[]): void {
    data.forEach(item => {
        switch (item.header) {
            case "Direct":
                this.noOfDeMale = item.male;
                this.noOfDeFemale = item.female;
                break;
            case "Contract Labours":
                this.noOfClMale = item.male;
                this.noOfClFemale = item.female;
                break;
            case "Inter-State Migrants":
                this.noOfIsmMale = item.male;
                this.noOfIsmFemale = item.female;
                break;
            default:
                break;
        }
    });
}
 
addNewOpUnit(){
  const id = this.data.opUnitPosition === 0 ? null : this.data.opUnitPosition;
  const payload={
    "id": id,
    "name":this.operatingUnitName,
    "company": [406],
    "entities":this.selectedEntities,
    "operatingUnitType": this.operatingUnitType,
    "state": 36,
    "stateSearch": null,
    "activities":this.selectedActivitiesList,
    "activitySearch": null,
    "locatedAt": this.zone,
    "ownership": this.ownership,
    "noOfDeMale": this.noOfDeMale,
    "noOfDeFemale": this.noOfDeFemale,
    "noOfClMale": this.noOfClMale,
    "noOfClFemale": this.noOfClFemale,
    "noOfIsmMale": this.noOfIsmMale,
    "noOfIsmFemale": this.noOfIsmFemale,
    "noOfApprentice": this.noOfApprentice,
    "noOfChild": this.noOfChild
}

 //console.log('the op payload',payload)
 try{
    this.apiService.postCreateOperatingUnit(payload).subscribe((response) => {
      const entityResponse = response;
      this.snackbar.showSuccess('Operating Unit successfully added.');
   
    })
  }
  catch (error) {
    this.snackbar.showError("Some error occurred while fetching entity list.");
  }
}
getOpUnitDetailsForEdit(id: number): OPUnitDetailsWithEntity {
  const opUnit = this.data.entity.operatingUnit.find(item => item.id === id);
  if (!opUnit) {
    throw new Error(`Operating unit with id ${id} not found`);
  }
  return opUnit;
}


}


