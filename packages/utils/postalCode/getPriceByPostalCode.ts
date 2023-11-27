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

export function getPriceByPostalCode(postalCode: string): number {
  const first3Code = postalCode.slice(0, 3);

  // Scarborough
  if ([...markham, ...scarborough, ...richmondHill].includes(first3Code)) {
    return 7;
  } else if ([...northYork, ...vaughan, ...toronto].includes(first3Code)) {
    return 8;
  } else if ([...newmarket, ...etobicoke].includes(first3Code)) {
    return 10;
  } else if ([...mississauga, ...ajax, ...pickering, ...stouffville].includes(first3Code)) {
    return 12;
  } else {
    return 0;
  }
}
