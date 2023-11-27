import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

interface Auth0ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Auth0ProviderProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || "";
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || "";
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL || "";

  if (!(domain && clientId && redirectUri)) {
    return <p>404</p>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://api.super-x.com",
        scope: "email profile admin",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
