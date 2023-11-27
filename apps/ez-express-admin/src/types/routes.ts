export const UnAuthedRoutes = {
  LANDING: "/",
  TRACKING: "/tracking/:trackingNumber",
};

export const AuthedRoutes = {
  DASHBOARD: "/dashboard",
  PICKUP: "/dashboard/pickup",
  AREA_PARCELS: "/dashboard/:area",
  PARCELS_PLANING: "/dashboard/parcels-planning",
  DRIVER_MANAGEMENT: "/dashboard/driver-management",
  FORM_NEW_DRIVER: "/dashboard/form-new-driver",
  EXCEPTION_PARCELS: "/dashboard/exception-parcels",
  CUSTOMER_INVOICE: "/dashboard/customer-invoice",
  MONTHLY_INVOICE: "/monthly-invoice/:depotId/:month",
};
