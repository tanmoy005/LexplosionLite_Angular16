import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OperatingUnitTableComponent } from '../operating-unit-table.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OriginalType } from 'src/app/shared/menu-items/original-drop-down-menu-items';

import { TransformedType } from 'src/app/shared/menu-items/transfered-dropdown-menu-items';

import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { ApiService } from 'src/app/services/api.service';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { EmployeeCardInterface } from 'src/app/shared/menu-items/employee-card-data-interface';
import { OPUnitDetailsWithEntity } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { FetchOPUnits } from 'src/app/shared/menu-items/fetch-op-unit-interface';
import { opUnitAddResponse } from 'src/app/shared/menu-items/opUnitAddResponse';
import {
  StateInterface,
  StateListInterface,
} from 'src/app/shared/menu-items/state-list';

function transformOperatingUnitTypes(data: OriginalType[]): TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    description: item?.description ?? '',
  }));
}

function transformStates(
  data: StateInterface[] | null | undefined
): TransformedType1[] {
  if (!data) {
    return [];
  }

  return data.map((item) => ({
    value: item.id,
    label: item.name,
  }));
}

export interface TransformedType1 {
  value: number;
  label: string;
}

export interface TransformedRadioGroup {
  value: number;
  label: string;
  isChecked: boolean;
}

export interface Workforce {
  header: string;
  male: number;
  female: number;
}

function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //return encryptStorage.getItem('company-id');
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}

@Component({
  selector: 'app-add-new-operating-unit-dialog',
  templateUrl: './add-new-operating-unit-dialog.component.html',
  styleUrls: ['./add-new-operating-unit-dialog.component.scss'],
})
export class AddNewOperatingUnitDialogComponent implements OnInit {
  encryptStorage = new EncryptStorage(environment.localStorageKey);
  BusinessOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  dialogHeaderTitle: string = 'Add New Operating Unit';
  dialogHeaderImage: string = 'assets/images/Business.png';
  color: string = '#fff';

  transformedDataOperatingUnits: TransformedType[] = [];
  transformedStates: TransformedType1[] = [];

  operatingUnitName: string = '';
  operatingUnitType: number;
  state: number;
  activity: string = '';
  locatedAt: string = '';
  ownership: number;
  employeeData: EmployeeCardInterface[];
  editingEmployeeData: EmployeeCardInterface[] = [
    {
      header: 'Direct',
      male: 0,
      female: 0,
    },
    {
      header: 'Contract Labours',
      male: 0,
      female: 0,
    },
    {
      header: 'Inter-State Migrants',
      male: 0,
      female: 0,
    },
  ];
  editingnoOfApprentice: number = 0;
  editingnoOfChild: number = 0;
  zone: number;

  editOpUnitDataDetails: FetchOPUnits;
  noOfDeMale: number = 0;
  noOfDeFemale: number = 0;
  noOfClMale: number = 0;
  noOfClFemale: number = 0;
  noOfIsmMale: number = 0;
  noOfIsmFemale: number = 0;
  noOfApprentice: number = 0;
  noOfChild: number = 0;

  ownershipDropdown: TransformedRadioGroup[] = [
    { label: 'Owned', value: 1, isChecked: false },
    { label: 'Leased', value: 2, isChecked: false },
  ];

