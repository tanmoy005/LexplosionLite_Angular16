import { Component, Input,OnInit } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { IndustryActivies } from 'src/app/shared/menu-items/field-definition-interfaces';

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

  @Input() selectedActivitiesList:number[]

  ngOnInit(): void {
    const savedindustryActivities:IndustryActivies[]| undefined  = this.encryptStorage.getItem('industryActivities');
    console.log('saved activities list',savedindustryActivities)

    if (savedindustryActivities) {
      console.log('saved activities list', savedindustryActivities);

      const filteredArray = savedindustryActivities
        .filter((item: IndustryActivies) => this.selectedActivitiesList.includes(item.aId))
        .map((item: IndustryActivies) => ({ label: item.activity, value: item.aId }));

      this.activities = filteredArray;

     // console.log('filtered activities list', this.activities);
    } else {
      //console.log('No saved activities found in storage');
    }

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
