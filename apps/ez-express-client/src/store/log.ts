import { GetState, SetState, StoreApi, create } from "zustand";

// Define a type for the log function's configuration
type ConfigFn<T extends object> = (
  set: SetState<T>,
  get: GetState<T>,
  api: StoreApi<T>,
) => T;

// Define the log function with the correct types
export const log =
  <T extends object>(config: ConfigFn<T>) =>
  (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) =>
    config(
      (...args) => {
        console.groupCollapsed(
          `Zustand - ${Object.keys(args[0] || {})[0] || "Unknown state change"}`,
        );
        console.log("==> Applying new state", args);
        set(...args);
        console.log("==> New State", get());
        console.groupEnd();
      },
      get,
      api,
    );
