import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';

@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EntityDetailsPageComponent {
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

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  getSelectedCountries(value: number[]) {
    this.countryList = value;
  }

  treeDataItem = treeDataitem;
  goToSubscription() {
    this.router.navigate(['/subscription'], { state: { entity: '' } });
  }

  handleSelectedEntity(entity: EntityDataType) {
    this.isAddOperatingUnitClicked = true;
    this.selectedEntity = entity;
  }

  handleIsDotsClicked(state: boolean) {
    this.isDotsClicked = state;
  }

  handleBackClick(event: boolean) {
    if (event) {
      this.isAddOperatingUnitClicked = false;
      this.cdr.detectChanges();
    }
  }

  handleEntityLoadingState(state: boolean) {
    this.isEntityTableLoading = state;
    this.cdr.detectChanges();
  }
}
