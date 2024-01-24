import { DepotResponse } from "../../types";

export type DepotState = {
  depotData: DepotResponse;
  actions: DepotAction;
};

export type DepotAction = {
  setDepotData: (data: DepotState["depotData"]) => void;
};
