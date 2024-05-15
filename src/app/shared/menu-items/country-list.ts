export interface CountryData {
    id: number;
    countryName: string;
    image: string;
  }
  
export const CountryList : CountryData[] =[
    {
      id:1,
      countryName:'India',
      image:'./assets/images/indian_flag.webp'
    },
    {
      id:2,
      countryName:'Singapore',
      image:'./assets/images/singapore_flag.png'
    }
   
  ]