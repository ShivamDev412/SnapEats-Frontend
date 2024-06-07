import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
const HomeScreen = lazy(() => import("@/screens/users/Home"));
const LoginScreen = lazy(() => import("@/screens/users/Login"));
const SignupScreen = lazy(() => import("@/screens/users/Signup"));
const ForgotPasswordScreen = lazy(() => import("@/screens/users/ForgotPassword"));
const ResetPasswordScreen = lazy(() => import("@/screens/users/ResetPassword"));
const StoreRegisterScreen = lazy(() => import("@/screens/store/Register"));
const ProfileScreen = lazy(() => import("@/screens/users/Profile"));
const ManageAddress = lazy(() => import("@/screens/users/ManageAddress"));
const Routers = () => {
  const {
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    HOME,
    STORE_REGISTER,
    PROFILE,
    MANAGE_ADDRESS,
  } = BROWSER_ROUTE;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={LOGIN} element={<LoginScreen />} />
          <Route path={SIGNUP} element={<SignupScreen />} />
          <Route path={FORGOT_PASSWORD} element={<ForgotPasswordScreen />} />
          <Route path={RESET_PASSWORD} element={<ResetPasswordScreen />} />
        </Route>
        <Route element={<PrivateRoute />}>
          {/* User  */}
          <Route path={HOME} element={<HomeScreen />} />
          <Route path={PROFILE} element={<ProfileScreen />} />
          <Route path={MANAGE_ADDRESS} element={<ManageAddress />} />

          {/* Store */}
          <Route path={STORE_REGISTER} element={<StoreRegisterScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
