import { UserResponse } from "../../types";

export type UserState = {
  userData: UserResponse;
  actions: UserAction;
};

type UserAction = {
  setUserData: (data: UserState["userData"]) => void;
};
