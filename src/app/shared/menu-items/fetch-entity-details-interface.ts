export interface FetchEntityDetails {
    id: number,
    name: string,
    company:CompanyInterface,
    entityType: EntityTypesDetails,
    createdAt:string,
    updatedAt:string,
    version: number,
    operatingUnits: OpUnitDetails[],
    industries: Industries[],
    komriskLawCategories:LawCategories []
}


export interface CompanyInterface {
    id: number,
    name: string,
    description: string,
    companyId: string,
    companyUrl:string,
    createdAt: string,
    updatedAt:string,
    version: number
}

export interface EntityTypesDetails{
    id: number,
    name: string,
    description: string,
    subType: string,
    isParent: boolean,
    parent: number
}


export interface LawCategories {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    entityKomriskLawCategory: {
        version: number,
        entityId: number
        komriskLawCategoryId: number
    }
}


export interface Industries {
    id: number,
    name:string,
    description: null,
    entityIndustry: {
        industryId:number,
        entityId: number
    }
}


export interface OpUnitDetails {
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