import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ParcelStatusSelect } from "../components/areaParcels";
import { BackToHeader } from "../components/BackToHeader";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAdminDayParcels } from "../services/api/fetchAdminDayParcels";
import {
  AreaConfigMap,
  AreaName,
  DriverScheduleType,
  WorkingShift,
} from "../types";
import { AreaParcelPlanning } from "./AreaParcelPlanning";
import { fetchSchedule, updateParcelGeo } from "../services/api";
import { useMemo } from "react";
import lodash from "lodash";

export const AreaParcels = () => {
  const { area = "nothing" } = useParams();
  const { token } = useUserContext();

  const day = format(new Date(), "yyyy-MM-dd");
  const config = AreaConfigMap[area as AreaName];
  const { data } = useQuery(
    [config.queryKey, token?.token],
    () =>
      fetchAdminDayParcels({
        day,
        postalCode: config.postalCode,
        token: token?.token,
      }),
    {
      enabled: !!token?.token && !!config,
    },
  );

  const { data: scheduleData } = useQuery(
    [`${day} ${area} schedule`, token?.token],
    () =>
      fetchSchedule({
        token: token?.token,
        day,
        predefinedArea: area as AreaName,
        type: DriverScheduleType.Delivery,
        shift: WorkingShift.Evening,
      }),
    {
      enabled: !!token?.token && !config,
      staleTime: Infinity,
    },
  );

  const queryClient = useQueryClient();
  const { mutate: putParcelGeo } = useMutation(updateParcelGeo, {
    onSuccess: () => {
      queryClient.invalidateQueries(config.queryKey);
    },
  });

  const sortedData = useMemo(() => {
    if (scheduleData && scheduleData.parcelsOrder && data) {
      const unsorted = data.map((parcel: any) => {
        const deliveryOrder =
          scheduleData.parcelsOrder.findIndex((p: string) => parcel._id === p) +
          1;

        return { ...parcel, deliveryOrder };
      });

      return lodash.sortBy(unsorted, ["deliveryOrder"]);
    } else {
      return data;
    }
  }, [data, scheduleData]);

  return (
    <div className="h-3/5">
      <BackToHeader />
      <br />
      {!!area && area !== "nothing" && (
        <AreaParcelPlanning areaName={area as AreaName} />
      )}
      <div className="mt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Parcels
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {`A list of all the parcels in area including their index,
              tracking number, phone and status.`}
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
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Address & Contacts
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Map
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Order
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedData &&
                      sortedData.map((parcel: any, idx: number) => (
                        <tr key={parcel._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <a
                              href={`tel:${parcel.phone}`}
                              className="underline text-indigo-600 font-medium"
                            >
                              {parcel.name}
                            </a>
                            {parcel.companyId && (
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
                          <td className="whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                            {parcel.parcelsCount}
                          </td>
                          <td className="md:flex flex-col whitespace-nowrap hidden sm:table-cell  px-3 py-4 text-sm text-gray-500">
                            {parcel.formattedAddress}
                            <span className="pt-2">{parcel.phone}</span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {!parcel?.geo && (
                              <button
                                type="button"
                                onClick={() => {
                                  putParcelGeo({
                                    token: token?.token,
                                    parcelId: parcel._id,
                                  });
                                }}
                                className="rounded-full bg-white px-2.5 py-1 mr-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Fetch
                              </button>
                            )}
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                                parcel.formattedAddress,
                              )}`}
                              className="font-medium text-indigo-600 underline"
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              Go
                            </a>
                            {/* {parcel.deliveryPerson} */}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {parcel.deliveryOrder}
                          </td>

                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <ParcelStatusSelect
                              currentStatus={parcel.status}
                              parcelId={parcel._id}
                              queryKey={[config.queryKey, token?.token]}
                            />
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
    </div>
  );
};
