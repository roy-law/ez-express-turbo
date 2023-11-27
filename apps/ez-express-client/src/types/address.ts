export interface Address {
  country: {
    alpha2: string;
    emoji: string;
    name: string;
    ioc: string;
  };
  province: {
    alpha: string;
    province: string;
    tax: number;
  };
  city: string;
  postalCode: string;
  streetAddress: string;
  unit: string;
  formattedAddress?: string;
}
