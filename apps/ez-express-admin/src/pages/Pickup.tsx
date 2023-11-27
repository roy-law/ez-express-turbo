import { useQuery } from "react-query";
import { BackToHeader } from "../components/BackToHeader";
import { useUserContext } from "../providers/UserContextProvider";
import { format } from "date-fns";
import { fetchAdminTodayParcels } from "../services/api";
import lodash from "lodash";

export const Pickup = () => {
  const { token } = useUserContext();
  const day = format(new Date(), "yyyy-MM-dd");

  const { data } = useQuery(
    [`all parcels`, day, token?.token],
    () =>
      fetchAdminTodayParcels({
        day,
        token: token?.token,
      }),
    {
      enabled: !!token?.token,
      select: (data) => {
        return Object.values(
          lodash.mapValues(
            lodash.groupBy(data, (parcel: any) => parcel.depotId._id),
            (clist) => ({
              id: clist[0].depotId._id,
              parcels: clist,
              totalOrders: clist.length,
              totalQuantity: lodash.sumBy(
                clist,
                (parcel: any) => parcel.parcelsCount,
              ),
              depot: {
                ...clist[0].depotId,
              },
              company: {
                ...clist[0].companyId,
              },
            }),
          ),
        );
      },
    },
  );
  return (
    <div className="h-3/5">
      <BackToHeader />
      <br />
      <div className="mt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Depots
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {`A list of all the depots deemed to pick up today.`}
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
                        Company name
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Address & Contacts
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Total orders
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Total quantity
                      </th>
                      {/* <th
                        scope="col"
                        className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Map
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Area
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Assigned To
                      </th> 
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data &&
                      data.map((depot: any, idx: number) => (
                        <tr key={depot.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {depot.company.companyName}
                          </td>

                          <td className="md:flex flex-col whitespace-nowrap hidden sm:table-cell  px-3 py-4 text-sm text-gray-500">
                            {depot.depot.formattedAddress}
                            <span className="pt-2">{depot.depot.phone}</span>
                          </td>

                          <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                            {depot.totalOrders}
                          </td>

                          <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                            {depot.totalQuantity}
                          </td>

                          {/* <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                            Go
                          </td>

                          <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                            SC
                          </td>

                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td> */}
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
  );
};
