import axios from "axios";

export async function fetchParcelByTrackingNumber(trackingNumber: string) {
  const response = await axios.get(
    `${import.meta.env["VITE_API_URL"]}/api/parcel/tracking/${trackingNumber}`,
  );

  return response.data;
}
