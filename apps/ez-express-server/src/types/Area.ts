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
  stouffville,
} from "./PostalCode";

export enum ServicingAreaName {
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

export const ServcingAreaToPostalCodeMap = {
  [ServicingAreaName.Scarborough]: scarborough,
  [ServicingAreaName.Markham]: markham,
  [ServicingAreaName.NorthYork]: northYork,
  [ServicingAreaName.EastYork]: eastYork,
  [ServicingAreaName.NewMarket]: newmarket,
  [ServicingAreaName.Mississauga]: mississauga,
  [ServicingAreaName.RichmondHill]: richmondHill,
  [ServicingAreaName.Vaughan]: vaughan,
  [ServicingAreaName.Toronto]: toronto,
  [ServicingAreaName.Etobicoke]: etobicoke,
  [ServicingAreaName.Ajax]: ajax,
  [ServicingAreaName.Pickering]: pickering,
  [ServicingAreaName.Stouffville]: stouffville,
};
