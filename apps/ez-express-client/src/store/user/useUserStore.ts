import { GetState, SetState, StoreApi, create } from "zustand";
import { UserAction, UserState } from "./types";

// Define a type for the log function's configuration
type ConfigFn<T extends object> = (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => T;

// Define the log function with the correct types
const log =
  <T extends object>(config: ConfigFn<T>) =>
  (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) =>
    config(
      (...args) => {
        console.groupCollapsed(`Zustand - ${Object.keys(args[0] || {})[0] || "Unknown state change"}`);
        console.log("==> Applying new state", args);
        set(...args);
        console.log("==> New State", get());
        console.groupEnd();
      },
      get,
      api,
    );


export const useUserStore = create<UserState & UserAction>(log((set) => ({
  userData: {
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    isEmailVerified: false,
    isTermsChecked: false,
    locale: "en",
    status: 0,
  },
  setUserData: (userData) => set(() => ({ userData })),

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
  setDepotData: (depotData) => set(() => ({ depotData })),

  isAuthenticated: false,
  setIsAuthenticated: (status) => set(() => ({ isAuthenticated: status })),

  isEmailExist: false,
  setIsEmailExist: (status) => set(() => ({ isEmailExist: status })),

  token: "",
  setToken: (token) => set(() => ({token})),

})));

