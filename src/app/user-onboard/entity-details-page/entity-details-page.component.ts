import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { EntityTableComponent } from '../common-components/entity-table/entity-table.component';
import { StepperHelperTextComponent } from '../common-components/stepper-helper-text/stepper-helper-text.component';
import { MatCardModule } from '@angular/material/card';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';
import { RegHeaderComponent } from 'src/app/authentication/register/reg-header/reg-header.component';

@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.css'],
 
})
export class EntityDetailsPageComponent {

  receivedData: any;
  entityTypesList: any;
  industryTypesList: any;
  lawCategoriesList: any;
  countryList: any;

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

  getSelectedCountries(value:any){
    this.countryList = value;
  }

  treeDataItem = treeDataitem;
  showTreeData(){
    console.log("Tree data- ", this.treeDataItem)
  }
}
