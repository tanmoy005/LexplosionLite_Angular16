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


function transformOperatingUnitTypes(data: OriginalType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    description: item?.description??""
  }));
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
  apprenticeDataCount:any;
  childLabourDataCount: any;
  zone:any
  // ownershipDropdown: string[] = ['Owned', 'Leased'];
  ownershipDropdown: any = [
    {'option':'Owned','value':1},
    {'option':'Leased','value':2}
  ];
  // zoneDropdown: string[] = ['SEZ', 'STPI', 'Not Applicable'];
  zoneDropdown: any = [
    {'option':'SEZ','value':1}, 
    {'option':'STPI','value':2}, 
    {'option': 'Not Applicable','value':2}
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
  selectedActivitiesList=[]
  selectedEntities:[]=[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: {entityName: string, industry: string,entityTable: 
    OperatingUnitTableComponent,operatingUnitTypes:OriginalType[],states:OriginalType[],
    entityPosition:number,
    entity:any},
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddNewOperatingUnitDialogComponent>) {
   
    this.transformedDataOperatingUnits = transformOperatingUnitTypes(this.data.operatingUnitTypes);
    this.transformedStates = transformOperatingUnitTypes(this.data.states)
    this.entityList = transformOperatingUnitTypes(this.data.entity.entityList)
   
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
   
    // if (this.isDataValid()) {
    //   const operatingUnitTypeName = this.findOperatingUnitTypeName(this.operatingUnitType);
    //   const newData: OPUnitDetails = {
    //     position: 1,
    //     name: this.operatingUnitName,
    //     entity:'',
    //     ownership:'',
    //     type: operatingUnitTypeName, 
    //     location:'',
    //     zone:'',
    //     employees:'',
    //     activities:'',
    //     laws: '',
    //     actions:'',
    //     entityPosition:this.data.entityPosition
    //   };
    //   console.log('op unit added!',newData)
    //   this.data.entityTable.addOpUnitData(newData);
      
    //   this.snackbar.showSuccess("Sucessfully added Operating Unit");
    //   this.dialogRef.close();
      
    // } else {
      
    //   this.snackbar.showError("Please fill all the fields");
    
    // }

   
      const operatingUnitTypeName = this.findOperatingUnitTypeName(this.operatingUnitType);
      const newData: OPUnitDetails = {
        position: 1,
        name: this.operatingUnitName,
        entity:'',
        ownership:this.ownership,
        type: operatingUnitTypeName, 
        location:'',
        zone:this.zone,
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
    // if (columnvalue === 'locatedAt'){
    //  this.locatedAt = value
    // }
    // if (columnvalue === 'ownership'){
    //  this.ownership = value
    // }
    if (columnvalue === 'entityList'){
      this.selectedEntities = value
      console.log('the selected entity list is',value)
     }
     
   }

   employeeCountData(value:any){
    this.employeeData = value
    console.log('employee data',value)
   }
   
   apprenticesData(value:any){
    this.apprenticeDataCount = value
    console.log('apprentice data',value)
   }
   
   childLabourData(value:any){
    this.childLabourDataCount = value
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


}
