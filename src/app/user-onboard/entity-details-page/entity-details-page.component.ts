import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperComponent } from '../common-components/stepper/stepper.component';
import { entityCreationNullStatus } from 'src/app/shared/menu-items/entity-interfaces';

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
  stepCompletionStatus: boolean = false;

  isDotsClicked: boolean;
  isEntityCreationSuccessful: boolean;

  isEntityTableLoading: boolean;

  @ViewChild(StepperComponent, { static: false }) stepper: StepperComponent;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

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

  handleSuccessfulEntityCreation(state: entityCreationNullStatus) {
    this.isEntityCreationSuccessful = state.isEntityHasNullOPUnit;
    this.stepper.stepCompletionStatus = state.isEntityHasNullOPUnit;
    this.stepper.stepCompletionMessage = state.entityOPUnitNUllMessage;
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
