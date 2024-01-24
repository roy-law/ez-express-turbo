import { create } from "zustand";
import { AccessToken, AuthState } from "./types";
import { log } from "../log";
import jwtDecode from "jwt-decode";

export const useAuthStore = create<AuthState>(
  log((set) => ({
    isAuthenticated: false,
    isEmailExist: false,
    token: "",

    actions: {
      setToken: (token) => set(() => ({ token })),
      setIsAuthenticated: (status) => set(() => ({ isAuthenticated: status })),
      setIsEmailExist: (status) => set(() => ({ isEmailExist: status })),
    },
  })),
);

export const useAccessToken = () => useAuthStore((state) => state.token);
export const useAuthPermissions = () =>
  useAuthStore((state) =>
    state.token ? (jwtDecode(state.token) as AccessToken)?.permissions : "",
  );
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsEmailExist = () =>
  useAuthStore((state) => state.isEmailExist);
export const useIsCustomer = () =>
  useAuthStore((state) => {
    const permissions = state.token
      ? (jwtDecode(state.token) as AccessToken)?.permissions
      : "";
    return permissions?.includes("customer");
  });
export const useAuthActions = () => useAuthStore((state) => state.actions);
