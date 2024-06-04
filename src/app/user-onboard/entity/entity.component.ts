import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent {
  private isDotsClickedPromise: Promise<void> | null = null;
  private resolveDotsClickedPromise: (() => void) | null = null;

  treeDataItem = treeDataitem;
  //receivedData: any;
  encryptStorage = new EncryptStorage(environment.localStorageKey);

  entityTypesList: FieldDefinitionInterfaces.EntityTypes[];
  industryTypesList: FieldDefinitionInterfaces.IndustryActivies[];
  lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories[];

  isEntityDialogOpen: boolean;
  selectedEntity: EntityDataType;

  isDataComingFromDots: boolean;

  @Input() countryList: number[] = [];
  @Output() selectedEntityEmitter = new EventEmitter<EntityDataType>();
  @Output() selectedEntityEmitter1 = new EventEmitter<EntityDataType>();
  @Output() handleTableDataLoadingFromEntity = new EventEmitter<boolean>();
  @Output() isDotsClicked = new EventEmitter<boolean>();

  constructor(private router: Router) {
    
 
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
  goToSubscription() {
    this.router.navigate(['/subscription'], { state: { entity: '' } });
  }
}
