import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { entityCreationNullStatus } from 'src/app/shared/menu-items/entity-interfaces';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent {
  private isDotsClickedPromise: Promise<void> | null = null;
  private resolveDotsClickedPromise: (() => void) | null = null;

  treeDataItem = treeDataitem;
  activeLevel: number = 1;

  encryptStorage = new EncryptStorage(environment.localStorageKey);

  entityTypesList: FieldDefinitionInterfaces.EntityTypes[];
  industryTypesList: FieldDefinitionInterfaces.IndustryActivies[];
  lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories[];

  isEntityDialogOpen: boolean;
  selectedEntity: EntityDataType;

  isDataComingFromDots: boolean;

  entitiesOPUnitNullStatus: boolean = false;
  entitiesOPUnitNullList: string[];

  isAddNewUserClicked: boolean = false;

  entityUnsuccessfulCreationMessage: string;

  @Input() countryList: number[] = [];
  @Output() selectedEntityEmitter = new EventEmitter<EntityDataType>();
  @Output() selectedEntityEmitter1 = new EventEmitter<EntityDataType>();
  @Output() handleTableDataLoadingFromEntity = new EventEmitter<boolean>();
  @Output() isDotsClicked = new EventEmitter<boolean>();
  @Output() isEntityCreationSuccessful =
    new EventEmitter<entityCreationNullStatus>();
  @Output() isemitedAddNewUserClicked = new EventEmitter<boolean>();

  constructor(private router: Router, private snackbar: SnackbarService) {
    const savedentityTypes = this.encryptStorage.getItem('entityTypes');
    const savedindustryActivities =
      this.encryptStorage.getItem('industryActivities');
    const savedLawCategories = this.encryptStorage.getItem(
      'komriskLawCategories'
    );

    this.entityTypesList = savedentityTypes;
    this.industryTypesList = savedindustryActivities;
    this.lawCategoriesList = savedLawCategories;
    this.resetDotsClickedPromise();
  }

  private resetDotsClickedPromise() {
    this.isDotsClickedPromise = new Promise<void>((resolve) => {
      this.resolveDotsClickedPromise = resolve;
    });
  }

  async handleEntitySelected(entity: EntityDataType) {
    await this.isDotsClickedPromise;

    this.selectedEntity = entity;
    this.selectedEntityEmitter.emit(this.selectedEntity);
    this.isDotsClicked.emit(this.isDataComingFromDots);

    this.resetDotsClickedPromise();
  }

  handleIsDotsClicked(state: boolean) {
    this.isDataComingFromDots = state;
    if (this.resolveDotsClickedPromise) {
      this.resolveDotsClickedPromise();
    }
  }

  handleTableDataLoading(state: boolean) {
    this.handleTableDataLoadingFromEntity.emit(state);
  }

  handleEntitiesOPUnitStatus(
    state: FieldDefinitionInterfaces.entitiesOperatingUnitStatus
  ) {
    this.entitiesOPUnitNullStatus = state.entitiesOperatingUnitNullStatus;
    this.entitiesOPUnitNullList = state.entitiesOperatingUnitNullList;

    if (!this.entitiesOPUnitNullStatus) {
      this.isEntityCreationSuccessful.emit({
        isEntityHasNullOPUnit: true,
        entityOPUnitNUllMessage: '',
      });
    } else {
      let entityStringLabel =
        this.entitiesOPUnitNullList.length === 1 ? 'entity' : 'entities';
      this.entityUnsuccessfulCreationMessage =
        'Please add operating unit for the ' +
        entityStringLabel +
        '- ' +
        this.entitiesOPUnitNullList.join(', ');
      this.isEntityCreationSuccessful.emit({
        isEntityHasNullOPUnit: false,
        entityOPUnitNUllMessage: this.entityUnsuccessfulCreationMessage,
      });
    }
  }

  goToSubscription() {
    // if (!this.entitiesOPUnitNullStatus) {
    //   this.router.navigate(['/subscription'], { state: { entity: '' } });
    // } else {
    //   this.snackbar.showWarning(this.entityUnsuccessfulCreationMessage);
    // }

    this.router.navigate(['/subscription'], { state: { entity: '' } });
  }

  handleIsAddNewUserClicked(state: boolean) {
    this.isAddNewUserClicked = state;

    this.isemitedAddNewUserClicked.emit(this.isAddNewUserClicked);
    // this.isDataComingFromDots = state;
    // if (this.resolveDotsClickedPromise) {
    //   this.resolveDotsClickedPromise();
    // }
  }
}
