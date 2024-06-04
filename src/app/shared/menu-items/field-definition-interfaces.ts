export interface EntityTypes {
  id: number;
  name: string;
  description: string;
  subType: string;
  isParent: boolean;
  parent: null;
}

export interface IndustryActivies {
  iId: number;
  industry: string;
  subIndustry: string;
  aId: number;
  activity: string;
}

export interface komriskLawCategories {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface OperatingUnitTypes {
  id: number;
  name: number;
  description: null;
}

export interface States {
  id: number;
  name: string;
  code: string;
}
