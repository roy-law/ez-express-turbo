import { useAuth0 } from "@auth0/auth0-react";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkIsEmailExist } from "../services/api/checkIsEmailExist";
import { fetchDepot } from "../services/api/fetchDepot";
import { fetchUser } from "../services/api/fetchUser";
import { useAuth0AccessToken } from "../hooks/useAuth0AccessToken";
import { createUser } from "../services/api";
import { Company, DepotResponse, User } from "../types";

interface AccessToken {
  aud?: string[];
  exp?: Date;
  azp?: string;
  iat?: Date;
  iss: string;
  permissions?: string[];
  scope?: string;
  sub?: "";
  token: string;
}

interface UserContextType {
  user?: User &
    Company & { status: 0 | 1 | 2 | 3; _id: string; isTermsChecked: boolean };
  depot?: DepotResponse;
  token?: AccessToken;
  isUserLoading: boolean;
  isDepotLoading: boolean;
  isValidCustomer: boolean;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  depot: undefined,
  token: undefined,
  isUserLoading: false,
  isDepotLoading: false,
  isValidCustomer: false,
  refetchUser: () => null,
});

interface UserContextProviderProps {
  children: ReactElement;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const auth0 = useAuth0();
  const auth0AccessToken = useAuth0AccessToken();
  const queryClient = useQueryClient();
  const { token }: AccessToken = auth0AccessToken;
  const count = useRef(2);

  const {
    data: isEmailExists,
    isSuccess: isEmailExistsSuccess,
    isLoading: isEmailExistsLoading,
  } = useQuery({
    queryKey: ["email exists", token],
    queryFn: () => checkIsEmailExist(token),
    enabled: !!token,
    initialData: queryClient.getQueryData(["email exists", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["email exists", token])?.dataUpdatedAt,
  });

  const {
    data: userData,
    isSuccess: isUserSuccess,
    isLoading: isUserDataLoading,
    isPending,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
    enabled: !!token,
    initialData: queryClient.getQueryData(["user", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["user", token])?.dataUpdatedAt,
  });

  const { data: depotData, isLoading: isDepotDataLoading } = useQuery({
    queryKey: ["depot", token],
    queryFn: () => fetchDepot(token),
    enabled: !!token && isUserSuccess,
    initialData: queryClient.getQueryData(["depot", token]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["depot", token])?.dataUpdatedAt,
  });

  const { mutate, isPending: isCreateUserLoading } = useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      queryClient.setQueryData(["user", token], data);
      queryClient.setQueryData(["email exists", token], true);
    },
  });

  useEffect(() => {
    //** Criteria */
    // - Don't have email in User db
    // - Authenticated
    // - Not during the progress of creating the user
    if (
      !isEmailExists &&
      isEmailExistsSuccess &&
      !userData &&
      auth0.isAuthenticated &&
      !isCreateUserLoading &&
      !!auth0.user
    ) {
      const { user } = auth0;
      mutate({
        firstName: user?.given_name || "",
        lastName: user?.family_name || "",
        picture: user?.picture || "",
        isEmailVerified: user?.email_verified,
        locale: user?.locale || "en",
        email: user?.email || "",
        name: user?.name || "",
        token,
      });
    }
  }, [
    isEmailExists,
    isEmailExistsSuccess,
    userData,
    isCreateUserLoading,
    mutate,
    auth0,
    token,
  ]);

  return (
    <UserContext.Provider
      value={{
        token: auth0AccessToken,
        refetchUser,
        user: userData,
        depot: depotData,
        isUserLoading:
          isCreateUserLoading ||
          isEmailExistsLoading ||
          isUserDataLoading ||
          auth0.isLoading ||
          (isPending && auth0.isAuthenticated),
        isDepotLoading: isDepotDataLoading,
        isValidCustomer:
          !!auth0AccessToken?.permissions?.includes("customer") &&
          !!userData?.isTermsChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
