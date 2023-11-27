export const generateTrackingNumber = (): string => {
  const prefix = "EZ";
  const randomSuffix = Math.floor(new Date().getTime());

  return [prefix, randomSuffix].join("").toUpperCase();
};
