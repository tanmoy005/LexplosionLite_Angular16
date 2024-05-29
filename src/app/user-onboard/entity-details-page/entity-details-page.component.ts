import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';

@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EntityDetailsPageComponent {
  //receivedData: any;
  entityTypesList: FieldDefinitionInterfaces.EntityTypes;
  industryTypesList: FieldDefinitionInterfaces.IndustryActivies;
  lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories;
  countryList: number[];
  isEntityDialogOpen: boolean;
  selectedEntity: EntityDataType;
  selectedEntity1: EntityDataType;

  isAddOperatingUnitClicked: boolean = false;

  isDotsClicked: boolean;

  isEntityTableLoading: boolean;

  constructor(private router: Router, private apiService: ApiService) {
    //const navigation = this.router.getCurrentNavigation();
    // var fieldDefinitionResponse;
    // if (navigation && navigation.extras.state) {
    //   this.receivedData = navigation.extras.state;
    // }
  }

  handleAddEntity(event: boolean) {
    if (event) {
      console.log('Add New Entity button clicked:', event);
    }
  }

  getSelectedCountries(value: number[]) {
    this.countryList = value;
    console.log('country data from business card', this.countryList);
  }

  treeDataItem = treeDataitem;
  goToSubscription() {
    this.router.navigate(['/subscription'], { state: { entity: '' } });
  }

  handleSelectedEntity(entity: EntityDataType) {
    this.isAddOperatingUnitClicked = true;
    this.selectedEntity = entity;
    //this.isDotsClicked= true
  }

  handleIsDotsClicked(state: boolean) {
    this.isDotsClicked = state;
    console.log('Selected entity in page from dots or not', this.isDotsClicked);
  }

  handleBackClick(event: boolean) {
    if (event) {
      this.isAddOperatingUnitClicked = false;
    }
  }

  handleEntityLoadingState(state: boolean) {
    this.isEntityTableLoading = state;
  }
}
