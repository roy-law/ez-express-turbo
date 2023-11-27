import { useForm } from "react-hook-form";
import { BackToHeader } from "../components/BackToHeader";
import InputMask from "react-input-mask";
import { useMutation } from "react-query";
import { createDriver } from "../services/api/createDriver";
import { useNavigate } from "react-router-dom";
import { AuthedRoutes } from "../types/routes";
import { useUserContext } from "../providers/UserContextProvider";

export const FormNewDriver = () => {
  const { token } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  const { mutate } = useMutation(createDriver, {
    onSuccess: (data) => {
      //
      navigate(AuthedRoutes.DRIVER_MANAGEMENT);
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        //
        mutate({ token: token?.token, ...data });
      })}
      className="pb-8"
    >
      <BackToHeader />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-start-2 lg:col-span-2">
            <div className="">
              <h2 className="text-lg font-medium text-gray-900">
                New Driver information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <InputMask
                    id="phone-number"
                    type="text"
                    mask={"+1 (999) 999-9999"}
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="+1 (555) 987-6543"
                    {...register("phone")}
                  />
                  <p className=" text-sm text-red-600 mt-2" id="city-error">
                    {errors.phone?.message}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      {...register("username")}
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.username?.message}
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      {...register("email")}
                      id="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className=" text-sm text-red-600 mt-2" id="city-error">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center mt-16">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 py-5 px-28 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
