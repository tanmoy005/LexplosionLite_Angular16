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
  states: StateListInterface | undefined;
  opUnitDataFromApi: FetchOPUnits[];

  ngOnInit(): void {
    this.fetchOpUnitList();
    const savedUniTypes = this.encryptStorage.getItem('operatingUnitTypes');

    // const savedStates = this.apiService.getDemoStateData(this.entity.country);
    const savedStates = this.apiService.getDemoStateData(1);

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
    console.log('the op unit dialog for entity', this.entity);
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
    // const payload = {
    //   company: getCompanyId(),
    //   entity: this.entity.id,
    //   operatingUnit: [opID],
    // };
    this.router.navigate(['/laws'], {
      state: { entity: this.entity.id, operatingUnit: [opID] },
    });
    // const dialogRef = this.dialog.open(OpUnitLawsDialogComponent, {});
    // dialogRef.afterClosed().subscribe((result) => {});
    // const payload = {
    //   company: getCompanyId(),
    //   entity: this.entity.id,
    //   operatingUnit: [opID],
    // };
    // console.log('the payload for laws', payload);
    // try {
    //   this.apiService.postApplicableLaws(payload).subscribe((response) => {
    //     if (response) {
    //       this.router.navigate(['/laws']);
    //       // this.router.navigate(['/entity-details'], { state: { entity: '' } });
    //       //this.snackbar.showSuccess('A new user is created');
    //     }
    //   });
    // } catch (e) {
    //   this.snackbar.showError('Some error occurred while fetching Laws');
    // }
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
