// import { EntityTableComponent } from './common-components/entity-table/entity-table.component';
// import { ApiService } from '../services/api.service';
// import { environment } from 'dotenv';
// import { EncryptStorage } from 'encrypt-storage';
// import { Injectable } from '@angular/core';

// export interface DialogData {
//   action: string;
//   entityTable: EntityTableComponent;
// }

// @Injectable({
//   providedIn: 'root', // This makes the service available app-wide
// })
// export class operatingUnitFetchDefinitions {
//   fieldPayload = [
//     'entityTypes',
//     'industryActivities',
//     'states',
//     'operatingUnitTypes',
//     'komriskLawCategories',
//     'countries',
//   ];
//   constructor(private apiService: ApiService) {}

//   fetchEntityOPUnitDefinitions() {
//     this.apiService
//       .getFieldDefinition(this.fieldPayload)
//       .subscribe((response) => {
//         const encryptStorage = new EncryptStorage(environment.localStorageKey);
//         encryptStorage.setItem('entityTypes', response.data.entityTypes);
//         encryptStorage.setItem(
//           'industryActivities',
//           response.data.industryActivities
//         );
//         encryptStorage.setItem('states', response.data.states);
//         encryptStorage.setItem(
//           'operatingUnitTypes',
//           response.data.operatingUnitTypes
//         );
//         encryptStorage.setItem(
//           'komriskLawCategories',
//           response.data.komriskLawCategories
//         );
//         encryptStorage.setItem('countries', response.data.countries);
//       });
//   }
// }

import { EntityTableComponent } from './common-components/entity-table/entity-table.component';
import { ApiService } from '../services/api.service';
import { environment } from 'dotenv';
import { EncryptStorage } from 'encrypt-storage';
import { Injectable } from '@angular/core';

export interface DialogData {
  action: string;
  entityTable: EntityTableComponent;
}

@Injectable({
  providedIn: 'root', // This makes the service available app-wide
})
export class operatingUnitFetchDefinitions {
  fieldPayload = [
    'entityTypes',
    'industryActivities',
    'states',
    'operatingUnitTypes',
    'komriskLawCategories',
    'countries',
  ];
  constructor(private apiService: ApiService) {}

  fetchEntityOPUnitDefinitions(callback: () => void) {
    this.apiService.getFieldDefinition(this.fieldPayload).subscribe({
      next: (response) => {
        const encryptStorage = new EncryptStorage(environment.localStorageKey);
        encryptStorage.setItem('entityTypes', response.data.entityTypes);
        encryptStorage.setItem(
          'industryActivities',
          response.data.industryActivities
        );
        encryptStorage.setItem('states', response.data.states);
        encryptStorage.setItem(
          'operatingUnitTypes',
          response.data.operatingUnitTypes
        );
        encryptStorage.setItem(
          'komriskLawCategories',
          response.data.komriskLawCategories
        );
        encryptStorage.setItem('countries', response.data.countries);

        // Execute the callback function after successful operation
        callback();
      },
      error: () => {
        //this.snackbar.showError('Failed to fetch entity definitions.');
        console.log('the error');
      },
    });
  }
}
