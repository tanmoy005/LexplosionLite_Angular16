import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { EntityTableComponent } from '../common-components/entity-table/entity-table.component';
import { StepperHelperTextComponent } from '../common-components/stepper-helper-text/stepper-helper-text.component';
import { MatCardModule } from '@angular/material/card';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';
import { RegHeaderComponent } from 'src/app/authentication/register/reg-header/reg-header.component';
import { MatIconModule } from '@angular/material/icon';
import { OperatingUnitComponent } from '../operating-unit/operating-unit.component';
import * as EntityInterfaces from 'src/app/shared/menu-items/entity-interfaces';

@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.css'],
  encapsulation: ViewEncapsulation.None
 
 
})
export class EntityDetailsPageComponent {

  receivedData: any;
  entityTypesList: any;
  industryTypesList: any;
  lawCategoriesList: any;
  countryList: [];
  isEntityDialogOpen: boolean
  selectedEntity: any={
    "position": 1,
    "name": "Test Entity",
    "country": 1,
    "countryLabel": "India",
    "industry": 3,
    "industryLabel": "Manufacturing",
    "entityType": 1,
    "entityTypeLabel": "Company",
    "emailID": "",
    "laws": "",
    "lawModules": [
      1,
      2
    ],
    "lawModulesLabel": [
        "Labour",
        "Operational"
    ],
    "operatingUnit": "",
    "actions": ""
  };

  isAddOperatingUnitClicked: boolean =false;

  constructor(private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    var fieldDefinitionResponse;

    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
    }

    try{
    this.apiService.getFieldDefinition(JSON.stringify(["entityTypes","industryActivities","komriskLawCategories"])).subscribe((response) => {
    fieldDefinitionResponse = response.data;

    this.entityTypesList = fieldDefinitionResponse.entityTypes;
    this.industryTypesList = fieldDefinitionResponse.industryActivities;
    this.lawCategoriesList = fieldDefinitionResponse.komriskLawCategories;
    })
  }
  catch (error) {
      console.log(error)
    }
  }

  handleAddEntity(event: boolean) {
    if (event) {
      console.log('Add New Entity button clicked:', event);
     
    }
  }

  getSelectedCountries(value:any){
    this.countryList = value;
    console.log('country data from business card',this.countryList)
  }

  treeDataItem = treeDataitem;
  goToSubscription(){
    this.router.navigate(['/subscription'], { state: { entity: '' } });
  }


  handleSelectedEntity(entity: any) {
    console.log('Selected entity in page:', entity);
    this.isAddOperatingUnitClicked= true
    this.selectedEntity= entity
    
  }

  handleBackClick(event: boolean) {
    if (event) {
      //console.log('Back button clicked:', event);
      this.isAddOperatingUnitClicked= false
    }
  }
}
