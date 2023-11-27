import { useState } from "react";
import { classNames } from "../utils/styles/classNames";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { useQuery } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAllDrivers } from "../services/api/fetchAllDrivers";
import { BackToHeader } from "../components/BackToHeader";

const defaultTabs = [
  {
    name: "Delivery Schedule",
    current: true,
  },
  { name: "Pick up Schedule", current: false },
];

const people = [
  { id: 1, name: "Leslie Alexander" },
  // More users...
];

export const DriverScheduleManagement = () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const { token } = useUserContext();

  const { data: driversData = [] } = useQuery(
    ["drivers", token?.token],
    () => fetchAllDrivers({ token: token?.token }),
    {
      enabled: !!token?.token,
    },
  );

  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople =
    query === ""
      ? driversData
      : driversData.filter((person: any) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <BackToHeader />
      <br />
      <div className="flex items-center justify-center flex-col">
        <div className="w-3/5">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue={tabs.find((tab: any) => tab.current)?.name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav
              className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
              aria-label="Tabs"
            >
              {tabs.map((tab, tabIdx) => (
                <button
                  onClick={() => {
                    const newTabs = tabs.map((t) =>
                      t.name === tab.name
                        ? { ...t, current: true }
                        : { ...t, current: false },
                    );

                    setTabs(newTabs);
                  }}
                  key={tab.name}
                  type="button"
                  className={classNames(
                    tab.current
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700",
                    tabIdx === 0 ? "rounded-l-lg" : "",
                    tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                    "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      tab.current ? "bg-indigo-500" : "bg-transparent",
                      "absolute inset-x-0 bottom-0 h-0.5",
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/** Driver Selector */}
        <Combobox
          as="div"
          className="mt-10"
          value={selectedPerson}
          onChange={setSelectedPerson}
        >
          <div className="relative mt-2">
            <Combobox.Input
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(person: any) => person?.username}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredPeople.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.map((person: any) => (
                  <Combobox.Option
                    key={person._id}
                    value={person}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={classNames(
                            "block truncate",
                            selected ? "font-semibold" : "",
                          )}
                        >
                          {person.username}
                        </span>

                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-indigo-600",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>

        {/** Driver's Parcels Table */}
        <div className="mt-10 w-full">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Parcels
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                {`A list of all the parcels in area including their index,
              tracking number, phone and status.`}
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Ref#
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tracking#
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Address & Contacts
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Map
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Order
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {[] &&
                        [].map((parcel: any, idx: number) => (
                          <tr key={parcel._id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {parcel.name}
                              <span className="text-sm font-normal text-gray-500">
                                {" for "}
                              </span>
                              {parcel.companyId.companyName}
                            </td>
                            <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                              {parcel.customerRef}
                            </td>
                            <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                              <a
                                href={`${
                                  import.meta.env.VITE_TRACKING_BASE_URL
                                }/tracking/${parcel.trackingNumber}`}
                                className="font-medium text-indigo-600 underline"
                                target={"_blank"}
                                rel="noreferrer"
                              >
                                {parcel.trackingNumber}
                              </a>
                            </td>
                            <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                              {parcel.parcelsCount}
                            </td>
                            <td className="md:flex flex-col whitespace-nowrap hidden sm:table-cell  px-3 py-4 text-sm text-gray-500">
                              {parcel.formattedAddress}
                              <span className="pt-2">{parcel.phone}</span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                                  parcel.formattedAddress,
                                )}`}
                                className="font-medium text-indigo-600 underline"
                                target={"_blank"}
                                rel="noreferrer"
                              >
                                Go
                              </a>
                              {/* {parcel.deliveryPerson} */}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {parcel.deliveryOrder}
                            </td>

                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              {/* <ParcelStatusSelect
                              currentStatus={parcel.status}
                              parcelId={parcel._id}
                              queryKey={[config.queryKey, token?.token]}
                            /> */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
