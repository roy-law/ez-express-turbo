import { useQuery } from "react-query";
import { BackToHeader } from "../components/BackToHeader";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAllDepots } from "../services/api";
import { MonthlyInvoiceSelect } from "../components/MonthlyInvoiceSelect";

export const CustomerInvoice = () => {
  const { token } = useUserContext();
  const { data } = useQuery(
    ["all depots", token?.token],
    () => fetchAllDepots({ token: token?.token }),
    {
      enabled: !!token?.token,
    },
  );

  return (
    <div>
      <BackToHeader />
      <br />
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Depots
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {`A list of all the depots including the name, address and contacts.`}
            </p>
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
                      Company name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Address & Contacts
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data &&
                    data.map((depot: any) => (
                      <tr key={depot.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {depot.company.companyName}
                        </td>
                        <td className="md:flex flex-col whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {depot.formattedAddress}
                          <span className="pt-2">{depot.phone}</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {depot.email}
                        </td>
                        <td className="flex items-center justify-center whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <MonthlyInvoiceSelect depotId={depot._id} />
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
  );
};
