import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
const HomeScreen = lazy(() => import("@/screens/users/Home"));
const LoginScreen = lazy(() => import("@/screens/users/Login"));
const SignupScreen = lazy(() => import("@/screens/users/Signup"));
const ForgotPasswordScreen = lazy(
  () => import("@/screens/users/ForgotPassword")
);
const ResetPasswordScreen = lazy(() => import("@/screens/users/ResetPassword"));
const ProfileScreen = lazy(() => import("@/screens/users/Profile"));
const ManageAddress = lazy(() => import("@/screens/users/ManageAddress"));
const OrdersScreen = lazy(() => import("@/screens/users/Orders"));

// Store
const StoreRegisterScreen = lazy(() => import("@/screens/store/Register"));
const StoreDashboardScreen = lazy(() => import("@/screens/store/Dashboard"));
const StoreOrdersScreen = lazy(() => import("@/screens/store/Orders"));
const StoreSettingsScreen = lazy(() => import("@/screens/store/Settings"));
const StoreEditProfileScreen = lazy(
  () => import("@/screens/store/EditProfile")
);
const StoreMenuScreen = lazy(() => import("@/screens/store/Menu"));
const StoreProfileScreen = lazy(() => import("@/screens/store/Profile"));
const StoreMenuDetailScreen = lazy(() => import("@/screens/store/Menu/detail"));
const PrivacyPolicyScreen = lazy(() => import("@/screens/users/PrivacyPolicy"));
const TermsOfServiceScreen = lazy(
  () => import("@/screens/users/TermsAndConditions")
);
const LoginSuccessScreen = lazy(
  () => import("@/screens/users/Login/SuccessPage")
);
const HomeDetailsScreen = lazy(() => import("@/screens/users/Home/Detail"));
const CheckoutScreen = lazy(() => import("@/screens/users/Checkout"));
const PaymentMethodsScreen = lazy(
  () => import("@/screens/users/PaymentMethods")
);
const StorePaymentsScreen = lazy(() => import("@/screens/store/Payments"));
const Routers = () => {
  const {
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    HOME,
    USER_STORE_DETAIL,
    STORE_REGISTER,
    PROFILE,
    MANAGE_ADDRESS,
    STORE_DASHBOARD,
    STORE_ORDERS,
    STORE_SETTINGS,
    STORE_EDIT_PROFILE,
    STORE_PROFILE,
    STORE_MENU,
    SETTINGS,
    ORDERS,
    STORE_MENU_DETAILS,
    PRIVACY_POLICY,
    TERMS_AND_CONDITIONS,
    LOGIN_SUCCESS,
    CHECKOUT,
    PAYMENT_METHODS,
    STORE_PAYMENTS,
  } = BROWSER_ROUTE;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={LOGIN} element={<LoginScreen />} />
          <Route path={SIGNUP} element={<SignupScreen />} />
          <Route path={FORGOT_PASSWORD} element={<ForgotPasswordScreen />} />
          <Route path={RESET_PASSWORD} element={<ResetPasswordScreen />} />
          <Route path={LOGIN_SUCCESS} element={<LoginSuccessScreen />} />
        </Route>
        <Route element={<PrivateRoute />}>
          {/* User  */}
          <Route path={HOME} element={<HomeScreen />} />
          <Route path={USER_STORE_DETAIL} element={<HomeDetailsScreen />} />
          <Route path={PROFILE} element={<ProfileScreen />} />
          <Route path={MANAGE_ADDRESS} element={<ManageAddress />} />
          <Route path={ORDERS} element={<OrdersScreen />} />
          <Route path={SETTINGS} element={<StoreSettingsScreen />} />
          <Route path={PRIVACY_POLICY} element={<PrivacyPolicyScreen />} />
          <Route path={CHECKOUT} element={<CheckoutScreen />} />
          <Route
            path={TERMS_AND_CONDITIONS}
            element={<TermsOfServiceScreen />}
          />

          <Route path={PAYMENT_METHODS} element={<PaymentMethodsScreen />} />
          {/* Store */}
          <Route path={STORE_REGISTER} element={<StoreRegisterScreen />} />
          <Route path={STORE_DASHBOARD} element={<StoreDashboardScreen />} />
          <Route path={STORE_ORDERS} element={<StoreOrdersScreen />} />
          <Route path={STORE_SETTINGS} element={<StoreSettingsScreen />} />
          <Route
            path={STORE_EDIT_PROFILE}
            element={<StoreEditProfileScreen />}
          />
          <Route path={STORE_PAYMENTS} element={<StorePaymentsScreen />} />
          <Route path={STORE_PROFILE} element={<StoreProfileScreen />} />
          <Route
            path={STORE_MENU_DETAILS}
            element={<StoreMenuDetailScreen />}
          />
          <Route path={STORE_MENU} element={<StoreMenuScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
