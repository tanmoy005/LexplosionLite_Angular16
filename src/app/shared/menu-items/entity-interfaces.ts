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
  actions: string
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
 