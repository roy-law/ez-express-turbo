import { useAuth0 } from "@auth0/auth0-react";
import { NavLogo } from "./NavLogo";

export function OnboardingNavBar() {
  const { logout } = useAuth0();

  return (
    <div className="flex justify-between px-6 lg:px-8 items-center pt-5">
      <NavLogo />
      <button className="text-sm hover:text-gray-700" onClick={() => logout()}>
        Sign out
      </button>
    </div>
  );
}
