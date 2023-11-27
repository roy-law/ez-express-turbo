import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BackToHeader } from "../components/BackToHeader";
import { CustomerInfoFormTwoCols } from "../components/forms/CustomerInfoFormTwoCols";
import { PackageSizeRadioOptionsTwoCols } from "../components/forms/PackageSizeRadioOptionsTwoCols";
import { ParcelAddressFormTwoCols } from "../components/forms/ParcelAddressFormTwoCols";
import Notification from "../components/Notification";
import { useParcelApi } from "../hooks/api";
import {
  getPackageOptionByPostalCode,
  usePackageSizeOptions,
} from "../hooks/usePackageSizeOptions";
import { useUserContext } from "../providers/UserContextProvider";
import { updateParcelStatus } from "../services/api";
import { updateParcel } from "../services/api/updateParcel";
import {
  PackageSize,
  PackageStatus,
  parcelFormScehema,
  ParcelSizeOption,
} from "../types";
import { AuthedRoutes } from "../types/routes";
import { QUERY_NAME, useQueryKeys } from "../hooks/useQueryKeys";

export function ParcelDetail() {
  const { dashboardQueryKeys, parcelQueryKeys } = useQueryKeys();
  const navigate = useNavigate();
  const { parcelId } = useParams();
  const { data: parcel, isSuccess: isParcelSuccess } = useParcelApi({
    parcelId,
  });
  const [show, setShow] = useState("");

  const { depot, token } = useUserContext();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateParcel, {
    onSuccess(data) {
      queryClient.invalidateQueries(
        parcelQueryKeys(parcelId)[QUERY_NAME.PARCEL_DETAIL],
      );
      queryClient.invalidateQueries(dashboardQueryKeys.DASHBOARD_TMR_PARCELS);
      queryClient.invalidateQueries(dashboardQueryKeys.DASHBOARD_TODAY_PARCELS);

      setShow("Succesfully saved!");

      // Dismiss successful message
      setTimeout(() => {
        setShow("");
      }, 5000);
    },

    onError(data) {
      setShow("Oops! Something went wrong..");

      // Dismiss successful message
      setTimeout(() => {
        setShow("");
      }, 5000);
    },
  });

  const { mutate: cancelParcel } = useMutation(updateParcelStatus, {
    onSuccess(data) {
      // Cancelled post action
      queryClient.invalidateQueries(
        parcelQueryKeys(parcelId)[QUERY_NAME.PARCEL_DETAIL],
      );
      queryClient.invalidateQueries(dashboardQueryKeys.DASHBOARD_TMR_PARCELS);
      queryClient.invalidateQueries(dashboardQueryKeys.DASHBOARD_TODAY_PARCELS);

      setShow("Parcel Cancelled! Redirecting back to dashboard..");

      // Dismiss successful message
      setTimeout(() => {
        setShow("");
        navigate(AuthedRoutes.DASHBOARD);
      }, 5000);
    },
  });

  const [postalCode, setPostalCode] = useState("");
  const packageSizes = usePackageSizeOptions(postalCode);
  const [selectedPackageSize, setSelectedPackageSize] =
    useState<ParcelSizeOption>(packageSizes[0]);

  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      customerRef: "",
      phone: "",
      name: "",
      streetAddress: "",
      unit: "",
      city: "",
      province: "Ontario",
      country: "Canada",
      postalCode: "",
      notes: "",
      packageSize: {
        id: PackageSize.Standard,
        title: "Standard",
        description: "",
        price: "Calculating...",
        priceValue: 0,
      },
    },
    resolver: yupResolver(parcelFormScehema),
  });

  // Initialize default values
  useEffect(() => {
    if (depot && parcel && !isDirty) {
      reset({
        customerRef: parcel?.customerRef,
        phone: parcel?.phone,
        name: parcel?.name,
        streetAddress: parcel?.streetAddress,
        unit: parcel?.unit,
        city: parcel?.city,
        province: "Ontario",
        country: "Canada",
        postalCode: parcel?.postalCode,
        notes: parcel?.notes,
        packageSize: getPackageOptionByPostalCode(
          parcel.postalCode,
          parcel.packageSize,
        ),
      });

      setPostalCode(parcel.postalCode);
      setSelectedPackageSize(
        getPackageOptionByPostalCode(parcel.postalCode, parcel.packageSize),
      );
    }
  }, [isParcelSuccess, depot, parcel, reset, isDirty]);

  const shouldNotUpdate = [
    PackageStatus.Cancelled,
    PackageStatus.Rejected,
    PackageStatus.Delivered,
    PackageStatus.Dispatched,
    PackageStatus.PickedUp,
    PackageStatus.OnTheWay,
    PackageStatus.Returned,
  ].includes(parcel?.status);

  const shouldNotSave = [
    PackageStatus.Cancelled,
    PackageStatus.Rejected,
    PackageStatus.Delivered,
    PackageStatus.Returned,
  ].includes(parcel?.status);

  return (
    <>
      <Notification show={!!show} onClose={() => setShow("")} message={show} />
      <BackToHeader />
      <form
        className="px-8"
        onSubmit={handleSubmit((data) => {
          if (parcelId && depot) {
            mutate({
              ...data,
              _id: parcelId,
              depotId: depot?._id,
              packageSize: selectedPackageSize.id,
              price: selectedPackageSize.priceValue,
              token: token?.token,
            });
          }
        })}
      >
        <div className="flex flex-col space-y-12">
          <CustomerInfoFormTwoCols
            errors={errors}
            phoneFields={register("phone")}
            wechatFields={register("phone")}
            notesFields={register("notes")}
            nameFields={register("name")}
            customerRefFields={register("customerRef")}
          />
          <ParcelAddressFormTwoCols
            errors={errors}
            countryFields={register("country")}
            provinceFields={register("province")}
            cityFields={register("city")}
            setPostalCode={setPostalCode}
            setSelectedPackageSize={setSelectedPackageSize}
            setValue={setValue}
            streetAddressFields={register("streetAddress")}
            selectedPackageSizeId={selectedPackageSize.id}
            unitFields={register("unit")}
            control={control}
          />
          <PackageSizeRadioOptionsTwoCols
            disabled={shouldNotUpdate}
            errorMessage={errors?.packageSize?.message ?? ""}
            packageSizes={packageSizes}
            selectedPackageSize={selectedPackageSize}
            setSelectedPackageSize={setSelectedPackageSize}
            control={control}
          />
        </div>

        <div className="py-6 flex items-center justify-end gap-x-6">
          {shouldNotUpdate && (
            <p className="text-sm font-semibold text-red-400 underline">
              You would not be able to cancel order after we picked up your
              item. If you have to, please call us at +1 (514) 653-7199
            </p>
          )}
          <button
            type="button"
            disabled={shouldNotUpdate}
            onClick={() =>
              cancelParcel({
                parcelId: parcelId ?? "",
                status: PackageStatus.Cancelled,
                token: token?.token,
              })
            }
            className="rounded-md bg-red-600 disabled:bg-gray-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel Order
          </button>
          <button
            type="submit"
            disabled={!isDirty || shouldNotSave}
            className="rounded-md bg-indigo-600 disabled:bg-gray-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
