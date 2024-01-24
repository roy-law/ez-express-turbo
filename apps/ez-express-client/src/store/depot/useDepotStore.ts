import { create } from "zustand";
import { DepotState } from "./types";
import { log } from "../log";

const useDepotStore = create<DepotState>(
  log((set) => ({
    depotData: {
      country: "CA",
      province: "ON",
      city: "",
      streetAddress: "",
      unit: "",
      postalCode: "",
      phone: "",
      wechat: "",
      email: "",
      formattedAddress: "",
      _id: "",
    },

    actions: {
      setDepotData: (depotData) => set(() => ({ depotData })),
    },
  })),
);

export const useDepot = () => useDepotStore((state) => state.depotData);

export const useDepotActions = () => useDepotStore((state) => state.actions);
