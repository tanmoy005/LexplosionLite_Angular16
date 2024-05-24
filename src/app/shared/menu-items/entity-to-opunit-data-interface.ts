export interface EntityDataType{
    
        position: number,
        id: number,
        name: string,
        country: number,
        countryLabel: string,
        industry: number[],
        industryLabel: string,
        entityType: number,
        entityTypeLabel:string,
        emailID: string,
        laws: string,
        lawModules: number[],
        lawModulesLabel: string[],
        operatingUnit: OPUnitDetailsWithEntity[],
        actions: string,
        childrenID: number,
        entityList:entityList []
    
}



export interface OPUnitDetailsWithEntity{
    id: number,
    name: string,
    company: number,
    state: number,
    operatingUnitType: number,
    ownership: number,
    locatedAt: number,
    noOfDeMale: number,
    noOfDeFemale: number,
    noOfClMale: number,
    noOfClFemale: number,
    noOfIsmMale: number,
    noOfIsmFemale: number,
    noOfApprentice: number,
    noOfChild: number,
    additionalInfoJson: null,
    createdAt:string,
    updatedAt: string,
    entityOperatingUnit: {
        isHeadOffice: boolean,
        entityId: number,
        operatingUnitId: number
    }
}


export interface entityList{
    
        id: number,
        name: string
    
}