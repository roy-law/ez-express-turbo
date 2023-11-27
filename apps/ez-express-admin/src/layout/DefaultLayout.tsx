import React from "react";
import { Outlet } from "react-router-dom";
import { useUserContextLogger } from "../hooks/useUserContextLogger";
import { useProtectionNavigation } from "../hooks/useProtectionNavigation";
import { useAuth0 } from "@auth0/auth0-react";

export function DefaultLayout() {
  const { isAuthenticated, logout } = useAuth0();
  useUserContextLogger();
  useProtectionNavigation();

  return (
    <main className="flex flex-col h-screen w-screen p-10">
      <div className="flex items-center justify-between pb-10">
        <p className="text-lg font-bold">Admin Panel</p>
        {isAuthenticated && (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="text-center "
          >
            <p>Sign out</p>
          </button>
        )}
      </div>
      <Outlet />
    </main>
  );
}
