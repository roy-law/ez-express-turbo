import { useMutation, useQueryClient } from "react-query";
import { BackToHeader } from "../components/BackToHeader";
import { useUserContext } from "../providers/UserContextProvider";
import { useCallback, useEffect, useState } from "react";

import { Notification } from "../components/Notification";
import CSVReader, { CSVParcel } from "../components/CSVReader";
import { NewOrdersTable } from "../components/newOrders/NewOrdersTable";
import { createParcelV2 } from "../services/api/createParcel";
import { getCityByPostalCode, getPriceByPostalCode } from "@repo/utils";
import { PackageSize } from "../types";

type ParcelCreationStatus = {
  [key: string]: {
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
  };
};

function transformParcel(parcel: CSVParcel) {
  //add a space after the 3rd character of postal code
  const postalCode =
    parcel.postalCode.slice(0, 3) + " " + parcel.postalCode.slice(3);

  return {
    streetAddress: parcel.address,
    city: getCityByPostalCode(postalCode),
    country: "Canada",
    province: "Ontario",
    name: parcel.name,
    firstName: parcel.name.split(" ")[0],
    lastName: parcel.name.split(" ")[1],
    phone: parcel.phone,
    notes: parcel.notes,
    postalCode,
    depotEmail: parcel.depotEmail,
    packageSize: PackageSize.Standard,
    price: getPriceByPostalCode(postalCode),
    customerRef: parcel.orderNumber,
    parcelsCount: Number(parcel.parcelsCount),
  };
}

export const NewOrders = () => {
  const [show, setShow] = useState("");
  const { token } = useUserContext();

  const queryClient = useQueryClient();

  const [rows, setRows] = useState([]);
  const [processedRows, setProcessedRows] = useState<number>(0);

  const [dataParcelCreationStatus, setDataParcelCreationStatus] =
    useState<ParcelCreationStatus>({});

  const { mutate: createNewParcel } = useMutation(createParcelV2, {
    // customerRef is the order number
    onSuccess(data, { customerRef }) {
      setDataParcelCreationStatus((prev) => ({
        ...prev,
        [`${customerRef}`]: {
          isSuccess: true,
          isError: false,
          isLoading: false,
        },
      }));
      //   queryClient.invalidateQueries("");
    },
    onError(error, { customerRef }) {
      setDataParcelCreationStatus((prev) => ({
        ...prev,
        [`${customerRef}`]: {
          isSuccess: false,
          isError: true,
          isLoading: false,
        },
      }));
    },
  });

  const handleSubmitAll = useCallback(() => {
    if (rows.length === 0) return;

    rows.forEach((row) => {
      setProcessedRows((prev) => prev + 1);
      createNewParcel({
        ...transformParcel(row),
        token: token?.token,
      });
    });
  }, [token?.token, rows, createNewParcel]);

  useEffect(() => {
    if (processedRows === rows.length && processedRows > 0) {
      const successCount = Object.values(dataParcelCreationStatus).filter(
        (status) => status.isSuccess,
      ).length;
      const errorCount = Object.values(dataParcelCreationStatus).filter(
        (status) => status.isError,
      ).length;

      setShow(
        `Successfully processed ${rows.length} orders! 🎉🎉 \n` +
          "\n" +
          `✅ ${successCount} \n ❌ ${errorCount} `,
      );
    }

    const timeout = setTimeout(() => {
      setShow("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [processedRows, rows.length, dataParcelCreationStatus]);

  return (
    <div>
      <Notification show={!!show} onClose={() => setShow("")} message={show} />
      <BackToHeader />
      <br />

      <div className="sm:flex sm:items-center mt-6">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Orders
          </h1>
          <p className="mt-2 text-sm text-gray-700"> </p>
        </div>
        <CSVReader onUploadAccepted={setRows} />
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleSubmitAll}
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit All Orders
          </button>
        </div>
      </div>

      {rows.length && (
        <NewOrdersTable
          rows={rows}
          onAddRow={(row) =>
            createNewParcel({ ...transformParcel(row), token: token?.token })
          }
          rowsCreationStatus={dataParcelCreationStatus}
        />
      )}
    </div>
  );
};
