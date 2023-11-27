import { useEffect } from "react";
import { useUserContext } from "../providers/UserContextProvider";

export const useUserContextLogger = () => {
  const { token } = useUserContext();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log({ token });
    }
  }, [token]);
};
