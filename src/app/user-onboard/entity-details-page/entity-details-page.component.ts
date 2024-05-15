import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { EntityTableComponent } from '../common-components/entity-table/entity-table.component';
import { StepperHelperTextComponent } from '../common-components/stepper-helper-text/stepper-helper-text.component';
import { MatCardModule } from '@angular/material/card';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.css'],
})
export class EntityDetailsPageComponent {

  receivedData: any;
  // treeDataItem: any;
  entityTypesList: any;
  industryTypesList: any;
  lawCategoriesList: any;


  constructor(private router: Router, private apiService: ApiService) {
    // Retrieve data from navigation state
    
    const navigation = this.router.getCurrentNavigation();
    var fieldDefinitionResponse;

    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
      //console.log("This is the received data back in entity page", this.receivedData); 
    }

    try{
    this.apiService.getFieldDefinition(JSON.stringify(["entityTypes","industryActivities","komriskLawCategories"])).subscribe((response) => {
    
    //console.log("ENTITY RESPONSE", response);
    fieldDefinitionResponse = response.data;

    this.entityTypesList = fieldDefinitionResponse.entityTypes;
    this.industryTypesList = fieldDefinitionResponse.industryActivities;
    this.lawCategoriesList = fieldDefinitionResponse.komriskLawCategories;
    // console.log(this.entityTypesList)
    // console.log(this.industryTypesList)
    // console.log(this.lawCategoriesList)
    })
  }
  catch (error) {
      console.log(error)
    }
  }

  treeDataItem = treeDataitem;
  showTreeData(){
    console.log("Tree data- ", this.treeDataItem)
  }
}
