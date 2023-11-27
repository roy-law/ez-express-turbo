import { useMemo } from "react";
import { PackageSize } from "../types";
import { getPriceByPostalCode } from "@repo/utils";

export const defaultPackageOptions = (
  postalCode: string,
  size: PackageSize,
) => {
  const price = getPriceByPostalCode(postalCode);
  const totalPrice = {
    [PackageSize.Standard]: price,
    [PackageSize.Exceptional]: price * 2,
  }[size];
  return {
    price: totalPrice ? `$${totalPrice ?? "??"}.00 + tax` : "Calculating..",
    priceValue: totalPrice,
  };
};

const PackageSizeToOption = {
  [PackageSize.Standard]: {
    id: PackageSize.Standard,
    title: "Standard",
    description: "50 x 50 x 50 cm; 2kg",
  },
  [PackageSize.Exceptional]: {
    id: PackageSize.Exceptional,
    title: "Exceptional",
    description: "e.g. 50 x 60 x 50cm; 2kg",
  },
};

export const getPackageOptionByPostalCode = (
  postalCode: string,
  size: PackageSize,
) => {
  return {
    ...PackageSizeToOption[size],
    ...defaultPackageOptions(postalCode, size),
  };
};

export const usePackageSizeOptions = (postalCode: string) => {
  const packageSizeOptions = useMemo(() => {
    return [
      getPackageOptionByPostalCode(postalCode, PackageSize.Standard),
      getPackageOptionByPostalCode(postalCode, PackageSize.Exceptional),
    ];
  }, [postalCode]);

  return packageSizeOptions;
};
