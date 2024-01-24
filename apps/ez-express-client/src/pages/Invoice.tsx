import { add, format, sub } from "date-fns";
import { useParams } from "react-router-dom";
import { useOrderHistoryApi } from "../hooks/api";

import { formatCurrency } from "./OrderHistory";
import { BackToHeader } from "../components/BackToHeader";
import { useUser } from "../store/user/useUserStore";
import { useDepot } from "../store/depot/useDepotStore";

export const Invoice = () => {
  const { day } = useParams();
  const to = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
  const from = format(sub(new Date(to), { days: 30 }), "yyyy-MM-dd");
  const { data } = useOrderHistoryApi({ from, to });
  const order = !data
    ? { totalAmount: 0, day: "", parcels: [] }
    : data?.find((i) => i.day === day);
  const user = useUser();
  const depot = useDepot();

  const subtotal = (Number(order?.totalAmount) / 1.13).toFixed(2);
  const subtotalTax = ((Number(order?.totalAmount) / 1.13) * 0.13).toFixed(2);

  if (!user?.companyName || !depot?.formattedAddress) {
    return null;
  }

  return (
    <div>
      <BackToHeader />
      <main className="flex-1 flex justify-center py-10 -mt-10">
        <div className="flex flex-col px-4 sm:px-6 lg:px-8 bg-white a4 p-16">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Invoice
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                For deliveries completed from {`${order?.day}`} to{" "}
                {`${order?.day}`}
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
          </div>
          <div className="-mx-4 mt-8 flow-root sm:mx-0 flex-1">
            <div>
              <p className="text-sm">{user?.companyName}</p>
              <p className="text-sm">{depot?.formattedAddress}</p>
              <p className="text-sm">
                H.S.T. Registration Number: {user.hstNumber}
              </p>
              <p className="text-sm font-semibold mb-1 mt-4">{"Bill to:"}</p>
              <p className="text-sm ">
                {"14762789 Canada Inc. (EZ Express Inc.)"}
              </p>
              <p className="text-sm ">
                {"Unit 128-3330 Midland, Scarborough, M1V5E7"}
              </p>
              <p className="text-sm mb-8">
                {"H.S.T. Registration Number: 77237 2917 RT0001"}
              </p>
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Unit Price
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.parcels.map((project) => (
                  <tr key={project._id} className="border-b border-gray-200">
                    <td className="py-4 pr-3 text-sm sm:pl-0 text-center">1</td>
                    <td className="hidden px-3 py-4 text-left text-sm text-gray-500 sm:table-cell">
                      Delivery Fee ({project.city})
                    </td>
                    <td className="hidden px-3 py-4 text-center text-sm text-gray-500 sm:table-cell">
                      {formatCurrency(project.price)}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                      {formatCurrency(project.price * 0.13)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                  >
                    Subtotal
                  </th>
                  <th
                    scope="row"
                    className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                  >
                    Subtotal
                  </th>
                  <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                    {formatCurrency(subtotal)}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                  >
                    HST 13%
                  </th>
                  <th
                    scope="row"
                    className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                  >
                    HST 13%
                  </th>
                  <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                    {formatCurrency(subtotalTax)}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                  >
                    Total
                  </th>
                  <th
                    scope="row"
                    className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                  >
                    Total
                  </th>
                  <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                    {formatCurrency(Number(order?.totalAmount))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex">
            <div className="flex-1"></div>
            <div className="mt-4">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