  zoneDropdown: TransformedRadioGroup[] = [
    { label: 'SEZ', value: 2, isChecked: false },
    { label: 'STPI', value: 1, isChecked: false },
    { label: 'Not Applicable', value: 3, isChecked: false },
  ];
  entityList: TransformedType[] = [];
  industryActivityList: {
    iId: number;
    industry: string;
    subIndustry: string;
    aId: string;
    activity: string;
  }[] = [];
  filteredActivitiesList: { value: string; label: string }[] = [];
  selectedActivitiesList: number[] = [];
  selectedEntities: number[] = [this.data.entity.id];
  opUnitSaveResponse: opUnitAddResponse;
  buttonName: string = 'Add';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      entityName: string;
      industry: string;
      entityTable: OperatingUnitTableComponent;
      operatingUnitTypes: OriginalType[];
      states: StateListInterface;
      entityPosition: number;
      entity: EntityDataType;
      opUnitPosition: number;
      selectedOP: FetchOPUnits;
      countryIdList: number[];
    },
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddNewOperatingUnitDialogComponent>,
    private apiService: ApiService
  ) {
    this.transformedDataOperatingUnits = transformOperatingUnitTypes(
      this.data.operatingUnitTypes
    );
    this.transformedStates = transformStates(this.data.states.states);

    this.entityList = transformOperatingUnitTypes(this.data.entity.entityList);

    const savedindustryActivities =
      this.encryptStorage.getItem('industryActivities');
    this.industryActivityList = savedindustryActivities;
    this.filteredActivitiesList = this.getActivitiesByIndustryId(
      this.data.entity.industry[0]
    );
  }

  countryForCompany: any = [];
  apiCountryList: any = [];
  countryForCompanyIdList: any = [];
  countryList: any = [];

  fetchCountriesForOpunit() {
    const savedCountries = this.encryptStorage.getItem('countries');
    this.apiCountryList = savedCountries;
    const countryforOP = this.data.countryIdList;

    const matchingCountries = this.apiCountryList.filter((country: any) =>
      countryforOP.includes(country.id)
    );

    console.log('the matching countries', matchingCountries);
    this.countryList = matchingCountries.map(
      (country: { id: any; name: any }) => ({
        value: country.id,
        label: country.name,
        icon: undefined,
      })
    );
  }

  ngOnInit(): void {
    this.fetchCountriesForOpunit();
    if (this.data.opUnitPosition !== 0) {
      console.log('the opunit to edit', this.data.selectedOP);
      this.operatingUnitName = this.data.selectedOP.name;
      this.operatingUnitType = this.data.selectedOP.operatingUnitType.id;
      this.ownership = this.data.selectedOP.ownership.id;

      const ownershipSelectedIndex = this.ownershipDropdown.findIndex(
        (ownership) => ownership.value === this.ownership
      );
      this.ownershipDropdown[ownershipSelectedIndex].isChecked = true;

      const zoneSelectedIndex = this.zoneDropdown.findIndex(
        (zone) => zone.value === this.data.selectedOP.locatedAt.id
      );
      this.zoneDropdown[zoneSelectedIndex].isChecked = true;

      this.state = this.data.selectedOP.state.id;
      this.selectedActivitiesList = this.data.selectedOP.activities.map(
        (item) => item.id
      );

      this.noOfApprentice = this.data.selectedOP.noOfApprentice;
      this.noOfChild = this.data.selectedOP.noOfChild;
      this.noOfDeMale = this.data.selectedOP.noOfDeMale;
      this.noOfDeFemale = this.data.selectedOP.noOfDeFemale;
      this.noOfClMale = this.data.selectedOP.noOfClMale;
      this.noOfClFemale = this.data.selectedOP.noOfClFemale;
      this.noOfIsmMale = this.data.selectedOP.noOfIsmMale;
      this.noOfIsmFemale = this.data.selectedOP.noOfIsmFemale;
      this.zone = this.data.selectedOP.locatedAt.id;
      this.editingEmployeeData = [
        { header: 'Direct', male: this.noOfDeMale, female: this.noOfDeFemale },
        {
          header: 'Contract Labours',
          male: this.noOfClMale,
          female: this.noOfClFemale,
        },
        {
          header: 'Inter-State Migrants',
          male: this.noOfIsmMale,
          female: this.noOfIsmFemale,
        },
      ];
      this.editingnoOfApprentice = this.noOfApprentice;
      this.editingnoOfChild = this.noOfChild;
      this.buttonName = 'Update';
    }
  }

  async addOpUnit() {
    try {
      await this.addNewOpUnit();
      this.data.entityTable.fetchOpUnitList();
      this.data.entityTable.fetchLawsList();
      this.dialogRef.close();
    } catch (error) {}
  }

  findOperatingUnitTypeName(id: number): string {
    const operatingUnitType = this.data.operatingUnitTypes.find(
      (type) => type.id === id
    );
    return operatingUnitType ? operatingUnitType.name : '';
  }

  findZoneName(id: number): string {
    const zoneType = this.zoneDropdown.find((type) => type.value === id);
    return zoneType ? zoneType.label : '';
  }
  findOwnerShipName(id: number): string {
    const ownerShipType = this.ownershipDropdown.find(
      (type) => type.value === id
    );
    return ownerShipType ? ownerShipType.label : '';
  }

  onSelectedValueChanged(value: any, columnvalue: String) {
    if (columnvalue === 'operatingUnitType') {
      this.operatingUnitType = value;
    }
    if (columnvalue === 'states') {
      this.state = value;
      console.log('the state value', value);
    }
    if (columnvalue === 'activity') {
      this.selectedActivitiesList = value;
    }

    if (columnvalue === 'entityList') {
      this.selectedEntities = value;
    }
  }

  employeeCountData(value: EmployeeCardInterface[]) {
    this.employeeData = value;

    this.extractValues(this.employeeData);
  }

  apprenticesData(value: number) {
    this.noOfApprentice = value;
  }

  childLabourData(value: number) {
    this.noOfChild = value;
  }

  CloseDialog() {
    this.dialogRef.close();
  }

  onOwnershipSelectionChange(event: any): void {
    this.ownership = event.value;
  }

  onZoneSelectionChange(event: any): void {
    this.zone = event.value;
  }

  getActivitiesByIndustryId(iId: number) {
    return this.industryActivityList
      .filter((item) => item.iId === iId)
      .map((item) => ({ value: item.aId, label: item.activity }));
  }

  extractValues(data: Workforce[]): void {
    data.forEach((item) => {
      switch (item.header) {
        case 'Direct':
          this.noOfDeMale = item.male;
          this.noOfDeFemale = item.female;
          break;
        case 'Contract Labours':
          this.noOfClMale = item.male;
          this.noOfClFemale = item.female;
          break;
        case 'Inter-State Migrants':
          this.noOfIsmMale = item.male;
          this.noOfIsmFemale = item.female;
          break;
        default:
          break;
      }
    });
  }

  addNewOpUnit(): Promise<void> {
    return new Promise((resolve, reject) => {
      const id =
        this.data.opUnitPosition === 0 ? null : this.data.opUnitPosition;
      const payload = {
        id: id,
        name: this.operatingUnitName,
        //company: [406],
        company: getCompanyId(),
        countryId: 1,
        entities: this.selectedEntities,
        operatingUnitType: this.operatingUnitType,
        // state: 36,
        state: this.state,
        stateSearch: null,
        activities: this.selectedActivitiesList,
        activitySearch: null,
        locatedAt: this.zone,
        ownership: this.ownership,
        noOfDeMale: this.noOfDeMale,
        noOfDeFemale: this.noOfDeFemale,
        noOfClMale: this.noOfClMale,
        noOfClFemale: this.noOfClFemale,
        noOfIsmMale: this.noOfIsmMale,
        noOfIsmFemale: this.noOfIsmFemale,
        noOfApprentice: this.noOfApprentice,
        noOfChild: this.noOfChild,
      };

      this.apiService.postCreateOperatingUnit(payload).subscribe({
        next: (response) => {
          this.opUnitSaveResponse = response.data;
          const msg = id
            ? 'Operating Unit successfully updated.'
            : 'Operating Unit successfully added.';
          this.snackbar.showSuccess(msg);
          resolve();
        },
        error: (error) => {
          this.snackbar.showError(
            'Some error occurred while adding Operating Unit. Please check if all the field values are entered and try again.'
          );
          reject(error);
        },
      });
    });
  }

  getOpUnitDetailsForEdit(id: number): OPUnitDetailsWithEntity {
    const opUnit = this.data.entity.operatingUnit.find(
      (item) => item.id === id
    );
    if (!opUnit) {
      throw new Error(`Operating unit with id ${id} not found`);
    }
    return opUnit;
  }
  onSelectedActivitiesListChange(updatedList: number[]) {
    this.selectedActivitiesList = updatedList;
  }
}
