import {
  ajax,
  etobicoke,
  markham,
  mississauga,
  newmarket,
  northYork,
  pickering,
  richmondHill,
  scarborough,
  stouffville,
  toronto,
  vaughan,
} from "./defaultPostalCodes";

export const getCityByPostalCode = (postalCode: string) => {
  const first3Code = postalCode.slice(0, 3);

  if (markham.includes(first3Code)) {
    return "Markham";
  } else if (scarborough.includes(first3Code)) {
    return "Scarborough";
  } else if (richmondHill.includes(first3Code)) {
    return "Richmond Hill";
  } else if (northYork.includes(first3Code)) {
    return "North York";
  } else if (vaughan.includes(first3Code)) {
    return "Vaughan";
  } else if (toronto.includes(first3Code)) {
    return "Toronto";
  } else if (newmarket.includes(first3Code)) {
    return "New Market";
  } else if (etobicoke.includes(first3Code)) {
    return "Etobicoke";
  } else if (mississauga.includes(first3Code)) {
    return "Mississauga";
  } else if (ajax.includes(first3Code)) {
    return "Ajax";
  } else if (pickering.includes(first3Code)) {
    return "Pickering";
  } else if (stouffville.includes(first3Code)) {
    return "Stouffville";
  } else {
    return "Unknown";
  }
};
