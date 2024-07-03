import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent {
  private isDotsClickedPromise: Promise<void> | null = null;
  private resolveDotsClickedPromise: (() => void) | null = null;

  treeDataItem = treeDataitem;
  activeLevel: number = 1
 
  encryptStorage = new EncryptStorage(environment.localStorageKey);

  entityTypesList: FieldDefinitionInterfaces.EntityTypes[];
  industryTypesList: FieldDefinitionInterfaces.IndustryActivies[];
  lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories[];

  isEntityDialogOpen: boolean;
  selectedEntity: EntityDataType;

  isDataComingFromDots: boolean;

  entitiesOPUnitNullStatus: boolean = false;
  entitiesOPUnitNullList: string[];

  @Input() countryList: number[] = [];
  @Output() selectedEntityEmitter = new EventEmitter<EntityDataType>();
  @Output() selectedEntityEmitter1 = new EventEmitter<EntityDataType>();
  @Output() handleTableDataLoadingFromEntity = new EventEmitter<boolean>();
  @Output() isDotsClicked = new EventEmitter<boolean>();
  @Output() isEntityCreationSuccessful = new EventEmitter<boolean>();

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

  handleEntitiesOPUnitStatus(state:FieldDefinitionInterfaces.entitiesOperatingUnitStatus){
    this.entitiesOPUnitNullStatus = state.entitiesOperatingUnitNullStatus;
    this.entitiesOPUnitNullList = state.entitiesOperatingUnitNullList;

    if(!this.entitiesOPUnitNullStatus){
      this.isEntityCreationSuccessful.emit(true);
    }

    else{
      this.isEntityCreationSuccessful.emit(false);
    }
  }


  goToSubscription() { 

    // This portion is used to restrict the user from going to the Feature List page
    // If the user doesn't add any operating unit for an entity
  
    if(!this.entitiesOPUnitNullStatus){
      this.router.navigate(['/subscription'], { state: { entity: '' } });
    }
    else{
      let entityStringLabel = this.entitiesOPUnitNullList.length === 1 ? 'entity' : 'entities';
      this.snackbar.showWarning("Please add operating unit for the "+entityStringLabel+"- "+this.entitiesOPUnitNullList.join(", "));
    }
    
  }
}
