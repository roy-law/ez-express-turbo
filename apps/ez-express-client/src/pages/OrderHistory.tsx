import { useOrderHistoryApi } from "../hooks/api";
import { add, format, sub } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

export const formatCurrency = (price: number | string) => {
  return `$ ${Number(price).toFixed(2)}`;
};

export function OrderHistory() {
  const navigate = useNavigate();
  const to = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
  const from = format(sub(new Date(to), { days: 30 }), "yyyy-MM-dd");
  const { data, isSuccess } = useOrderHistoryApi({ from, to });

  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order history
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage deliveries, and download
            invoices.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-20">
            {isSuccess && (!data || !data.length) && (
              <p className="text-m">no order found</p>
            )}
            {data &&
              data.length &&
              data.map((order, i) => (
                <div key={i}>
                  <h3 className="sr-only">
                    Order placed on <time>{order.day}</time>
                  </h3>

                  <div className="rounded-lg bg-white py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                    <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                      <div className="flex justify-between sm:block">
                        <dt className="font-medium text-gray-900">
                          Date placed
                        </dt>
                        <dd className="sm:mt-1">
                          <time>{order.day}</time>
                        </dd>
                      </div>
                      <div className="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt className="font-medium text-gray-900">
                          Number of orders
                        </dt>
                        <dd className="sm:mt-1">{order.numberOfOrders}</dd>
                      </div>
                      <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                        <dt>Total amount</dt>
                        <dd className="sm:mt-1">
                          {formatCurrency(order.totalAmount)}
                        </dd>
                      </div>
                    </dl>
                    <button
                      onClick={() =>
                        navigate(
                          `/dashboard/order-history/invoice-day/${order.day}`,
                        )
                      }
                      className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                    >
                      View Invoice
                    </button>
                  </div>

                  <table className="mt-4 w-full text-gray-500 sm:mt-6">
                    <caption className="sr-only">Products</caption>
                    <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                        >
                          Delivery
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="hidden py-3 pr-8 font-normal sm:table-cell"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="w-0 py-3 text-right font-normal"
                        >
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                      {order.parcels.length &&
                        order.parcels.map((product, i) => (
                          <tr key={i}>
                            <td className="py-6 pr-8">
                              <div className="flex items-center">
                                <span className="flex h-14 w-14 mr-6 items-center justify-center rounded-md bg-gray-500">
                                  <span className="text-xl font-medium leading-none text-white">
                                    {product.city.includes(" ")
                                      ? product.city
                                          .split(" ")
                                          .reduce(
                                            (pre, curr) => pre + curr[0],
                                            "",
                                          )
                                          .toUpperCase()
                                      : product.city.slice(0, 2).toUpperCase()}
                                  </span>
                                </span>
                                <div>
                                  <a
                                    href={`${
                                      import.meta.env.VITE_TRACKING_BASE_URL
                                    }/tracking/${product.trackingNumber}`}
                                    className="font-medium text-indigo-600 underline"
                                    target={"_blank"}
                                    rel="noreferrer"
                                  >
                                    {product.trackingNumber.toUpperCase()}
                                  </a>
                                  <div className="mt-1 sm:hidden">
                                    {product.price}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="hidden py-6 pr-8 sm:table-cell font-semibold">
                              {formatCurrency(
                                product.price * (1 + product.province.tax),
                              )}
                            </td>
                            <td className="hidden py-6 pr-8 sm:table-cell">
                              <span className="font-semibold">
                                {product.status}
                              </span>
                              {" at "}
                              {format(
                                new Date(product.updatedAt),
                                "LLL d, yyyy h:mm aaa",
                              )}
                            </td>
                            <td className="whitespace-nowrap py-6 text-right font-medium">
                              <button
                                onClick={() =>
                                  navigate(`/parcel/${product._id}`)
                                }
                                className="text-indigo-600"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
