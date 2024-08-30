export interface ApplicableLaws {
  lawApplicability: number;
  komriskLaws: Law[];
  komriskCompliances: number[];
  applicability: string;
  komriskLawCategory: LawsCategory;
  entity: Law;
  operatingUnit: Law;
  applicableAt: string;
  komriskPqQuestions: any[];
}

export interface Law {
  id: number;
  name: string;
}

export interface LawsCategory {
  id: number;
  name: string;
  description: string;
}

export const applicableLawsItems: ApplicableLaws[] = [
  // {
  //   lawApplicability: 73,
  //   komriskLaws: [
  //     { id: 38, name: 'PAYMENT OF BONUS ACT, 1965' },
  //     { id: 39, name: 'PAYMENT OF BONUS RULES, 1975' },
  //   ],
  //   komriskCompliances: [99, 100],
  //   applicability: 'Definitely Applicable',
  //   komriskLawCategory: {
  //     id: 1,
  //     name: 'LAB',
  //     description: 'Labour',
  //   },
  //   entity: {
  //     id: 148,
  //     name: 'Entity 1',
  //   },
  //   operatingUnit: {
  //     id: 695,
  //     name: 'op1',
  //   },
  //   applicableAt: 'Operating Unit Level',
  //   komriskPqQuestions: [],
  // },
  // {
  //   lawApplicability: 164,
  //   komriskLaws: [
  //     { id: 27, name: 'EQUAL REMUNERATION ACT, 1976' },
  //     { id: 29, name: 'EQUAL REMUNERATION ACT, 2020' },
  //     { id: 28, name: 'EQUAL REMUNERATION RULES, 1976' },
  //   ],
  //   komriskCompliances: [99, 100],
  //   applicability: 'Definitely Applicable',
  //   komriskLawCategory: {
  //     id: 1,
  //     name: 'LAB',
  //     description: 'Labour',
  //   },
  //   entity: {
  //     id: 148,
  //     name: 'Entity 1',
  //   },
  //   operatingUnit: {
  //     id: 695,
  //     name: 'op1',
  //   },
  //   applicableAt: 'Operating Unit Level',
  //   komriskPqQuestions: [],
  // },
  // {
  //   lawApplicability: 169,
  //   komriskLaws: [
  //     { id: 27, name: 'EQUAL REMUNERATION ACT, 1976' },
  //     { id: 28, name: 'EQUAL REMUNERATION RULES, 1976' },
  //   ],
  //   komriskCompliances: [99, 100],
  //   applicability: 'Maybe Applicable',
  //   komriskLawCategory: {
  //     id: 1,
  //     name: 'LAB',
  //     description: 'Labour',
  //   },
  //   entity: {
  //     id: 148,
  //     name: 'Entity 1',
  //   },
  //   operatingUnit: {
  //     id: 695,
  //     name: 'op1',
  //   },
  //   applicableAt: 'Operating Unit Level',
  //   komriskPqQuestions: [],
  // },
];
