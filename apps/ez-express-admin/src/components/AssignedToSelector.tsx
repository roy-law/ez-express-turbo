import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "../utils/styles/classNames";
import { useQuery } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAllDrivers } from "../services/api/fetchAllDrivers";

interface Props {
  onSelected: ({ _id, username }: { _id: string; username: string }) => void;
  defaultDriver: string;
}

export const AssignedToSelector = ({ onSelected, defaultDriver }: Props) => {
  const [query, setQuery] = useState("");
  const { token } = useUserContext();

  const { data: driversData, isSuccess: isDriversDataSuccess } = useQuery(
    ["drivers", token?.token],
    () => fetchAllDrivers({ token: token?.token }),
    {
      enabled: !!token?.token,
    },
  );

  const [selectedPerson, setSelectedPerson] = useState({});

  useEffect(() => {
    if (isDriversDataSuccess) {
      const defaultPerson = driversData.find(
        (p: any) => p._id === defaultDriver,
      );
      if (defaultPerson) {
        setSelectedPerson(defaultPerson);
      }
    }
  }, [defaultDriver, driversData, isDriversDataSuccess]);

  const filteredPeople =
    query === ""
      ? driversData
      : driversData.filter((person: any) => {
          return person.username.toLowerCase().includes(query.toLowerCase());
        });

  const onSelectedPerson = (person: any) => {
    onSelected?.(person);
    setSelectedPerson(person);
  };

  return (
    <Combobox
      as="div"
      value={selectedPerson}
      onChange={onSelectedPerson}
      className="flex-1"
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Combobox.Label>
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

        {filteredPeople && filteredPeople.length > 0 && (
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
                        // selected && "font-semibold",
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
  );
};
