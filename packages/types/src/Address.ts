import { GeocodeResult } from "@googlemaps/google-maps-services-js";
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

export const Country = {
  Canada: {
    alpha2: "CA",
    alpha3: "CAN",
    countryCallingCodes: ["+1"],
    currencies: ["CAD"],
    emoji: "🇨🇦",
    ioc: "CAN",
    name: "Canada",
    languages: ["en", "fr"],
    status: "assigned",
  },
};

export type Country = (typeof Country)[keyof typeof Country];

export const Province = {
  Alberta: {
    alpha: "AB",
    sgc: 48,
    province: "Alberta",
    tax: 0.05,
  },
  BritishColumbia: {
    alpha: "BC",
    sgc: 59,
    province: "British Columbia",
    tax: 0.07,
  },
  Manitoba: {
    alpha: "MB",
    sgc: 46,
    province: "Manitoba",
    tax: 0.05,
  },
  NewBrunswick: {
    alpha: "NB",
    sgc: 13,
    province: "New Brunswick",
    tax: 0.15,
  },
  NewfoundlandAndLabrador: {
    alpha: "NL",
    sgc: 10,
    province: "Newfoundland and Labrador",
    tax: 0.15,
  },
  NovaScotia: {
    alpha: "NS",
    sgc: 12,
    province: "Nova Scotia",
    tax: 0.15,
  },
  Ontario: ProvinceOntario,
  PrinceEdwardIsland: {
    alpha: "PE",
    sgc: 11,
    province: "Prince Edward Island",
    tax: 0.15,
  },
  Quebec: {
    alpha: "QC",
    sgc: 24,
    province: "Quebec",
    tax: 0.09975,
  },
  Saskatchewan: {
    alpha: "SK",
    sgc: 47,
    province: "Saskatchewan",
    tax: 0.06,
  },
};
export type Province = (typeof Province)[keyof typeof Province];

export type Address = {
  country: Country;
  province: Province;
  city: string;
  postalCode: string;
  streetAddress: string;
  unit?: string;
  formattedAddress?: string;
  geo?: GeocodeResult;
};
