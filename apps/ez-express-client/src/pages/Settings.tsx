import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BackToHeader } from "../components/BackToHeader";
import { AddressFormTwoCols } from "../components/forms/AddressFormTwoCols";
import { CompanyFormTwoCols } from "../components/forms/CompanyFormTwoCol";
import { ContactFormTwoCols } from "../components/forms/ContactFormTwoCols";
import Notification from "../components/Notification";
import { useUserContext } from "../providers/UserContextProvider";
import { updateDepot, updateUser } from "../services/api";
import { userInformationUpdateSchema } from "../types/combined";

export function Settings() {
  const queryClient = useQueryClient();
  const { token } = useUserContext();
  const [show, setShow] = useState(false);

  const { user, depot } = useUserContext();

  const { mutate: mutateDepot } = useMutation({
    mutationFn: updateDepot,
    onSuccess(data) {
      queryClient.setQueryData(["depot", token?.token], data);
      setShow(true);

      // Dismiss successful message
      setTimeout(() => {
        setShow(false);
      }, 5000);
    },
  });

  const { mutate: mutateUser } = useMutation({
    mutationFn: updateUser,
    onSuccess(data) {
      queryClient.setQueryData(["user", token?.token], data);
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      // Company
      companyName: "",
      hstNumber: "",

      // Contacts
      email: "",
      phone: "",
      wechat: "",

      // Address
      country: "Canada",
      province: "Ontario",
      city: "",
      streetAddress: "",
      postalCode: "",
      unit: "",
    },
    resolver: yupResolver(userInformationUpdateSchema),
  });

  // Initialize default values
  useEffect(() => {
    if (user && depot) {
      reset({
        // Company
        companyName: user?.companyName,
        hstNumber: user?.hstNumber,

        // Contacts
        email: depot?.email ?? "",
        phone: depot?.phone,
        wechat: depot?.wechat ?? "",

        // Address
        country: "Canada",
        province: "Ontario",
        city: depot?.city,
        streetAddress: depot?.streetAddress,
        postalCode: depot?.postalCode,
        unit: depot?.unit ?? "",
      });
    }
  }, [user, depot, reset]);

  return (
    <>
      <Notification
        show={show}
        onClose={() => setShow(false)}
        message={"Successfully saved!"}
      />
      <BackToHeader />
      <form
        className="px-8"
        onSubmit={handleSubmit((data) => {
          if (depot)
            mutateDepot({ ...data, _id: depot?._id, token: token?.token });
          if (user)
            mutateUser({
              token: token?.token,
              companyName: data.companyName,
              hstNumber: data.hstNumber,
            });
        })}
      >
        <div className="flex flex-col space-y-12">
          <CompanyFormTwoCols
            errors={errors}
            companyFields={register("companyName")}
            hstNumberFields={register("hstNumber")}
          />

          <ContactFormTwoCols
            errors={errors}
            emailFields={register("email")}
            phoneFields={register("phone")}
            wechatFields={register("wechat")}
          />

          <AddressFormTwoCols
            errors={errors}
            countryFields={register("country")}
            provinceFields={register("province")}
            cityFields={register("city")}
            unitFields={register("unit")}
            streetAddressFields={register("streetAddress")}
            control={control}
            setValue={setValue}
          />
        </div>
        <div className="py-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={!isDirty}
            className="rounded-md bg-indigo-600 disabled:bg-gray-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
