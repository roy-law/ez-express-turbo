import { useForm } from "react-hook-form";
import { BackToHeader } from "../components/BackToHeader";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUserContext } from "../providers/UserContextProvider";
import { fetchAdminParcel } from "../services/api/fetchAdminParcel";
import { updateParcel } from "../services/api";

export const ParcelManagement = () => {
  const { token: accessToken } = useUserContext();
  const token = accessToken?.token;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      trackingNumber: "",
    },
  });

  const { data, refetch } = useQuery(
    ["/a/parcel", getValues("trackingNumber")],
    () =>
      fetchAdminParcel({ trackingNumber: getValues("trackingNumber"), token }),
    {
      enabled: false,
      select: (data: any) => {
        const d = data?.[0];

        return {
          address: d.formattedAddress,
          packageSize: d.packageSize,
          parcelsCount: d.parcelsCount,
          price: d.price,
          phone: d.phone,
          name: d.name,
          notes: d.notes,
          id: d._id,
        };
      },
    },
  );

  const queryClient = useQueryClient();
  const { mutate: updatePackageSize } = useMutation(updateParcel, {
    onSuccess: () => {
      queryClient.invalidateQueries(["/a/parcel", getValues("trackingNumber")]);
      refetch();
    },
  });

  return (
    <div>
      {/* <Notification show={!!show} onClose={() => setShow("")} message={show} /> */}
      <BackToHeader />
      <br />
      <div>
        {JSON.stringify(data)}
        <form
          className="fixed z-10 overflow-y-auto"
          onSubmit={handleSubmit((data) => {
            refetch();
          })}
        >
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {"what's the tracking number?"}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("trackingNumber")}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                aria-invalid="true"
                aria-describedby="parcel-tracking-number-error"
              />
            </div>
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.trackingNumber?.message}
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Check
          </button>
          <div className="px-8 py-8" />
          {data && (
            <button
              type="button"
              onClick={() =>
                updatePackageSize({
                  _id: data?.id,
                  packageSize:
                    data?.packageSize === "Exceptional"
                      ? "Standard"
                      : "Exceptional",
                  price:
                    data?.packageSize === "Exceptional"
                      ? data?.price / 2
                      : data?.price * 2,
                  token,
                })
              }
              className="justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update package size
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
