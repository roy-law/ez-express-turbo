import axios from "axios";

export async function fetchParcels(depotId: string) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/depot`,
    {
      params: {
        id: depotId,
      },
    },
  );

  return response.data;
}
