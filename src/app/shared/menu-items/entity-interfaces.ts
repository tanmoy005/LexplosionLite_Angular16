
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

export interface BusinessDetails {
  position: number;
  name: string;
  country: string;
  countryLabel: string,
  industry: string;
  industryLabel:string;
  entityType: string;
  entityTypeLabel: string;
  emailID: string;
  laws: string;
  lawModules: string[],
  lawModulesLabel:string[],
  operatingUnit: string[];
  actions: string,
  childrenID: number;
}


  export interface FormData {
    name: string;
    country: string;
    countryLabel: string;
    entityType: string;
    entityTypeLabel: string;
    industry: string;
    industryLabel: string;
    lawModules: string[];
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


export const EntityData:BusinessDetails[] =  [
  {
    "position": 1,
    "name": "Test Entity 1",
    "country": "1",
    "countryLabel": "India",
    "industry": "3",
    "industryLabel": "Manufacturing",
    "entityType": "1",
    "entityTypeLabel": "Company",
    "emailID": "",
    "laws": "",
    "lawModules": [
      "1",
      "2"
    ],
    "lawModulesLabel": [
      "Labour",
      "Operational"
    ],
    "operatingUnit": [],
    "actions": "",
    "childrenID":0
  },
  {
    "position": 2,
    "name": "Test Entity 2",
    "country": "1",
    "countryLabel": "India",
    "industry": "3",
    "industryLabel": "Manufacturing",
    "entityType": "1",
    "entityTypeLabel": "Company",
    "emailID": "",
    "laws": "",
    "lawModules": [
      "1",
      "2"
    ],
    "lawModulesLabel": [
      "Labour",
      "Operational"
    ],
    "operatingUnit": ['1','2'],
    "actions": "",
    "childrenID":1
  }
]