import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackageStatus, Parcel } from "../../types";
import ParcelNumberModal from "../ParcelNumberModal";
import { SimpleOrderProgressBar } from "../SimpleOrderProgressBar";

export const DeliveriesTable = ({
  data,
  title,
  description,
}: {
  data: Parcel[];
  title?: string;
  description?: string;
}) => {
  const navigate = useNavigate();
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  const [printParcel, setPrintParcel] = useState<Parcel>();

  return (
    <>
      <div className="mt-8 p-6 bg-white rounded-md">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              {title || "Deliveries"}
            </h1>
            <p className="mt-2 text-sm text-gray-700">{description || ""}</p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/12 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="w-1/12 hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Ref#
                    </th>

                    <th
                      scope="col"
                      className="w-2/12 hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Tracking#
                    </th>

                    <th
                      scope="col"
                      className="w-1/12  hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Quantity
                    </th>

                    <th
                      scope="col"
                      className="w-3/12 hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Address & Contacts
                    </th>
                    <th
                      scope="col"
                      className="w-4/12 hidden sm:table-cell py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data &&
                    data.length > 0 &&
                    data.map((parcel) => (
                      <tr key={parcel._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {parcel.name}
                        </td>
                        <td className="whitespace-nowrap hidden sm:table-cell py-4 px-3  text-left text-sm text-gray-500">
                          {parcel.customerRef}
                        </td>
                        <td className="whitespace-nowrap hidden sm:table-cell py-4 px-3  text-left text-sm text-gray-500">
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
                        <td className="whitespace-nowrap hidden sm:table-cell py-4 px-3  text-left text-sm text-gray-500">
                          {parcel.parcelsCount}
                        </td>
                        <td className="whitespace-nowrap hidden sm:table-cell py-4 px-3 text-sm text-gray-500 md:flex flex-col justify-center">
                          {parcel.unit} {parcel.streetAddress}
                          <span>
                            {parcel.city}, {parcel.postalCode}
                          </span>
                          <span className="pt-2">{parcel.phone}</span>
                        </td>
                        <td className="whitespace-nowrap hidden sm:table-cell py-4 px-3 text-sm text-gray-500">
                          <span className="font-semibold">{parcel.status}</span>
                          {" at "}
                          {format(
                            new Date(parcel.updatedAt ?? ""),
                            "LLL d, yyyy h:mm aaa",
                          )}
                          <SimpleOrderProgressBar
                            status={parcel.status ?? PackageStatus.Submitted}
                          />
                        </td>
                        <td className="flex flex-row justify-end whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => {
                              setPrintParcel(parcel);
                              setIsLabelModalOpen(true);
                            }}
                          >
                            Print labels
                          </button>
                          <div className="bg-gray-300 h-6 w-[1px] mx-2" />
                          <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => navigate(`/parcel/${parcel._id}`)}
                          >
                            View
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
      <ParcelNumberModal
        parcelsCount={printParcel?.parcelsCount || 1}
        parcelId={printParcel?._id || ""}
        open={isLabelModalOpen}
        onClose={() => setIsLabelModalOpen(false)}
      />
      {/* <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">100</span> of{" "}
            <span className="font-medium">{data.length}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Next
          </a>
        </div>
      </nav> */}
    </>
  );
};
