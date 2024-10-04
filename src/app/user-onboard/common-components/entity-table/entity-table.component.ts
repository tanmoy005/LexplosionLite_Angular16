import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  EventEmitter,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
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
import { IndustryDialogComponent } from './industry-dialog/industry-dialog.component';
import { Router } from '@angular/router';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';

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

function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //return encryptStorage.getItem('company-id');
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}

function getMaxIdFromGrandchildren(children: TreeNode): number {
  const rootChildren = children.children;

  let maxId = 0;
  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map((child) => child.id));
  }
  return maxId;
}

// function summarizeLaws(data: any) {
//   // Initialize an empty map to keep track of laws count for each entity
//   const entityLawsMap = new Map();

//   // Iterate through each item in the data array
//   data.forEach((item: any) => {
//     const entityId = item.entity.id;
//     const numberOfLaws = item.komriskLaws.length;

//     // Update the count of laws for each entity
//     if (entityLawsMap.has(entityId)) {
//       entityLawsMap.set(entityId, entityLawsMap.get(entityId) + numberOfLaws);
//     } else {
//       entityLawsMap.set(entityId, numberOfLaws);
//     }
//   });

//   // Convert the map to an array of objects
//   const result = Array.from(entityLawsMap, ([id, noOfLaws]) => ({
//     id,
//     noOfLaws,
//   }));

//   return result;
// }

// function summarizeLaws(data: any) {
//   const entityLawsMap = new Map();

//   data.forEach((item: any) => {
//     const entityId = item.entity.id;
//     const komriskLaws = item.komriskLaws;

//     if (!entityLawsMap.has(entityId)) {
//       entityLawsMap.set(entityId, new Set());
//     }

//     const lawIdSet = entityLawsMap.get(entityId);

//     komriskLaws.forEach((law: any) => {
//       lawIdSet.add(law.id);
//     });
//   });

//   const result = Array.from(entityLawsMap, ([id, lawIdSet]) => ({
//     id,
//     noOfLaws: lawIdSet.size,
//   }));

//   return result;
// }

interface EntityLawCount {
  id: number;
  noOfLaws: number;
}

interface EntityLawAndOpUnitCount {
  id: number;
  noOfOpUnits: number;
  noOfLaws: number;
}

