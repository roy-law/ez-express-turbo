import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { useOptimoCsv } from "../hooks/useOptimoCsv";

export const Dashboard = () => {
  const navigate = useNavigate();
  const locations = useAdminDashboard();
  const { data, headers } = useOptimoCsv();

  return (
    <>
      <div className="pb-10 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-5">
        <button
          onClick={() => navigate(`/dashboard/parcels-planning`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delivery Schedule
        </button>
        <button
          onClick={() => navigate(`/dashboard/pickup`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Pickup Schedule
        </button>
        <button
          onClick={() => navigate(`/dashboard/driver-management`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Drivers Management
        </button>
        <button
          onClick={() => navigate(`/dashboard/exception-parcels`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Exception Parcels
        </button>
        <button
          onClick={() => navigate(`/dashboard/customer-invoice`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Customer Invoices
        </button>
        <button
          onClick={() => navigate(`/dashboard/parcel-management`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Parcel Management
        </button>
        <button
          onClick={() => navigate(`/dashboard/new-orders`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New Orders
        </button>
        <button
          onClick={() => navigate(`/dashboard/postal-code`)}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Postal Code
        </button>
        <CSVLink data={data} headers={headers}>
          Download OptimoRoute
        </CSVLink>
      </div>

      <div className="flex flex-col">
        <ul className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map(({ data: location }) => (
            <li
              key={location?.name}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div
                className={`${
                  !location?.pacakges ? "opacity-40" : ""
                } flex w-full flex-col items-start justify-between space-y-6 p-6`}
              >
                <div className="flex flex-row justify-between w-full">
                  <div className="flex-1 truncate">
                    <div className="flex space-x-3">
                      <h3 className="truncate text-3xl font-medium text-gray-900">
                        {location?.name}
                      </h3>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">{""}</p>
                  </div>
                  <div className="space-y-5 flex flex-col items-end">
                    <p className="text-3xl md:text-5xl flex flex-row">
                      {`${location?.totalDelivered}/${location?.total}`}
                      <span className="text-sm pl-3">pkgs</span>
                    </p>
                    <p className="text-3xl md:text-5xl flex flex-row ">
                      ${location?.totalAmount}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3 justify-between flex-row w-full">
                  <div className="flex flex-row space-x-2">
                    {!location?.drivers || location?.drivers.length <= 0 ? (
                      <span
                        key={"unassigned"}
                        className="inline-flex items-center rounded-md bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-700"
                      >
                        Unassigned
                      </span>
                    ) : (
                      location?.drivers.map((driver: any) => (
                        <span
                          key={driver}
                          className="inline-flex items-center rounded-md bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700"
                        >
                          {driver}
                        </span>
                      ))
                    )}
                  </div>
                  <button
                    type="button"
                    className="p-2   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => navigate(`/dashboard/${location?.areaName}`)}
                  >
                    <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
