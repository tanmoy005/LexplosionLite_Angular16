import { Component, Input,OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

export interface Section {
  label: string;
  value: number;
}

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {

  encryptStorage = new EncryptStorage(environment.localStorageKey);

  @Input() selectedActivitiesList:[]

  ngOnInit(): void {
    const savedindustryActivities = this.encryptStorage.getItem('industryActivities');
   
  }
  activities: Section[] = [
    {
      label:'Activity1',
      value:1
    },
    {
      label:'Activity2',
      value:2
    },
    {
      label:'Activity3',
      value:3
    },
    {
      label:'Activity4',
      value:4
    }
  ];

  panelOpenState = false;

  removeActivity(event:any,activity:Section){
    // console.log("Clicked activity- ", activity);
    const selectedActivityIndex = this.activities.indexOf(activity)
    if (selectedActivityIndex !== -1) {
      this.activities.splice(selectedActivityIndex, 1);
    }
  }

}
