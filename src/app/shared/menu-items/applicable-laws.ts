export interface ApplicableLaws {
    data: {
        lawApplicability: number;
        komriskLaws: { id: number; name: string }[];
        komriskCompliances: number[];
        applicability: string;
    }[];
}

export const applicableLawsItems: ApplicableLaws = {
    data: [
        {
            lawApplicability: 73,
            komriskLaws: [
                { id: 38, name: 'PAYMENT OF BONUS ACT, 1965' },
                { id: 39, name: 'PAYMENT OF BONUS RULES, 1975' }
            ],
            komriskCompliances: [99, 100],
            applicability: 'Definitely Applicable',
        },
        {
            lawApplicability: 164,
            komriskLaws: [
                { id: 27, name: 'EQUAL REMUNERATION ACT, 1976' },
                { id: 28, name: 'EQUAL REMUNERATION RULES, 1976' }
            ],
            komriskCompliances: [99, 100],
            applicability: 'Definitely Applicable',
        },
    ]
};
