import { Component, ViewChild, Inject } from '@angular/core';
import * as EntityInterfaces from 'src/app/shared/menu-items/entity-interfaces';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityTableComponent } from './entity-table.component';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { treeDataitem, TreeNode } from 'src/app/shared/menu-items/tree-items';
import { CountryList, CountryData } from 'src/app/shared/menu-items/country-list';

const initialFormData: EntityInterfaces.FormData = {
    name: '',
    country: '',
    countryLabel:'',
    entityType: '',
    entityTypeLabel:'',
    industry: '',
    industryLabel:'',
    lawModules: [],
    lawModulesLabel:[]
  };
  
  function transformEntityTypes(data: EntityInterfaces.OriginalType[]): EntityInterfaces.TransformedType[] {
    return data.map((item) => ({
      value: item.id,
      label: item.name,
      description: item.description
    }));
  }
  
  function transformLawCategories(data: EntityInterfaces.OriginalType[]): EntityInterfaces.TransformedType[] {
    return data.map((item) => ({
      value: item.id,
      label: item.description,
      description: item.description
    }));
  }
  
  function transformIndustryTypes(data: EntityInterfaces.OriginalIndustryType[]): EntityInterfaces.TransformedType[] {
    return data.map((item) => ({
      value: item.iId,
      label: item.industry,
      description: item.subIndustry
    }));
  }

  function getMaxIdFromChildren(node: TreeNode): number {
    const rootChildren = treeDataitem.children;
    let maxId = 0;
  
    if (rootChildren && rootChildren.length > 0) {
      maxId = Math.max(...rootChildren.map(child => child.id));
    }
    return maxId;
  }

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: 'add-new-entity-dialog.html',
    standalone: true,
    styleUrls: ['./entity-table.component.css'],
    imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, 
      MatSelectModule, CommonModule, DropdownComponent]
  })
  
  export class AddEntityDialog {
    industryTypesList: any;
    distinctIndutryTypesList: any;
    transformedEntityList: EntityInterfaces.TransformedType[] = [];
    transformedIndustryList: EntityInterfaces.TransformedType[] = [];
    transformedLawCategoryList:EntityInterfaces.TransformedType[]=[];
    countryList:CountryData[]=[];
  
    formData:any;
    formLabeledData:any;
    selectedCountry:any;
    selectedEntity:any;
    selectedIndustry:any;
    requiredFormDataFields = ['name','country','entityType', 'industry', 'lawModules']
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: { entityTable: EntityTableComponent}, 
    public dialogRef: MatDialogRef<AddEntityDialog>,
    private apiService:ApiService, private snackbar:SnackbarService){
    
    this.industryTypesList = this.data.entityTable.industryTypesList;
  
    this.transformedEntityList = transformEntityTypes(this.data.entityTable.entityTypesList);
    this.transformedLawCategoryList = transformLawCategories(this.data.entityTable.lawCategoriesList);
    const filteredCountryList = CountryList.filter(country => this.data.entityTable.countryList.includes(country.value));
    this.countryList = filteredCountryList;

    this.distinctIndutryTypesList = [];
    this.formData = initialFormData
    this.formLabeledData = initialFormData
  
    const seenIds = new Set();
    for (let industry of this.industryTypesList) {
      if (!seenIds.has(industry.iId)) {
        this.distinctIndutryTypesList.push(industry);
        seenIds.add(industry.iId);
      }
    }
    this.transformedIndustryList = transformIndustryTypes(this.distinctIndutryTypesList);
    }
  
    entityDataitem = treeDataitem;
  
    onSelectedValueChanged(value:any,field:string){
      this.formData[field]=value;
    }
  
    onTextFieldChange(event:any, field:string){
      this.formData[field]=event.target.value;
    }
  
    addEntity() {
      const maxId = getMaxIdFromChildren(treeDataitem);   
  
      let isAnyFieldBlank = false;
  
      console.log(this.formData)
  
      for (const field of this.requiredFormDataFields) {
        if (this.formData.hasOwnProperty(field)) {
          const fieldValue = this.formData[field as keyof FormData];
          if (field === "lawModules" && (fieldValue as string[]).length === 0) {
            isAnyFieldBlank = true;
            break;
          } else if (typeof fieldValue === 'string' && fieldValue === '') {
            isAnyFieldBlank = true;
            break;
          }
        }
      }
  
      if (isAnyFieldBlank) {
        this.snackbar.showError("Please enter all the field values.")
      }
  
      else {
        this.selectedCountry = this.countryList.find((country)=> country.value === this.formData.country);
        this.selectedEntity = this.transformedEntityList.find((entity)=> entity.value === this.formData.entityType);
        this.selectedIndustry= this.transformedIndustryList.find((industry)=> industry.value === this.formData.industry);
    
        this.formData.countryLabel = this.selectedCountry.label || "";
        this.formData.entityTypeLabel = this.selectedEntity.label || "";
        this.formData.industryLabel = this.selectedIndustry.label || "";

        for(const lawModule of this.formData.lawModules){
          var law = this.transformedLawCategoryList.find((law)=> law.value === lawModule);
          this.formData.lawModulesLabel.push(law?.label || "")
        }

        //this.formData.lawModulesLabel = this.formData.lawModules;
        this.data.entityTable.addEntityData(this.formData);
        const entity = {
          id: maxId + 1,
          label: 'Child Node ' + maxId,
        }
        treeDataitem?.children?.push(entity);
        this.snackbar.showSuccess("Successfully added Entity.");
        console.log("FORMDATA SUBMITTED", this.formData);
        this.dialogRef.close();
      }
    }
  
    closeEntityDialog() {
      this.dialogRef.close();
    }
  
  }