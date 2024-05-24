import { Component ,Inject} from '@angular/core';
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
export interface Workforce {
  header: string;
  male: number;
  female: number;
}

@Component({
  selector: 'app-add-new-operating-unit-dialog',
  templateUrl: './add-new-operating-unit-dialog.component.html',
  styleUrls: ['./add-new-operating-unit-dialog.component.scss'],
  // standalone:true,
  // imports:[MatDialogModule,
  //   MatButtonModule,
  //   MatInputModule,
  //   MatCardModule,
  //   FormsModule,
  //   DropdownComponent,
  //   MatSelectModule,
  //   EmployeeCountCardComponent
  // ]
})



export class AddNewOperatingUnitDialogComponent {
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
  operatingUnitType: string = '';
  state: string = '';
  activity: string = '';
  locatedAt: string = '';
  ownership: any ;
  employeeData:any;
 
  zone:any


  noOfDeMale: number = 0;
  noOfDeFemale: number = 0;
  noOfClMale: number = 0;
  noOfClFemale: number = 0;
  noOfIsmMale: number = 0;
  noOfIsmFemale: number = 0;
  noOfApprentice:number =0;
  noOfChild: number=0;
  // ownershipDropdown: string[] = ['Owned', 'Leased'];
  ownershipDropdown: TransformedType1[] = [
    {'label':'Owned','value':1},
    {'label':'Leased','value':2}
  ];
  // zoneDropdown: string[] = ['SEZ', 'STPI', 'Not Applicable'];
  zoneDropdown: TransformedType1[] = [
    {'label':'SEZ','value':1}, 
    {'label':'STPI','value':2}, 
    {'label': 'Not Applicable','value':2}
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
  selectedActivitiesList:[]=[]
  selectedEntities:string[]=[this.data.entity.id]

  constructor(@Inject(MAT_DIALOG_DATA) public data: {entityName: string, industry: string,entityTable: 
    OperatingUnitTableComponent,operatingUnitTypes:OriginalType[],states:OriginalType[],
    entityPosition:number,
    entity:any},
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddNewOperatingUnitDialogComponent>,
    private apiService:ApiService,) {
   
    this.transformedDataOperatingUnits = transformOperatingUnitTypes(this.data.operatingUnitTypes);
    this.transformedStates = transformOperatingUnitTypes(this.data.states)
    this.entityList = transformOperatingUnitTypes(this.data.entity.entityList)
    //this.selectedEntities =  this.data.entity.id
    console.log("filtered Activities List",this.filteredActivitiesList)
    console.log('the industry id is',this.data.entity.industry)
    const savedindustryActivities = this.encryptStorage.getItem('industryActivities');
    this.industryActivityList = savedindustryActivities
    this.filteredActivitiesList = this.getActivitiesByIndustryId(this.data.entity.industry[0])

  }
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
        location:zoneName,
        locationId:this.zone,
        zone:'',
        employees:'',
        activities:'',
        laws: '',
        actions:'',
        
        entityPosition:this.data.entityPosition
      };
      //console.log('op unit added!',newData)
      this.data.entityTable.addOpUnitData(newData);
      
      this.snackbar.showSuccess("Sucessfully added Operating Unit");
      this.dialogRef.close();
      
    
  }
  findOperatingUnitTypeName(id: any): string  {
    const operatingUnitType = this.data.operatingUnitTypes.find(type => type.id === id);
    return operatingUnitType ? operatingUnitType.name : '';
  }

  findZoneName(id: any): string  {
    const zoneType = this.zoneDropdown.find(type => type.value === id);
    return zoneType ? zoneType.label : '';
  }
  findOwnerShipName(id: any): string  {
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
    //  this.activity = value
      this.selectedActivitiesList= value
    }
   
    if (columnvalue === 'entityList'){
      this.selectedEntities = value
      // this.selectedEntities.push(value);
      console.log('the selected entity list is',value)
     }
     
   }

   employeeCountData(value:any){
    this.employeeData = value
    console.log('employee data',value)
    this.extractValues(this.employeeData)
    
   }
   
   apprenticesData(value:any){
    this.noOfApprentice = value
    console.log('apprentice data',value)
   }
   
   childLabourData(value:any){
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
  const payload={
    "id": null,
    "name":this.operatingUnitName,
    // "company": this.data.entity.id,
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

}
