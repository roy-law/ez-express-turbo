import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createExceptionSchedule,
  fetchExceptionSchedule,
  updateExceptionSchedule,
} from "../services/api";
import { useUserContext } from "../providers/UserContextProvider";
import { format } from "date-fns";
import { Notification } from "../components/Notification";
import { AreaConfigMap } from "../types";

export default function AddExceptionParcelModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [show, setShow] = useState("");
  const day = format(new Date(), "yyyy-MM-dd");
  const { token } = useUserContext();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelTrackingNumber: "",
    },
  });

  const { data: exceptionScheduleData } = useQuery(
    ["exception schedule", day, token?.token],
    () => fetchExceptionSchedule({ token: token?.token, day }),
    {
      enabled: !!token?.token,
    },
  );

  const { mutate: mutateSchedule } = useMutation(createExceptionSchedule, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["exception schedule", day, token?.token]);

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
        AreaConfigMap["stouffville"],
      ].map((area) =>
        queryClient.invalidateQueries([
          area.queryKey,
          area.postalCode,
          token?.token,
        ]),
      );

      setShow("Successfully created exception schedule!");

      onClose();

      setTimeout(() => {
        setShow("");
      }, 2000);
    },
  });

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

        setShow("Successfully updated exception schedule!");
        onClose();

        setTimeout(() => {
          setShow("");
        }, 2000);
      },
    },
  );

  return (
    <>
      <Notification show={!!show} onClose={() => setShow("")} message={show} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <form
            className="fixed inset-0 z-10 overflow-y-auto"
            onSubmit={handleSubmit((data) => {
              if (exceptionScheduleData?._id) {
                const currentParcelsTrackingNumbers =
                  exceptionScheduleData.parcels.map(
                    (p: any) => p.trackingNumber,
                  );
                mutateUpdateSchedule({
                  token: token?.token,
                  exceptionScheduleId: exceptionScheduleData._id,
                  parcelsTracking: [
                    ...currentParcelsTrackingNumbers,
                    data.parcelTrackingNumber,
                  ],
                });
              } else {
                mutateSchedule({
                  token: token?.token,
                  day,
                  parcelsTracking: [data.parcelTrackingNumber],
                });
              }
            })}
          >
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <MagnifyingGlassIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Search Parcels
                      </Dialog.Title>
                      <div className="mt-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {"what's the tracking number?"}
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <input
                            {...register("parcelTrackingNumber")}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                            aria-invalid="true"
                            aria-describedby="parcel-tracking-number-error"
                          />
                        </div>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.parcelTrackingNumber?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </form>
        </Dialog>
      </Transition.Root>
    </>
  );
}
