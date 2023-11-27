import { useQuery } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { AuthedRoutes } from "../types/routes";
import { fetchAllDrivers } from "../services/api/fetchAllDrivers";
import { BackToHeader } from "../components/BackToHeader";

export const DriverManagement = () => {
  const { token } = useUserContext();
  const navigate = useNavigate();
  const { data } = useQuery(
    ["drivers", token?.token],
    () => fetchAllDrivers({ token: token?.token }),
    {
      enabled: !!token?.token,
    },
  );

  return (
    <div>
      <BackToHeader />
      <br />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Drivers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the drivers in the system including their username,
            phone and email.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => navigate(AuthedRoutes.FORM_NEW_DRIVER)}
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Driver
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data &&
                  data.map((person: any) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.username}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="flex items-center justify-center whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          type="button"
                          className="text-red-600 hover:text-indigo-900"
                        >
                          Remove{" "}
                          <span className="sr-only">, {person.username}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
