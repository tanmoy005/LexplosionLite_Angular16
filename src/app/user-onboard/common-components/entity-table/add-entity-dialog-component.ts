import { Component, Inject, OnInit } from '@angular/core';
import * as EntityInterfaces from 'src/app/shared/menu-items/entity-interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityTableComponent } from './entity-table.component';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TreeNode } from 'src/app/shared/menu-items/tree-items';
import {
  CountryList,
  CountryData,
} from 'src/app/shared/menu-items/country-list';
import { IndustryActivies } from 'src/app/shared/menu-items/field-definition-interfaces';

function transformEntityTypes(
  data: EntityInterfaces.OriginalType[]
): EntityInterfaces.TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
    description: item.description,
  }));
}

function transformLawCategories(
  data: EntityInterfaces.OriginalType[]
): EntityInterfaces.TransformedType[] {
  return data.map((item) => ({
    value: item.id,
    label: item.description,
    description: item.description,
  }));
}

function transformIndustryTypes(
  data: EntityInterfaces.OriginalIndustryType[]
): EntityInterfaces.TransformedType[] {
  return data.map((item) => ({
    value: item.iId,
    label: item.industry,
    description: item.subIndustry,
  }));
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'add-new-entity-dialog.html',

  styleUrls: ['./entity-table.component.scss'],
})
export class AddEntityDialog implements OnInit {
  industryTypesList: IndustryActivies[];

  distinctIndutryTypesList: EntityInterfaces.OriginalIndustryType[];
  transformedEntityList: EntityInterfaces.TransformedType[] = [];
  transformedIndustryList: EntityInterfaces.TransformedType[] = [];
  transformedLawCategoryList: EntityInterfaces.TransformedType[] = [];
  countryList: CountryData[] = [];

  formData: EntityInterfaces.FormData;

  selectedCountry: CountryData | undefined;
  selectedEntity: EntityInterfaces.TransformedType | undefined;
  selectedIndustry: EntityInterfaces.TransformedType[];
  requiredFormDataFields = [
    'name',
    'country',
    'entityType',
    'industry',
    'lawModules',
  ];
  dialogHeaderTitle: string = 'Add New Entity';
  dialogSaveUpdateButtonName: string = 'Add';
  operatingUnit: [] = [];
  dialogHeaderImage: string = 'assets/images/Business.png';
  entityChild: TreeNode;
  entitySaveTitle: string = 'Entity Successfully added!';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      entityTable: EntityTableComponent;
      entity: EntityInterfaces.BusinessDetails | null;
    },
    public dialogRef: MatDialogRef<AddEntityDialog>,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.initializeFormData();

    this.industryTypesList = this.data.entityTable.industryTypesList;
    this.transformedEntityList = transformEntityTypes(
      this.data.entityTable.entityTypesList
    );
    this.transformedLawCategoryList = transformLawCategories(
      this.data.entityTable.lawCategoriesList
    );
    let filteredCountryList = this.data.entityTable.countryList;
    this.countryList = filteredCountryList.map(
      (country: { id: any; name: any }) => ({
        value: country.id,
        label: country.name,
        icon: undefined,
      })
    );
    // let filteredCountryList = CountryList;

    // try {
    //   filteredCountryList = CountryList.filter((country) =>
    //     this.data.entityTable.countryList.includes(country.value)
    //   );
    // } catch (error) {}

    // this.countryList = filteredCountryList;
    this.distinctIndutryTypesList = [];

    const seenIds = new Set();
    for (let industry of this.industryTypesList) {
      if (!seenIds.has(industry.iId)) {
        this.distinctIndutryTypesList.push(industry);
        seenIds.add(industry.iId);
      }
    }

    this.transformedIndustryList = transformIndustryTypes(
      this.distinctIndutryTypesList
    );
  }

  initializeFormData() {
    if (this.data.entity !== null) {
      console.log('the entity to edit', this.data.entity);
      this.formData = {
        id: this.data.entity.id,
        name: this.data.entity.name,
        country: this.data.entity.country,
        countryLabel: '',
        entityType: this.data.entity.entityType,
        entityTypeLabel: '',
        industry: this.data.entity.industry,
        industryLabel: '',
        lawModules: this.data.entity.lawModules,
        lawModulesLabel: [],
        operatingUnit: [],
        childrenID: 0,
      };

      this.dialogSaveUpdateButtonName = 'Update';
      this.dialogHeaderTitle = 'Update Entity Details';
      this.entitySaveTitle = 'Entity Successfully Updated';
    } else {
      this.formData = {
        id: null,
        name: '',
        country: [1],
        countryLabel: '',
        entityType: 0,
        entityTypeLabel: '',
        industry: [],
        industryLabel: '',
        lawModules: [],
        lawModulesLabel: [],
        operatingUnit: [],
        childrenID: 0,
      };
    }
  }

  onSelectedValueChanged(
    value: number | number[],
    field: keyof EntityInterfaces.FormData
  ) {
    if (field in this.formData) {
      (this.formData[field] as number | number[]) = value;
    }
  }
  selectedCountryList: any = [1];

  onCountryValueChange(value: any) {
    console.log('the cuntry value change called');
    console.log('the country selected', value);
    this.selectedCountryList = value;
    console.log('the selected countries', this.selectedCountryList);
  }

  onTextFieldChange(event: any, field: keyof EntityInterfaces.FormData) {
    if (field in this.formData) {
      (this.formData[field] as string) = event.target.value;
    }
  }

  addEntity() {
    let isAnyFieldBlank = false;
    for (const field of this.requiredFormDataFields) {
      if (this.formData.hasOwnProperty(field)) {
        const fieldValue =
          this.formData[field as keyof EntityInterfaces.FormData];
        console.log('the field values', this.formData);
        if (
          (field === 'lawModules' || field === 'industry') &&
          (fieldValue as number[]).length === 0
        ) {
          isAnyFieldBlank = true;
          break;
        } else if (typeof fieldValue === 'string' && fieldValue === '') {
          isAnyFieldBlank = true;
          break;
        }
      }
    }

    if (isAnyFieldBlank) {
      this.snackbar.showError('Please enter all the field values.');
    } else {
      // this.selectedCountry = this.countryList.find(
      //   (country) => country.value === this.formData.country
      // );
      // this.selectedCountryList = this.formData.country;
      this.formData.country = this.selectedCountryList;
      console.log('country', this.selectedCountryList);
      this.selectedEntity = this.transformedEntityList.find(
        (entity) => entity.value === this.formData.entityType
      );
      this.selectedIndustry = this.transformedIndustryList.filter((industry) =>
        this.formData.industry.includes(industry.value)
      );

      this.formData.countryLabel = this.selectedCountry?.label || '';
      this.formData.entityTypeLabel = this.selectedEntity?.label || '';
      this.formData.industryLabel = this.selectedIndustry
        .map((industry) => industry.label)
        .join(', ');
      this.formData.operatingUnit = ['1'];

      for (const lawModule of this.formData.lawModules) {
        const law = this.transformedLawCategoryList.find(
          (law) => law.value === lawModule
        );
        if (law) {
          this.formData.lawModulesLabel.push(law.label);
        }
      }

      this.formData.childrenID = 0;
      this.data.entityTable.addEntityData(this.formData, this.entitySaveTitle);
      console.log('the form data of entity', this.formData);
      this.dialogRef.close();
    }
  }

  closeEntityDialog() {
    this.dialogRef.close();
  }
}
