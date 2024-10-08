export interface CountryData {
  value: any;
  label: string;
  icon?: string;
  code?: string;
}

// export interface CountryAPIData {
//   id: number;
//   name: string;
//   code: string;
// }
export interface CountryAPIData {
  id: number;
  name: string;
  code?: string;
}

export const CountryAPIDemoData: CountryAPIData[] = [
  {
    id: 1,
    name: 'India',
    code: 'IN',
  },
  {
    id: 2,
    name: 'Singapore',
    code: 'SG',
  },
  {
    id: 3,
    name: 'United States',
    code: 'US',
  },
];

const indiaFlagIcon = './assets/images/indian_flag.webp';
const singaporeIcon = './assets/images/singapore_flag.png';
const usIcon = './assets/images/us_flag.png';

var tempCountryList: CountryData[] = [];

CountryAPIDemoData.forEach((country) => {
  tempCountryList.push({
    value: country.id,
    label: country.name,
    icon:
      country.name === 'India'
        ? indiaFlagIcon
        : country.name === 'Singapore'
        ? singaporeIcon
        : country.name === 'United States'
        ? usIcon
        : '',
    code: country.code,
  });
});

export const CountryList: CountryData[] = tempCountryList;

export const CountryListForPhoneNumberSection: CountryData[] = [
  {
    value: 1,
    label: '+91',
    icon: './assets/images/indian_flag.webp',
    code: 'IN',
  },
  {
    value: 2,
    label: '+65',
    icon: './assets/images/singapore_flag.png',
    code: '',
  },

  {
    value: 3,
    label: '+1',
    icon: './assets/images/us_flag.png',
    code: '',
  },
];
