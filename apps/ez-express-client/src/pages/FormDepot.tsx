import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "../components/forms/AddressForm";
import { ContactForm } from "../components/forms/ContactForm";
import { useUserContext } from "../providers/UserContextProvider";
import { createDepot } from "../services/api";
import { depotSchema } from "../types";
import { AuthedOnboardRoutes } from "../types/routes";

export function FormDepot() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Contacts
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
    resolver: yupResolver(depotSchema),
  });

  const queryClient = useQueryClient();
  const { token } = useUserContext();
  const { mutate } = useMutation({
    mutationFn: createDepot,
    onSuccess(data) {
      queryClient.setQueryData(["depot", token?.token], data);
      navigate(AuthedOnboardRoutes.ONBOARD_SUCCESSFUL);
    },
  });

  return (
    <form
      className="flex flex-col flex-1"
      onSubmit={handleSubmit((data) => {
        mutate({ token: token?.token, ...data });
      })}
    >
      <div className="flex-1">
        <AddressForm
          errors={errors}
          countryFields={register("country")}
          provinceFields={register("province")}
          cityFields={register("city")}
          streetAddressFields={register("streetAddress")}
          unitFields={register("unit")}
          control={control}
          setValue={setValue}
        />
        <ContactForm
          errors={errors}
          phoneFields={register("phone")}
          wechatFields={register("wechat")}
        />
      </div>
      <div className="flex justify-center py-10">
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Next Step
        </button>
      </div>
    </form>
  );
}
