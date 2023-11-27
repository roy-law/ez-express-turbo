import axios from "axios";

export async function fetchParcel(parcelId: string) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/${parcelId}`,
  );

  return response.data;
}
