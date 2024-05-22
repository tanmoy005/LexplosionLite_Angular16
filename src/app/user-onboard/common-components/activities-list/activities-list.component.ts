import { Component } from '@angular/core';

export interface Section {
  label: string;
  value: number;
}

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent {
  
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
