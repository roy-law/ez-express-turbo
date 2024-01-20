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
  NEW_ORDERS: "/dashboard/new-orders",
  PARCEL_MANAGEMENT: "/dashboard/parcel-management",
  CUSTOMER_INVOICE: "/dashboard/customer-invoice",
  AREA_MANAGEMENT: "/dashboard/area-management",
  MONTHLY_INVOICE: "/monthly-invoice/:depotId/:month",
};
