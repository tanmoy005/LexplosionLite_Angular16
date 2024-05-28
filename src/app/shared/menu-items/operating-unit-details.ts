// export interface OPUnitDetails {
//     position: number;
//     name: string;
//     entity:string;
//     ownership:string;
//     type: string;
//     location:string;
//     zone:string;
//     employees:string;
//     activities:string;
//     laws: string;  
//     actions:string;
//     entityPosition:number
//   }


// export interface OPUnitDetails {
//   position: number;
//   name: string;
//   entity:string;
//   ownership:string;
//   type: string;
//   location:string;
//   zone:string;
//   employees:string;
//   activities:string;
//   laws: string;  
//   actions:string;
//   entityPosition:number
// }


export interface OPUnitDetails {
  opID: number;
  count:number;
  name: string;
  entity:number[];
  entityNames:string[];
  ownershipID: number,
  ownership:string;
  type: string;
  location:string;
  locationId:number;

  zone:string;
  employees:string;
  // activities:string;
  activities:number[];
  laws: string;  
  actions:string;
  entityPosition:number;
  totalEmployeeCount:number;
  opUnitPosition: number
}