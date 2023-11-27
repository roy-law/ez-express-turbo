export const ProvinceOntario = {
  alpha: "ON",
  sgc: 35,
  province: "Ontario",
  tax: 0.13,
};

export interface IAddress {
  country: {
    alpha2: string;
    alpha3: string;
    countryCallingCodes: string[];
    currencies: string[];
    emoji: string;
    ioc: string;
    name: string;
    languages: string[];
    status: string;
  };
  province: typeof ProvinceOntario;
  city: string;
  postalCode: string;
  streetAddress: string;
  unit: string;
}
