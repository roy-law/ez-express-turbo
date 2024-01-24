import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shippingLabelSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateParcel } from "../services/api";
import { useQueryKeys } from "../hooks/useQueryKeys";
import { useNavigate } from "react-router-dom";
import { isChrome } from "react-device-detect";
import { useAccessToken } from "../store/auth/useAuthStore";

export default function ParcelNumberModal({
  parcelsCount,
  parcelId,
  open,
  onClose,
}: {
  parcelsCount: number;
  parcelId: string;
  open: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = useAccessToken();
  const { dashboardQueryKeys } = useQueryKeys();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      numberOfLabels: 1,
    },
    resolver: yupResolver(shippingLabelSchema),
  });

  const { mutate: updateParcelsCount } = useMutation({
    mutationFn: updateParcel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.DASHBOARD_TODAY_PARCELS,
      });
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.DASHBOARD_TMR_PARCELS,
      });
      const numberOfLabels = getValues("numberOfLabels");
      if (isChrome) {
        console.log(
          `/shippinglabel/${Math.abs(numberOfLabels)}/${parcelId}`,
          "_blank",
        );
        window.open(
          `/shippinglabel/${Math.abs(numberOfLabels)}/${parcelId}`,
          "_blank",
        );
      } else {
        navigate(`/shippinglabel/${Math.abs(numberOfLabels)}/${parcelId}`);
      }
      onClose();
    },
  });

  useEffect(() => {
    if (parcelsCount) {
      reset({
        numberOfLabels: parcelsCount || 1,
      });
    }
  }, [parcelsCount, reset]);

  return (
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
          <div className="fixed inset-0 bg-gray-50/70 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <form
          className="fixed inset-0 z-10 overflow-y-auto"
          onSubmit={handleSubmit((data) => {
            updateParcelsCount({
              token,
              parcelsCount: data.numberOfLabels,
              _id: parcelId,
            });
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
                    <PrinterIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Print Tracking Labels
                    </Dialog.Title>
                    <div className="mt-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        how many packages you are sending to the customer?
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          {...register("numberOfLabels", {
                            min: 1,
                          })}
                          type="number"
                          className="block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                          aria-invalid="true"
                          aria-describedby="email-error"
                        />
                      </div>
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.numberOfLabels?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    disabled={!!errors.numberOfLabels?.message}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 disabled:bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Print
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
}
