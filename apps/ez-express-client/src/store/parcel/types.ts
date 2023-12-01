import { ParcelResponse } from "../../types";

export type ParcelsState = {
  parcelsData: {
    [day: string]: ParcelResponse[];
  };
};

export type ParcelsAction = {
  setParcelsData: (data: ParcelsState["parcelsData"]) => void;
};
