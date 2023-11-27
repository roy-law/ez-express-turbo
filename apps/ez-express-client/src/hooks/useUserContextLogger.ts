import { useEffect } from "react";
import { useUserContext } from "../providers/UserContextProvider";

export const useUserContextLogger = () => {
  const { token, user, depot } = useUserContext();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log({ user, token, depot });
    }
  }, [token, user, depot]);
};
