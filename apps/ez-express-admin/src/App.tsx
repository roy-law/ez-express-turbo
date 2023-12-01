import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import { ProtectionLayout } from "./layout/ProtectionLayout";
import { AreaParcels } from "./pages/AreaParcels";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { AuthProvider } from "./providers/AuthProvider";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { AuthedRoutes, UnAuthedRoutes } from "./types/routes";
import { ParcelPlaning } from "./pages/ParcelPlaning";
import { Pickup } from "./pages/Pickup";
import { DriverManagement } from "./pages/DriverManagement";
import { FormNewDriver } from "./pages/FormNewDriver";
import { ExceptionParcels } from "./pages/ExceptionParcels";
import { CustomerInvoice } from "./pages/CustomerInvoice";
import { MonthlyInvoicePdf } from "./pages/MonthlyInvoicePdf";
import { ParcelManagement } from "./pages/ParcelManagement";

export const router = createBrowserRouter([
  {
    path: UnAuthedRoutes.LANDING,
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        element: <ProtectionLayout />,
        children: [
          {
            path: AuthedRoutes.DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: AuthedRoutes.AREA_PARCELS,
            element: <AreaParcels />,
          },
          {
            path: AuthedRoutes.PARCELS_PLANING,
            element: <ParcelPlaning />,
          },
          {
            path: AuthedRoutes.PICKUP,
            element: <Pickup />,
          },
          {
            path: AuthedRoutes.DRIVER_MANAGEMENT,
            element: <DriverManagement />,
          },
          {
            path: AuthedRoutes.FORM_NEW_DRIVER,
            element: <FormNewDriver />,
          },
          {
            path: AuthedRoutes.PARCEL_MANAGEMENT,
            element: <ParcelManagement />,
          },
          {
            path: AuthedRoutes.EXCEPTION_PARCELS,
            element: <ExceptionParcels />,
          },
          {
            path: AuthedRoutes.CUSTOMER_INVOICE,
            element: <CustomerInvoice />,
          },
          {},
        ],
      },
    ],
  },
  {
    path: AuthedRoutes.MONTHLY_INVOICE,
    element: <ProtectionLayout />,
    children: [
      {
        index: true,
        element: <MonthlyInvoicePdf />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export function App() {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
