import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TreeNode, treeDataitem } from 'src/app/shared/menu-items/tree-items';
import * as EntityInterfaces from 'src/app/shared/menu-items/entity-interfaces';
import { AddEntityDialog } from './add-entity-dialog-component';
import { ViewEntityLawsDialog } from './entity-laws-dialog-component';
import { DialogService } from 'src/app/services/Dialog.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { FetchEntityDetails } from 'src/app/shared/menu-items/fetch-entity-details-interface';
import { Industries } from 'src/app/shared/menu-items/fetch-entity-details-interface';
import { LawCategories } from 'src/app/shared/menu-items/fetch-entity-details-interface';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

const ELEMENT_DATA: EntityInterfaces.BusinessDetails[] = [];

function getMaxIdFromChildren(node: TreeNode): number {
  const rootChildren = treeDataitem.children;
  let maxId = 0;

  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map((child) => child.id));
  }
  return maxId;
}
function getCompanyName() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyName =
    userCompanies.length > 0 ? userCompanies[0]['name'] : '';
  return userCompanyName;
}

function getMaxIdFromGrandchildren(children: TreeNode): number {
  const rootChildren = children.children;

  let maxId = 0;
  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map((child) => child.id));
  }
  return maxId;
}

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
})
export class EntityTableComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  entityChild: TreeNode;

  constructor(
    public dialog: MatDialog,
    private entityDialogService: DialogService,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  displayedColumns: string[] = EntityInterfaces.EntityColumns;
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<EntityInterfaces.BusinessDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() entityTypesList: FieldDefinitionInterfaces.EntityTypes[];
  @Input() industryTypesList: FieldDefinitionInterfaces.IndustryActivies[];
  @Input() lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories[];
  @Input() countryList: number[];

  @Output() entitySelected = new EventEmitter<EntityDataType>();
  @Output() entitySelected1 = new EventEmitter<EntityDataType>();
  @Output() entityTableDataLoading = new EventEmitter<boolean>();
  @Output() isDotsButtonClicked = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.subscription = this.entityDialogService.openDialog$.subscribe(
      (entity?: EntityInterfaces.BusinessDetails | null) => {
        this.viewAddEntityDialog(entity);
      }
    );

    this.fetchEntityList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialFormData: EntityInterfaces.BusinessDetails = {
    id: 0,
    name: '',
    country: 0,
    countryLabel: '',
    industry: [],
    industryLabel: '',
    entityType: 0,
    entityTypeLabel: '',

    laws: '',
    lawModules: [],
    lawModulesLabel: [],
    operatingUnit: [],
    actions: '',
    childrenID: 0,
    entityList: [],
  };

  isTableEntitiesLoading: boolean = false;

  fetchOperatingUnitChildren(
    entityResponseReceived: FetchEntityDetails,
    entityReceived: EntityInterfaces.BusinessDetails
  ) {
    const childrenToAddGrandChildrenTo = treeDataitem.children?.find(
      (children) => children.id === entityReceived.childrenID
    );

    if (childrenToAddGrandChildrenTo !== undefined) {
      const maxId = getMaxIdFromGrandchildren(childrenToAddGrandChildrenTo);
      entityResponseReceived.operatingUnits.forEach((operatingUnit) => {
        const opUnit = {
          id: maxId + 1,

          label: operatingUnit.name,
          children: [],
        };
        childrenToAddGrandChildrenTo?.children?.push(opUnit);
      });
    }
  }

  fetchEntityList() {
    treeDataitem.id = 1;
    treeDataitem.label = getCompanyName();
    treeDataitem.children = [];

    this.entityTableDataLoading.emit(true);
    const entityFetchPayload = { company: 1 };
    try {
      this.apiService
        .postFetchEntityList(entityFetchPayload)
        .subscribe((response) => {
          const entityList = response.data;
          entityList.forEach((entity: FetchEntityDetails) => {
            const maxId = getMaxIdFromChildren(treeDataitem);

            this.entityChild = {
              id: maxId + 1,

              label: entity.name,
              children: [],
            };

            const entityRow: EntityInterfaces.BusinessDetails = {
              ...this.initialFormData,

              id: entity.id,
              name: entity.name,
              industry: entity.industries.map(
                (industry: Industries) => industry.id
              ),
              industryLabel: entity.industries
                .map((industry: Industries) => industry.name)
                .join(','),
              entityType: entity.entityType.id,
              entityTypeLabel: entity.entityType.name,
              lawModules: entity.komriskLawCategories.map(
                (law: LawCategories) => law.id
              ),
              lawModulesLabel: entity.komriskLawCategories.map(
                (law: LawCategories) => law.description
              ),
              operatingUnit: entity.operatingUnits,
              country: 1,
              countryLabel: 'India',

              laws: '',
              actions: '',
              childrenID: this.entityChild.id,
            };
            this.dataSource.push(entityRow);
            treeDataitem?.children?.push(this.entityChild);
            this.fetchOperatingUnitChildren(entity, entityRow);
          });
          this.table.renderRows(); // Ensure this is a MatTable instance
          this.entityTableDataLoading.emit(false);
        });
    } catch (error) {
      this.snackbar.showError(
        'Some error occurred while fetching entity list!'
      );
    }
  }

  viewAddEntityDialog(entity?: EntityInterfaces.BusinessDetails | null) {
    this.openEntityDialog(entity);
  }

  treeDataItem = treeDataitem;

  addEntityData(formData: EntityInterfaces.FormData) {
    const createEntityPayload = {
      id: formData.id,
      name: formData.name,
      company: 1,
      entityType: formData.entityType,
      entityTypeSearch: null,
      industries: formData.industry,
      komriskLawCategories: formData.lawModules,
    };

    try {
      this.apiService
        .postCreateEntity(createEntityPayload)
        .subscribe((response) => {
          const entityResponse = response;

          this.snackbar.showSuccess('Entity successfully added.');
          location.reload();
        });
    } catch (error) {
      this.snackbar.showError(
        'Some error occurred while fetching entity list.'
      );
    }
  }

  openEntityDialog(entity?: EntityInterfaces.BusinessDetails | null) {
    const dialogRef = this.dialog.open(AddEntityDialog, {
      data: { entityTable: this, entity: entity },
    });
  }

  openLawDialog() {
    const name: string = 'Law List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openOpDialog() {
    const name: string = 'Operating Unit List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  navigateToAddOpUnit(entity: EntityDataType, action: string) {
    if (action === 'Add Operating Unit') {
      this.entitySelected.emit(entity);
      this.isDotsButtonClicked.emit(true);
    } else if (action === 'Add Operating Unit from Icon') {
      this.entitySelected.emit(entity);
      this.isDotsButtonClicked.emit(false);
    }
  }

  entityToSend: EntityDataType;

  openEntityMenuDialog(action: string, id: number) {
    switch (action) {
      case 'Delete':
        break;
      case 'Add Operating Unit':
        var entity = this.dataSource.find((entity) => entity.id === id);
        if (entity === undefined) {
          this.snackbar.showError(
            'Some error occurred while adding Operating Unit.'
          );
        } else {
          this.entityToSend = entity;

          this.entityToSend['entityList'] = this.dataSource.map(
            (entity: EntityInterfaces.BusinessDetails) => {
              return {
                id: entity.id,
                name: entity.name,
              };
            }
          );

          this.navigateToAddOpUnit(this.entityToSend, 'Add Operating Unit');
        }
        break;

      case 'Add Operating Unit from Icon':
        var entity = this.dataSource.find((entity) => entity.id === id);
        if (entity === undefined) {
          this.snackbar.showError(
            'Some error occurred while adding Operating Unit.'
          );
        } else {
          this.entityToSend = entity;

          this.entityToSend['entityList'] = this.dataSource.map(
            (entity: EntityInterfaces.BusinessDetails) => {
              return {
                id: entity.id,
                name: entity.name,
              };
            }
          );

          this.navigateToAddOpUnit(
            this.entityToSend,
            'Add Operating Unit from Icon'
          );
        }
        break;
      case 'Edit':
        //var entity = this.dataSource.find((entity) => entity.position === position);
        var entity = this.dataSource.find((entity) => entity.id === id);

        if (entity === undefined) {
          this.snackbar.showError(
            'Some error occurred while adding Operating Unit.'
          );
        } else {
          this.entityDialogService.emitOpenDialog(entity);
        }
        break;
      default:
        break;
    }
  }

  openCountryDialog() {
   
  }

  openIndustryDialog() {

  }

  getImageSource(opUnitLength: number): string {
    
    return opUnitLength > 0
      ? './assets/images/icons/Icons - Lex Kom LiteOperating_Unit.svg'
      : './assets/images/icons/Icons - Lex Kom LiteOperating_Unit_Unavailable.svg';
  }
}
