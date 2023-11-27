import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardLayout } from "./layout/DashboardLayout";
import { DefaultLayout } from "./layout/DefaultLayout";
import { OnboardFormLayout } from "./layout/OnboardFormLayout";
import { Dashboard } from "./pages/Dashboard";
import { FormCompany } from "./pages/FormCompany";
import { FormDepot } from "./pages/FormDepot";
import { FormParcel } from "./pages/FormParcel";
import { FormSuccessfulOnboarding } from "./pages/FormSuccessfulOnboarding";
import { Help } from "./pages/Help";
import { Invoice } from "./pages/Invoice";
import { Landing } from "./pages/Landing";
import { OrderHistory } from "./pages/OrderHistory";
import { ParcelDetail } from "./pages/ParcelDetail";
import { Settings } from "./pages/Settings";
import { ShippingLabel } from "./pages/ShippingLabel";
import { Tracking } from "./pages/Tracking";
import { AuthProvider } from "./providers/AuthProvider";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import {
  AuthedRoutes,
  UnAuthedRoutes,
  AuthedOnboardRoutes,
} from "./types/routes";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: UnAuthedRoutes.LANDING,
        element: <Landing />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: AuthedRoutes.DASHBOARD,
            element: <Dashboard />,
            handle: { isProtected: true },
          },
          {
            path: AuthedRoutes.ORDER_HISTORY,
            element: <OrderHistory />,
            handle: { isProtected: true },
          },
          { path: "/dashboard/help", element: <Help /> },
          {
            path: AuthedRoutes.INVOICE_DAY,
            element: <Invoice />,
            handle: { isProtected: true },
          },
        ],
      },
      {
        element: <DefaultLayout />,
        children: [
          {
            path: AuthedRoutes.SHIPPING_LABEL,
            element: <ShippingLabel />,
            handle: { isProtected: true },
          },
        ],
      },
      {
        element: <DefaultLayout />,
        children: [
          {
            path: AuthedRoutes.PARCEL_NEW,
            element: <FormParcel />,
            handle: { isProtected: true },
          },
          {
            path: AuthedRoutes.PARCEL_DETAIL,
            element: <ParcelDetail />,
            handle: { isProtected: true },
          },
        ],
      },
      {
        element: <OnboardFormLayout />,
        children: [
          {
            index: true,
            path: AuthedOnboardRoutes.ONBOARD_FORM_COMPANY,
            element: <FormCompany />,
            handle: { isProtected: true },
          },
          {
            path: AuthedOnboardRoutes.ONBOARD_FORM_DEPOT,
            element: <FormDepot />,
            handle: { isProtected: true },
          },
          {
            path: AuthedOnboardRoutes.ONBOARD_SUCCESSFUL,
            element: <FormSuccessfulOnboarding />,
            handle: { isProtected: true },
          },
        ],
      },
      {
        path: AuthedRoutes.PROFILE,
        element: <DefaultLayout />,
        children: [{ index: true, element: <Settings /> }],
      },
    ],
  },
  {
    path: UnAuthedRoutes.TRACKING,
    element: <Tracking />,
  },
  {
    path: UnAuthedRoutes.PRIVACY_POLICY,
    element: <PrivacyPolicy />,
  },
  {
    path: UnAuthedRoutes.TERMS_AND_CONDITIONS,
    element: <TermsAndConditions />,
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
