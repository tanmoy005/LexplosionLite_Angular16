import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Industries } from 'src/app/shared/menu-items/fetch-entity-details-interface';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { IndustryActivies } from 'src/app/shared/menu-items/field-definition-interfaces';

@Component({
  selector: 'app-industry-dialog',
  templateUrl: './industry-dialog.component.html',
  styleUrls: ['./industry-dialog.component.scss'],
})
export class IndustryDialogComponent implements OnInit {
  encryptStorage = new EncryptStorage(environment.localStorageKey);
  constructor(@Inject(MAT_DIALOG_DATA) public data: number[]) {}
  savedIndustryList: IndustryActivies[];
  filteredNames: string[];
  ngOnInit(): void {
    const savedIndustries = this.encryptStorage.getItem('industryActivities');
    this.savedIndustryList = savedIndustries;
    this.filteredNames = this.getIndustryNames(this.data);
  }

  getIndustryNames(ids: number[]) {
    const result: string[] = [];
    const idSet = new Set(ids);

    this.savedIndustryList.forEach((item) => {
      if (idSet.has(item.iId) && !result.includes(item.industry)) {
        result.push(item.industry);
      }
    });

    return result;
  }
}
