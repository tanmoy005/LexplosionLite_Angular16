export interface CountryData {
  value: any;
  label: string;
  icon?: string;
}

export const CountryList: CountryData[] = [
  {
    value: 1,
    label: '+91',
    icon: './assets/images/indian_flag.webp',
  },
  {
    value: 2,
    label: '+65',
    icon: './assets/images/singapore_flag.png',
  },
];
