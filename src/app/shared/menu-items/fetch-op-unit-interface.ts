import { CountryAPIData } from './country-list';
export interface FetchOPUnits {
  id: number;
  name: string;
  company: Company;
  state: States;
  operatingUnitType: {
    id: number;
    name: string;
    description: null;
  };
  ownership: {
    id: number;
    name: string;
    description: string;
  };
  locatedAt: {
    id: number;
    name: string;
    description: string;
  };
  noOfDeMale: number;
  noOfDeFemale: number;
  noOfClMale: number;
  noOfClFemale: number;
  noOfIsmMale: number;
  noOfIsmFemale: number;
  noOfApprentice: number;
  noOfChild: number;
  additionalInfoJson: null;
  createdAt: string;
  updatedAt: string;
  version: number;
  entities: EntitiesList[];
  activities: Activities[];
  isHeadOffice: boolean;
  countryId: number;
}

export interface Company {
  id: number;
  name: string;
  description: string;
  companyId: null;
  companyUrl: null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface States {
  id: number;
  name: string;
  code: string;
}

export interface EntitiesList {
  id: number;
  name: string;
  company: number;
  entityType: number;
  createdAt: string;
  updatedAt: string;
  version: number;
  entityOperatingUnit: {
    isHeadOffice: boolean;
    entityId: number;
    operatingUnitId: number;
  };
}

export interface Activities {
  id: number;
  name: string;
  description: null;
  subIndustry: string;
  operatingUnitActivity: {
    activityId: number;
    operatingUnitId: number;
  };
}
