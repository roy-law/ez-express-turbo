import {
  ajax,
  eastYork,
  etobicoke,
  markham,
  mississauga,
  newmarket,
  northYork,
  pickering,
  richmondHill,
  scarborough,
  toronto,
  vaughan,
  stouffville
} from "@repo/utils";
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
export enum AreaName {
  Scarborough = "scarborough",
  Toronto = "toronto",
  NorthYork = "northyork",
  Etobicoke = "etobicoke",
  EastYork = "eastyork",
  Markham = "markham",
  RichmondHill = "richmondhill",
  Vaughan = "vaughan",
  NewMarket = "newmarket",
  Mississauga = "mississauga",
  Ajax = "ajax",
  Pickering = "pickering",
  Stouffville = "stouffville",
}

export const AreaConfigMap = {
  [AreaName.Scarborough]: {
    postalCode: scarborough.join(","),
    queryKey: "scarborough parcels",
    name: "Scarborough",
    areaName: AreaName.Scarborough,
  },
  [AreaName.Toronto]: {
    postalCode: toronto.join(","),
    queryKey: "toronto parcels",
    name: "Toronto",
    areaName: AreaName.Toronto,
  },
  [AreaName.NorthYork]: {
    postalCode: northYork.join(","),
    queryKey: "north york parcels",
    name: "North York",
    areaName: AreaName.NorthYork,
  },
  [AreaName.Etobicoke]: {
    postalCode: etobicoke.join(","),
    queryKey: "etobicoke parcels",
    name: "Etobicoke",
    areaName: AreaName.Etobicoke,
  },
  [AreaName.EastYork]: {
    postalCode: eastYork.join(","),
    queryKey: "east york parcels",
    name: "East York",
    areaName: AreaName.EastYork,
  },
  [AreaName.Markham]: {
    postalCode: markham.join(","),
    queryKey: "markham parcels",
    name: "Markham",
    areaName: AreaName.Markham,
  },
  [AreaName.RichmondHill]: {
    postalCode: richmondHill.join(","),
    queryKey: "richmond hill parcels",
    name: "Richmond Hill",
    areaName: AreaName.RichmondHill,
  },
  [AreaName.Vaughan]: {
    postalCode: vaughan.join(","),
    queryKey: "vaughan parcels",
    name: "Vaughan",
    areaName: AreaName.Vaughan,
  },
  [AreaName.NewMarket]: {
    postalCode: newmarket.join(","),
    queryKey: "new market parcels",
    name: "New Market",
    areaName: AreaName.NewMarket,
  },
  [AreaName.Mississauga]: {
    postalCode: mississauga.join(","),
    queryKey: "mississauga parcels",
    name: "Mississauga",
    areaName: AreaName.Mississauga,
  },
  [AreaName.Ajax]: {
    postalCode: ajax.join(","),
    queryKey: "ajax parcels",
    name: "Ajax",
    areaName: AreaName.Ajax,
  },
  [AreaName.Pickering]: {
    postalCode: pickering.join(","),
    queryKey: "pickering parcels",
    name: "Pickering",
    areaName: AreaName.Pickering,
  },
  [AreaName.Stouffville]: {
    postalCode: stouffville.join(","),
    queryKey: "stouffville parcels",
    name: "Stouffville",
    areaName: AreaName.Stouffville,
  },
};
