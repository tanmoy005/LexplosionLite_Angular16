import { OpUnitDetails } from 'src/app/shared/menu-items/fetch-entity-details-interface';
import { entityList } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';

export interface BusinessDetails {
  id: number;
  name: string;
  // country: number;
  country: number[];
  countryLabel: string;
  industry: number[];
  industryLabel: string;
  entityType: number;
  entityTypeLabel: string;
  laws: string;
  lawModules: number[];
  lawModulesLabel: string[];
  operatingUnit: OpUnitDetails[];
  actions: string;
  childrenID: number;
  entityList: entityList[];
}

export interface FormData {
  id: number | null;
  name: string;
  // country: number;
  country: number[];
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

export const EntityColumns = [
  'id',
  'name',
  'country',
  'industry',
  'entityType',
  'laws',
  'operatingUnit',
  'actions',
];

export interface entityCreationNullStatus {
  isEntityHasNullOPUnit: boolean;
  entityOPUnitNUllMessage: string;
}
