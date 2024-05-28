// import { entityList } from './entity-to-opunit-data-interface';

// export interface BusinessDetails {
//     position: number;
//     name: string;
//     country: string;
//     countryLabel: string,
//     industry: string;
//     industryLabel:string;
//     entityType: string;
//     entityTypeLabel: string;
//     emailID: string;
//     laws: string;
//     lawModules: string[],
//     lawModulesLabel:string[],
//     operatingUnit: string;
//     actions: string
//   }

import { OpUnitDetails } from 'src/app/shared/menu-items/fetch-entity-details-interface';
import {entityList} from 'src/app/shared/menu-items/entity-to-opunit-data-interface';

export interface BusinessDetails {
  position: number;
  id:number;
  name: string;
  country: number;
  countryLabel: string,
  industry: number[];
  industryLabel:string;
  entityType: number;
  entityTypeLabel: string;
  emailID: string;
  laws: string;
  lawModules: number[],
  lawModulesLabel:string[],
  // operatingUnit: string[];
  operatingUnit: OpUnitDetails[];
  actions: string,
  childrenID: number;
  entityList:entityList[]
}


  export interface FormData {
    id:number | null;
    name: string;
    country: number;
    countryLabel: string;
    entityType: number;
    entityTypeLabel: string;
    industry: number[];
    industryLabel: string;
    lawModules: number[];
    lawModulesLabel: string[];
    operatingUnit: string[];
    childrenID: number;
  }

  export interface OriginalType {
    id: number;
    name: string;
    description: string;
  }
  
  export interface OriginalIndustryType {
    iId: number;
    industry: string;
    subIndustry: string | null;
  }
  
  export interface TransformedType {
    value: number;
    label: string;
    description: string | null;
  }


export const EntityColumns = ['position', 'name', 'country', 'industry', 'entityType', 'emailID', 'laws', 'operatingUnit', 'actions'];


// export const EntityData:BusinessDetails[] =  [
//   {
//     "position": 1,
//     "id":1,
//     "name": "Test Entity 1",
//     "country": 1,
//     "countryLabel": "India",
//     "industry": [3],
//     "industryLabel": "Manufacturing",
//     "entityType": 1,
//     "entityTypeLabel": "Company",
//     "emailID": "",
//     "laws": "",
//     "lawModules": [
//       1,2
//     ],
//     "lawModulesLabel": [
//       "Labour",
//       "Operational"
//     ],
//     "operatingUnit": [],
//     "actions": "",
//     "childrenID":0
//   },
//   {
//     "position": 2,
//     "id":2,
//     "name": "Test Entity 2",
//     "country": 1,
//     "countryLabel": "India",
//     "industry": [3],
//     "industryLabel": "Manufacturing",
//     "entityType": 1,
//     "entityTypeLabel": "Company",
//     "emailID": "",
//     "laws": "",
//     "lawModules": [
//       1,2
//     ],
//     "lawModulesLabel": [
//       "Labour",
//       "Operational"
//     ],
//     "operatingUnit": ['1','2'],
//     "actions": "",
//     "childrenID":1
//   }
// ]