function summarizeLaws(data: ApplicableLaws[]): EntityLawCount[] {
  // Define the type for the map where entityId is the key and the count of laws is the value
  const entityLawMap: { [key: number]: number } = {};

  data.forEach((item) => {
    const entityId = item.entity.id;

    // If the entityId is not in the map, initialize it with 0
    if (!entityLawMap[entityId]) {
      entityLawMap[entityId] = 0;
    }

    // Increment the law count for each occurrence of lawApplicability
    entityLawMap[entityId]++;
  });

  // Convert the map into the desired structure
  return Object.keys(entityLawMap).map((key) => ({
    id: +key, // Convert key to number
    noOfLaws: entityLawMap[+key], // Use the value as the count of laws
  }));
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
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  displayedColumns: string[] = EntityInterfaces.EntityColumns;
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<EntityInterfaces.BusinessDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() entityTypesList: FieldDefinitionInterfaces.EntityTypes[];
  @Input() industryTypesList: FieldDefinitionInterfaces.IndustryActivies[];
  @Input() lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories[];
  // @Input() countryList: number[];

  @Input() countryList: any[];

  @Output() entitySelected = new EventEmitter<EntityDataType>();
  @Output() entitySelected1 = new EventEmitter<EntityDataType>();
  @Output() entityTableDataLoading = new EventEmitter<boolean>();
  @Output() isDotsButtonClicked = new EventEmitter<boolean>();
  @Output() checkAllEntitiesOPUnit =
    new EventEmitter<FieldDefinitionInterfaces.entitiesOperatingUnitStatus>();

  @Output() isNoEntity = new EventEmitter<boolean>();
  @Output() isNoOpUnit = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.subscription = this.entityDialogService.openDialog$.subscribe(
      (entity?: EntityInterfaces.BusinessDetails | null) => {
        this.viewAddEntityDialog(entity);
      }
    );

    this.fetchEntityList();
    this.fetchLawsList();
  }
  ApplicableLawsItems: ApplicableLaws[] = [];
  LawSummary: any = [];

  fetchLawsList() {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);
    const payload = {
      company: getCompanyId(),
    };
    try {
      this.apiService.postApplicableLaws(payload).subscribe((response) => {
        console.log('response23423', response);
        
        if (response) {
          this.ApplicableLawsItems = response.data;
          //this.isLoading = false;
          const summary = summarizeLaws(response.data);

          this.LawSummary = summary;
          encryptStorage.setItem('companyLaws', response.data);
        }
      });
    } catch (e) {
      console.log('error111', e);
      
      // this.snackbar.showError('Some error occurred while fetching Laws');
      // this.isLoading = false;
    }
  }
  getBadgeCount(id: number): number | null {
    const data = this.LawSummary.find((item: any) => item.id === id);
    return data ? data.noOfLaws : null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialFormData: EntityInterfaces.BusinessDetails = {
    id: 0,
    name: '',
    // country: 0,
    country: [0],
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
    count: 0,
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
          level: 2,
          children: [],
        };
        childrenToAddGrandChildrenTo?.children?.push(opUnit);
      });
    }
  }

  countryForCompanyIdList: any = [];

  fetchEntityList() {
    treeDataitem.id = 1;
    treeDataitem.label = getCompanyName();
    treeDataitem.children = [];
    let isNoOpUnit = true;
    this.entityTableDataLoading.emit(true);
    //const entityFetchPayload = { company: 1 };
    const entityFetchPayload = { company: getCompanyId() };
    var opUnitNullStatus = false;
    var opUnitNullEntitiesList: string[] = [];

    var entityNullStatus: boolean = false;

    try {
      this.apiService
        .postFetchEntityList(entityFetchPayload)
        .subscribe((response) => {
          const entityList = response.data;

          if (entityList.length === 0) {
            entityNullStatus = true;
          }
          const currentCount = 0;
          entityList.forEach((entity: FetchEntityDetails, index: number) => {
            const countryIds = entity['countries'].map(
              (country: any) => country.id
            );
            this.countryForCompanyIdList = countryIds;
            const maxId = getMaxIdFromChildren(treeDataitem);

            this.entityChild = {
              id: maxId + 1,

              label: entity.name,
              level: 1,
              children: [],
            };

            const entityRow: EntityInterfaces.BusinessDetails = {
              ...this.initialFormData,

              id: entity.id,
              name: entity.name,
              count: currentCount + index + 1,
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
              // country: [1],
              // countryLabel: 'India',
              // country: [1],
              country: countryIds,
              countryLabel: 'India',

              laws: '',
              actions: '',
              childrenID: this.entityChild.id,
            };

            // if (entityRow.operatingUnit.length === 0) {
            //   opUnitNullStatus = true;
            //   opUnitNullEntitiesList.push(entityRow.name);
            // }
            if (entityRow.operatingUnit.length === 0) {
              opUnitNullStatus = true;
              opUnitNullEntitiesList.push(entityRow.name);
            } else {
              isNoOpUnit = false;
            }

            this.dataSource.push(entityRow);
            treeDataitem?.children?.push(this.entityChild);
            this.fetchOperatingUnitChildren(entity, entityRow);
          });

          // treeDataitem

          this.table.renderRows();
          this.entityTableDataLoading.emit(false);
          this.checkAllEntitiesOPUnit.emit({
            entitiesOperatingUnitNullStatus: opUnitNullStatus,
            entitiesOperatingUnitNullList: opUnitNullEntitiesList,
          });

          this.isNoEntity.emit(entityNullStatus);
          this.isNoOpUnit.emit(isNoOpUnit);
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

  addEntityData(formData: EntityInterfaces.FormData, successMessage: string) {
    const createEntityPayload = {
      id: formData.id,
      name: formData.name,
      //company: 1,
      company: getCompanyId(),
      entityType: formData.entityType,
      entityTypeSearch: null,
      industries: formData.industry,
      komriskLawCategories: formData.lawModules,
      countries: formData.country,
    };

    try {
      this.apiService
        .postCreateEntity(createEntityPayload)
        .subscribe((response) => {
          const entityResponse = response;

          this.snackbar.showSuccess(successMessage);
          // location.reload();
          this.dataSource = [];
          this.fetchEntityList();
          this.fetchLawsList();
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

  // openLawDialog() {
  //   const name: string = 'Law List';
  //   const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
  //     data: { name: name },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {});
  // }
  openLawDialog(entityId: number) {
    this.router.navigate(['/laws'], {
      state: { entity: entityId },
    });
    // const name: string = 'Law List';
    // const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
    //   data: { name: name },
    // });
    // dialogRef.afterClosed().subscribe((result) => {});
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

  openCountryDialog() {}

  openIndustryDialog(id: number) {
    var entity = this.dataSource.find((entity) => entity.id === id);

    if (entity === undefined) {
      this.snackbar.showError(
        'Some error occurred while adding Operating Unit.'
      );
    } else {
      var industries = entity.industry;
      this.dialog.open(IndustryDialogComponent, {
        data: industries,
      });
    }
  }

  getImageSource(opUnitLength: number): string {
    return opUnitLength > 0
      ? './assets/images/icons/Icons - Lex Kom LiteOperating_Unit.svg'
      : './assets/images/icons/Icons - Lex Kom LiteOperating_Unit_Unavailable.svg';
  }
  getImageSourceLwas(opUnitLength: number): string {
    return opUnitLength > 0
      ? './assets/images/icons/Vectorlaw.svg'
      : './assets/images/icons/Vectorlaw_Disabled.svg';
  }
}
