import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { classNames } from "../utils/styles/classNames";
import { Notification } from "./Notification";
import { format } from "date-fns";

const Months = {
  January: "00",
  February: "01",
  March: "02",
  April: "03",
  May: "04",
  June: "05",
  July: "06",
  August: "07",
  September: "08",
  Octorber: "09",
  November: "10",
  December: "11",
};

type MonthType = keyof typeof Months;

export const MonthlyInvoiceSelect = ({ depotId }: { depotId: string }) => {
  const currentMonth = format(new Date(), "MMMM");
  const [show, setShow] = useState("");
  const [selected, setSelected] = useState<MonthType>(
    currentMonth as MonthType,
  );

  return (
    <div className="flex flex-row space-x-5 justify-center items-center">
      <Notification show={!!show} onClose={() => setShow("")} message={show} />
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="">
              <Listbox.Button className="flex flex-row justify-between w-36 cursor-default rounded-md bg-white py-2 px-3 space-x-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                <span className="block truncate">{selected}</span>
                {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"> */}
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400 z-10"
                  aria-hidden="true"
                />
                {/* </span> */}
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 max-w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {Object.keys(Months).map((month: string, idx: number) => (
                    <Listbox.Option
                      key={month + idx}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "flex flex-row justify-between cursor-default select-none px-2 py-1.5 space-x-2",
                        )
                      }
                      value={month}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate",
                            )}
                          >
                            {month}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "inset-y-0 right-0 flex items-center",
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : (
                            <span className="py-4 px-2" />
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <button
        type="button"
        onClick={() =>
          window.open(`/monthly-invoice/${depotId}/${Months[selected]}`)
        }
        className="rounded-md bg-indigo-600 disabled:bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <p className="text-sm">Print Invoice</p>
      </button>
    </div>
  );
};
