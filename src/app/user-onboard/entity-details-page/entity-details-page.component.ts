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
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces'
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';


@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.css'],
  encapsulation: ViewEncapsulation.None
 
 
})
export class EntityDetailsPageComponent {

  receivedData: any;
  entityTypesList: FieldDefinitionInterfaces.EntityTypes;
  industryTypesList: FieldDefinitionInterfaces.IndustryActivies;
  lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories;
  countryList: number[];
  isEntityDialogOpen: boolean
  selectedEntity: EntityDataType;
  selectedEntity1: EntityDataType;

  isAddOperatingUnitClicked: boolean =false;

  isDotsCliscked: boolean;

  isEntityTableLoading:boolean;
  

  constructor(private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    var fieldDefinitionResponse;

    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
    }


  }

  handleAddEntity(event: boolean) {
    if (event) {
      console.log('Add New Entity button clicked:', event);
     
    }
  }

  getSelectedCountries(value:number[]){
    this.countryList = value;
    console.log('country data from business card',this.countryList)
  }

  treeDataItem = treeDataitem;
  goToSubscription(){
    this.router.navigate(['/subscription'], { state: { entity: '' } });
  }


  handleSelectedEntity(entity: EntityDataType) {
    console.log('Selected entity in page from dots', entity);
    this.isAddOperatingUnitClicked= true
    this.selectedEntity= entity
    this.isDotsCliscked= true
    
  }
  handleSelectedEntity1(entity: EntityDataType) {
    console.log('Selected entity in page:', entity);
    this.isAddOperatingUnitClicked= true
    this.selectedEntity= entity
    this.isDotsCliscked= false
    
  }

  handleBackClick(event: boolean) {
    if (event) {
      //console.log('Back button clicked:', event);
      this.isAddOperatingUnitClicked= false
    }
  }

  handleEntityLoadingState(state:boolean){
    //console.log("Table Data loading state", state);
    this.isEntityTableLoading = state;
  }
}
