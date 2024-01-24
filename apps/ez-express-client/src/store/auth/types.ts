export type AuthState = {
  isAuthenticated: boolean;
  isEmailExist: boolean;
  token: string;
  actions: AuthAction;
};

export type AuthAction = {
  setIsAuthenticated: (status: AuthState["isAuthenticated"]) => void;
  setIsEmailExist: (status: AuthState["isEmailExist"]) => void;
  setToken: (token: AuthState["token"]) => void;
};

export type AccessToken = {
  aud?: string[];
  exp?: Date;
  azp?: string;
  iat?: Date;
  iss: string;
  permissions?: string[];
  scope?: string;
  sub?: "";
  token: string;
};
