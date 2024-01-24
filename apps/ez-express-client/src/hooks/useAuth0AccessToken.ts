import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthActions } from "../store/auth/useAuthStore";

export const useAuth0AccessToken = () => {
  const { setToken, setIsAuthenticated } = useAuthActions();
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const { data, isSuccess } = useQuery({
    queryKey: ["accessToken", user?.email, isAuthenticated],
    queryFn: () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: "https://api.super-x.com",
          scope: "email profile",
        },
      }),
    enabled: isAuthenticated && !!user?.email,
  });

  useEffect(() => {
    if (data && isSuccess) {
      setToken(data);
      setIsAuthenticated(isAuthenticated);
    }
  }, [data, isAuthenticated, isSuccess, setToken, setIsAuthenticated]);
};
