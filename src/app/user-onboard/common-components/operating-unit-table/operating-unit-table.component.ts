import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Input } from '@angular/core';

import { ApiService } from '../../../services/api.service';

import { MatDialog } from '@angular/material/dialog';

import { AddNewOperatingUnitDialogComponent } from './add-new-operating-unit-dialog/add-new-operating-unit-dialog.component';
import { OpUnitLawsDialogComponent } from './op-unit-laws-dialog/op-unit-laws-dialog.component';
import { OPUnitDetails } from 'src/app/shared/menu-items/operating-unit-details';

import { DialogService } from 'src/app/services/Dialog.service';
import { Subscription } from 'rxjs';
import { treeDataitem, TreeNode } from 'src/app/shared/menu-items/tree-items';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces';
import { FetchOPUnits } from 'src/app/shared/menu-items/fetch-op-unit-interface';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { EntitiesList } from 'src/app/shared/menu-items/fetch-op-unit-interface';
import { Activities } from 'src/app/shared/menu-items/fetch-op-unit-interface';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';

import {
  StateList,
  StateListInterface,
  StateInterface,
} from 'src/app/shared/menu-items/state-list';

function getMaxIdFromGrandchildren(children: TreeNode): number {
  const rootChildren = children.children;

  let maxId = 0;
  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map((child) => child.id));
  }
  return maxId;
}

function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //return encryptStorage.getItem('company-id');
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}

// function summarizeLaws(data: any) {
//   // Initialize an empty map to keep track of unique law IDs for each entity
//   const entityLawsMap = new Map();

//   // Iterate through each item in the data array
//   data.forEach((item: any) => {
//     const entityId = item.operatingUnit.id;
//     const komriskLaws = item.komriskLaws;

//     // Ensure the map has a set initialized for the entity
//     if (!entityLawsMap.has(entityId)) {
//       entityLawsMap.set(entityId, new Set());
//     }

//     // Get the current set of law IDs for this entity
//     const lawIdSet = entityLawsMap.get(entityId);

//     // Add each law ID to the set (duplicates will automatically be ignored)
//     komriskLaws.forEach((law: any) => {
//       lawIdSet.add(law.id);
//     });
//   });

//   // Convert the map to an array of objects with the count of unique laws
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

function summarizeLaws(data: ApplicableLaws[]): EntityLawCount[] {
  const entityLawMap: { [key: number]: Set<number> } = {};

  data.forEach((item) => {
    const entityId = item.operatingUnit.id;
    const lawApplicability = item.lawApplicability;

    if (!entityLawMap[entityId]) {
      entityLawMap[entityId] = new Set<number>();
    }

    entityLawMap[entityId].add(lawApplicability);
  });

  return Object.keys(entityLawMap).map((key) => ({
    id: +key,
    noOfLaws: entityLawMap[+key].size,
  }));
}

/**
 * @title Adding and removing data when using an array-based datasource.
 */
