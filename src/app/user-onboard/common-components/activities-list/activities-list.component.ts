import { Component, Input, OnInit, OnChanges, SimpleChanges,Output,EventEmitter  } from '@angular/core';
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
export class ActivitiesListComponent implements OnInit, OnChanges {

  encryptStorage = new EncryptStorage(environment.localStorageKey);

  @Input() selectedActivitiesList: number[] = [];
  @Output() selectedActivitiesListChange = new EventEmitter<number[]>();


  activities: Section[] = [];

  ngOnInit(): void {
    this.updateActivitiesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedActivitiesList']) {
      this.updateActivitiesList();
    }
  }

  private updateActivitiesList() {
    const savedindustryActivities: IndustryActivies[] | undefined = this.encryptStorage.getItem('industryActivities');
    

    if (savedindustryActivities) {
      const filteredArray = savedindustryActivities
        .filter((item: IndustryActivies) => this.selectedActivitiesList.includes(item.aId))
        .map((item: IndustryActivies) => ({ label: item.activity, value: item.aId }));

      this.activities = filteredArray;
      
    } else {
      
    }
  }

  panelOpenState = false;

 
  removeActivity(event: any, activity: Section) {
    const selectedActivityIndex = this.activities.indexOf(activity);
    if (selectedActivityIndex !== -1) {
      this.activities.splice(selectedActivityIndex, 1);

     
      this.selectedActivitiesList = this.selectedActivitiesList.filter(aId => aId !== activity.value);
      this.selectedActivitiesListChange.emit(this.selectedActivitiesList);
    }
  }
}
