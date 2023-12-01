import { Fragment, useMemo, useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils/styles/classNames";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLogo } from "../components/NavLogo";
import { AuthedRoutes, UnAuthedRoutes } from "../types/routes";
import { useAuth0AccessToken } from "../hooks/useAuth0AccessToken";
import { useUserApi } from "../hooks/useUserApi";
import { useEmailExistApi } from "../hooks/useEmailExistApi";
import { useDepotApi } from "../hooks/useDepotApi";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth0();

  useAuth0AccessToken();
  useUserApi();
  useEmailExistApi();
  useDepotApi();

  // Use name for the map key to prevent errors
  const navigation = useMemo(
    () => [
      {
        href: AuthedRoutes.DASHBOARD,
        isActive: location.pathname === AuthedRoutes.DASHBOARD,
        name: "Dashboard",
      },
      {
        href: AuthedRoutes.ORDER_HISTORY,
        isActive: location.pathname === AuthedRoutes.ORDER_HISTORY,
        name: "Order History",
      },
    ],
    [location.pathname],
  );

  const profileMenu = useMemo(
    () => [
      {
        href: AuthedRoutes.PROFILE,
        name: "Your profile",
      },
      {
        href: UnAuthedRoutes.PRIVACY_POLICY,
        name: "Privacy Policy",
      },
      {
        href: UnAuthedRoutes.TERMS_AND_CONDITIONS,
        name: "Terms and Conditions",
      },
      {
        onClick: () => {
          logout({ logoutParams: { returnTo: window.location.origin } });
        },
        name: "Sign out",
      },
    ],
    [logout],
  );

  return (
    <>
      <div className="min-h-full bg-gray-50">
        <Disclosure as="nav" className="bg-white shadow">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 justify-between">
                  <div className="flex">
                    <div className="-ml-2 mr-2 flex items-center md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-shrink-0 items-center mr-7">
                      <NavLogo />
                    </div>
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                      {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                      {navigation.map((path) => (
                        <a
                          href={path.href}
                          key={path.name}
                          className={
                            path.isActive
                              ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                              : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-900"
                          }
                        >
                          {path.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => navigate("/parcel/form-new")}
                      >
                        <PlusIcon
                          className="-ml-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        New Parcel
                      </button>
                    </div>
                    <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {profileMenu.map((menu) => (
                              <Menu.Item key={menu.name}>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700",
                                    )}
                                    href={menu.href}
                                    onClick={menu.onClick}
                                  >
                                    {menu.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                  {navigation.map((path) => (
                    <Disclosure.Button
                      as="a"
                      href={path.href}
                      key={path.name}
                      className={
                        path.isActive
                          ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
                          : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                      }
                    >
                      {path.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="mt-3 space-y-1">
                    {profileMenu.map((menu) => (
                      <Disclosure.Button
                        key={menu.name}
                        as="a"
                        href={menu.href}
                        onClick={menu.onClick}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                      >
                        {menu.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
