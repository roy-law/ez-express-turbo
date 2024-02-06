import { useMutation, useQuery, useQueryClient } from "react-query";
import { BackToHeader } from "../components/BackToHeader";
import { useUserContext } from "../providers/UserContextProvider";
import { format } from "date-fns";
import {
  fetchExceptionParcels,
  fetchExceptionSchedule,
  updateExceptionSchedule,
} from "../services/api";
import { useMemo, useState } from "react";
import AddExceptionParcelModal from "../components/AddExceptionParcelModal";
import { AreaConfigMap } from "../types";
import { Notification } from "../components/Notification";
import { ExceptionParcelsTable } from "../components/exceptionParcels/ExceptionParcelsTable";

export const ExceptionParcels = () => {
  const [show, setShow] = useState("");
  const { token } = useUserContext();
  const day = format(new Date(), "yyyy-MM-dd");

  const { data } = useQuery(
    ["exception schedule", day, token?.token],
    () => fetchExceptionSchedule({ token: token?.token, day }),
    {
      enabled: !!token?.token,
    },
  );

  const { data: exceptionParcelsData } = useQuery(
    ["exception parcels", day, token?.token],
    () => fetchExceptionParcels({ token: token?.token, day }),
    {
      enabled: !!token?.token,
    },
  );

  const unaddedExceptionParcelsData = useMemo(() => {
    if (data && data.parcels && data.parcels.length > 0) {
      return exceptionParcelsData?.filter(
        (parcel: any) =>
          data &&
          data.parcels.length &&
          !data.parcels.map((d: any) => d._id).includes(parcel._id),
      );
    } else {
      return exceptionParcelsData;
    }
  }, [exceptionParcelsData, data]);

  const queryClient = useQueryClient();
  const { mutate: mutateUpdateSchedule } = useMutation(
    updateExceptionSchedule,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([
          "exception schedule",
          day,
          token?.token,
        ]);

        [
          AreaConfigMap["scarborough"],
          AreaConfigMap["toronto"],
          AreaConfigMap["northyork"],
          AreaConfigMap["etobicoke"],
          AreaConfigMap["eastyork"],
          AreaConfigMap["markham"],
          AreaConfigMap["richmondhill"],
          AreaConfigMap["vaughan"],
          AreaConfigMap["newmarket"],
          AreaConfigMap["mississauga"],
          AreaConfigMap["ajax"],
          AreaConfigMap["pickering"],
          AreaConfigMap["stouffville"],
        ].map((area) =>
          queryClient.invalidateQueries([
            area.queryKey,
            area.postalCode,
            token?.token,
          ]),
        );

        setShow("Successfully created schedule!");

        setTimeout(() => {
          setShow("");
        }, 5000);
      },
    },
  );

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Notification show={!!show} onClose={() => setShow("")} message={show} />
      <BackToHeader />
      <br />
      <AddExceptionParcelModal open={open} onClose={() => setOpen(false)} />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Exception Parcels
          </h1>
          <p className="mt-2 text-sm text-gray-700"> </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Exception Parcel
          </button>
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
                      Address & Contacts
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data &&
                    data.parcels &&
                    data.parcels.map((parcel: any, idx: number) => (
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

                        <td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                          <button
                            onClick={() =>
                              mutateUpdateSchedule({
                                token: token?.token,
                                exceptionScheduleId: data._id,
                                parcelsTracking: data.parcels
                                  .filter((p: any) => p._id !== parcel._id)
                                  .map((p: any) => p.trackingNumber),
                              })
                            }
                            type="button"
                            className="text-red-600 hover:text-indigo-900"
                          >
                            Remove
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
      <div className="sm:flex sm:items-center mt-20">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Suggested Exception Parcels
          </h1>
          <p className="mt-2 text-sm text-gray-700"> </p>
        </div>
      </div>
      <ExceptionParcelsTable
        data={unaddedExceptionParcelsData}
        day={day}
        actionButton={{
          title: "Add",
          color: "text-indigo-600",
          onClick: (parcel) =>
            mutateUpdateSchedule({
              token: token?.token,
              exceptionScheduleId: data?._id,
              parcels: [...data.parcels, parcel],
            }),
        }}
      />
    </div>
  );
};
