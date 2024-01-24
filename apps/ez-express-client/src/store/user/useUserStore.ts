import { create } from "zustand";
import { UserState } from "./types";
import { log } from "../log";

export const useUserStore = create<UserState>(
  log((set) => ({
    userData: {
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      isEmailVerified: false,
      isTermsChecked: false,
      locale: "en",
      status: 0,
      phoneNumber: "",
      companyName: "",
      hstNumber: "",
      picture: "",
    },

    actions: {
      setUserData: (userData) => set(() => ({ userData })),
    },
  })),
);

export const useUser = () => useUserStore((state) => state.userData);
export const useIsUserApproved = (isUserApproved: boolean) =>
  useUserStore(
    (state) =>
      state.userData.status === 3 &&
      state.userData.isTermsChecked &&
      isUserApproved,
  );
export const useUserActions = () => useUserStore((state) => state.actions);
