import { useUserContext } from "../../providers/UserContextProvider";
import { ParcelStatusSelect } from "../areaParcels";

interface ExceptionParcelsTableProps {
  data: any[];
  day: string;
  actionButton: {
    title: string;
    color: string;
    onClick: (arg: object) => void;
  };
}
export const ExceptionParcelsTable = ({
  data,
  day,
  actionButton,
}: ExceptionParcelsTableProps) => {
  const {token} = useUserContext()

  return (
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
                    Address & Contacts
                  </th>
                  
                  <th
                    scope="col"
                    className="text-center px-4 py-3 text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data &&
                  data.map((parcel: any, idx: number) => (
                    <tr key={parcel._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {parcel.name}
                        {parcel.companyId && parcel.companyId.companyName && (
                          <span className="text-sm font-normal text-gray-500">
                            {" for "}
                          </span>
                        )}
                        {parcel.companyId?.companyName}
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

                      <td className="md:flex flex-col whitespace-nowrap hidden sm:table-cell  px-3 py-4 text-sm text-gray-500">
                        {parcel.formattedAddress}
                        <span className="pt-2">{parcel.phone}</span>
                      </td>

                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <ParcelStatusSelect
                          currentStatus={parcel.status}
                          parcelId={parcel._id}
                          queryKey={["exception parcels", day, token?.token]}
                        />
                      </td>

                      <td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => actionButton.onClick(parcel)}
                          type="button"
                          className={`${
                            actionButton.color || "text-red-600"
                          } hover:text-indigo-900`}
                        >
                          {actionButton.title}
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