@Component({
  selector: 'app-operating-unit-table',
  templateUrl: 'operating-unit-table.component.html',
  styleUrls: ['./operating-unit-table.component.css'],
})
export class OperatingUnitTableComponent implements OnInit {
  private subscription: Subscription;
  encryptStorage = new EncryptStorage(environment.localStorageKey);
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService,
    private opDialogService: DialogService,
    private snackbar: SnackbarService
  ) {}

  @Input() entity: EntityDataType;
  @Input() isDotsCliscked: boolean;
  operatingUnitTypes: FieldDefinitionInterfaces.OperatingUnitTypes[] = [];
  // states: StateListInterface | undefined;
  states: StateInterface[] | undefined;
  opUnitDataFromApi: FetchOPUnits[];

  ngOnInit(): void {
    this.fetchOpUnitList();
    this.fetchLawsList();
    const savedUniTypes = this.encryptStorage.getItem('operatingUnitTypes');

    // const savedStates = this.apiService.getDemoStateData(this.entity.country);
    //const savedStates = this.apiService.getDemoStateData(1);
    const savedStates = this.encryptStorage.getItem('states');

    this.states = savedStates;
    this.operatingUnitTypes = savedUniTypes;

    this.subscription = this.opDialogService.openDialog$.subscribe(() => {
      this.openEntityDialog(this.entity.name);
    });

    if (this.isDotsCliscked === true) {
      this.openEntityDialog(this.entity.name);
    } else {
      if (
        Array.isArray(this.entity.operatingUnit) &&
        this.entity.operatingUnit.length === 0
      ) {
        this.openEntityDialog(this.entity.name);
      }
    }
  }

  ApplicableLawsItems: ApplicableLaws[] = [];
  LawSummary: any = [];

  fetchLawsList() {
    const payload = {
      company: getCompanyId(),
    };
    try {
      this.apiService.postApplicableLaws(payload).subscribe((response) => {
        if (response) {
          this.ApplicableLawsItems = response.data;
          //this.isLoading = false;
          const summary = summarizeLaws(response.data);

          this.LawSummary = summary;
        }
      });
    } catch (e) {
      this.snackbar.showError('Some error occurred while fetching Laws');
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

  fetchApplicableLaws() {}

  addGrandChildren(operatingUnitName: string) {
    const childrenToAddGrandChildrenTo = treeDataitem.children?.find(
      (children) => children.id === this.entity.childrenID
    );

    if (childrenToAddGrandChildrenTo !== undefined) {
      const maxId = getMaxIdFromGrandchildren(childrenToAddGrandChildrenTo);
      const entity = {
        id: maxId + 1,

        label: operatingUnitName,
        level: 2,
        children: [],
      };
      var operatingUnitExists = false;
      childrenToAddGrandChildrenTo.children?.forEach(
        (existingOperatingUnit) => {
          if (existingOperatingUnit.label === operatingUnitName) {
            operatingUnitExists = true;
          }
        }
      );
      if (operatingUnitExists === false) {
        childrenToAddGrandChildrenTo?.children?.push(entity);
      }
    }
  }

  fetchOpUnitList() {
    const payLoad = { entity: this.entity.id };
    this.apiService.fetcheOperatingUnit(payLoad).subscribe((response) => {
      this.opUnitDataFromApi = response.data;
      const currentCount = 0;

      const opResponseData: OPUnitDetails[] = response.data.map(
        (opUnits: FetchOPUnits, index: number) => ({
          opID: opUnits.id,
          count: currentCount + index + 1,
          name: opUnits.name,
          entity: opUnits.entities.map((item: EntitiesList) => item.id),
          entityNames: [],
          ownershipID: opUnits.ownership.id,
          ownership: opUnits.ownership.name,
          type: opUnits.operatingUnitType.name,
          location: '',
          zone: opUnits.locatedAt.name,
          locationId: opUnits.locatedAt.id,
          employees: '',
          activities: opUnits.activities.map((item: Activities) => item.id),
          laws: '',
          actions: '',
          totalEmployeeCount:
            opUnits.noOfDeMale +
            opUnits.noOfDeFemale +
            opUnits.noOfIsmMale +
            opUnits.noOfIsmFemale +
            opUnits.noOfClMale +
            opUnits.noOfClFemale +
            opUnits.noOfChild +
            opUnits.noOfApprentice,
        })
      );

      opResponseData.forEach((operatingUnit) => {
        this.addGrandChildren(operatingUnit.name);
      });

      this.dataSource = opResponseData;
    });
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'ownership',
    'type',
    'location',
    'zone',
    'entity',
    'employees',
    'activities',
    'laws',
    'actions',
  ];

  dataSource: OPUnitDetails[] = [];

  @ViewChild(MatTable) table: MatTable<OPUnitDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  rearrangeDataSource() {
    this.dataSource.sort((a, b) => a.opID - b.opID);
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].opID = i + 1;
    }
  }

  removeEntityData(position: number) {
    const rowIndex = this.dataSource.findIndex((row) => row.opID === position);
    if (rowIndex !== -1) {
      this.dataSource.splice(rowIndex, 1);

      this.rearrangeDataSource();

      this.table.renderRows();
    }
  }

  openEntityDialog(entityName: string) {
    this.dialog.open(AddNewOperatingUnitDialogComponent, {
      data: {
        entityTable: this,
        entityName: entityName,
        industry: this.entity.industryLabel,
        operatingUnitTypes: this.operatingUnitTypes,
        states: this.states,

        entityPosition: this.entity.id,
        entity: this.entity,
        opUnitPosition: 0,
        countryIdList: this.entity.country,
      },
    });
  }

  openEntityDialogForEdit(entityName: string, opID: number) {
    this.dialog.open(AddNewOperatingUnitDialogComponent, {
      data: {
        entityTable: this,
        entityName: entityName,
        industry: this.entity.industryLabel,
        operatingUnitTypes: this.operatingUnitTypes,
        states: this.states,

        entityPosition: this.entity.id,
        entity: this.entity,
        opUnitPosition: opID,
        selectedOP: this.getOpUnitDetailsForEdit(opID),
        countryIdList: this.entity.country,
      },
    });
  }

  getOpUnitDetailsForEdit(id: number): FetchOPUnits {
    const opUnit = this.opUnitDataFromApi.find((item) => item.id === id);
    if (!opUnit) {
      throw new Error(`Operating unit with id ${id} not found`);
    }
    return opUnit;
  }

  openLawDialog(opID: number) {
    this.router.navigate(['/laws'], {
      state: { entity: this.entity.id, operatingUnit: [opID] },
    });
  }

  navigateBackToEntityDetailsPage() {
    this.router.navigate(['/entity-details'], { state: this.entity });
  }

  openopUnitMenuDialog(action: string, opID: number) {
    switch (action) {
      case 'Delete':
        this.removeEntityData(opID);
        break;
      case 'Edit':
        this.openEntityDialogForEdit(this.entity.name, opID);
        break;
      default:
        break;
    }
  }
}
