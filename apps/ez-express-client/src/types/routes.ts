export const UnAuthedRoutes = {
  LANDING: "/",
  TRACKING: "/tracking/:trackingNumber",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
};

export const AuthedOnboardRoutes = {
  ONBOARD_FORM_COMPANY: "/onboard/form-company",
  ONBOARD_FORM_DEPOT: "/onboard/form-depot",
  ONBOARD_SUCCESSFUL: "/onboard/successful",
};

export const AuthedRoutes = {
  DASHBOARD: "/dashboard",
  ORDER_HISTORY: "/dashboard/order-history",
  PROFILE: "/profile",
  PARCEL_NEW: "/parcel/form-new",
  PARCEL_DETAIL: "/parcel/:parcelId",
  INVOICE_DAY: "/dashboard/order-history/invoice-day/:day",
  SHIPPING_LABEL: "/shippinglabel/:numberOfParcels/:parcelId",
};
