import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
const HomeScreen = lazy(() => import("@/screens/Home"));
const LoginScreen = lazy(() => import("@/screens/Login"));
const SignupScreen = lazy(() => import("@/screens/Signup"));
const ForgotPasswordScreen = lazy(() => import("@/screens/ForgotPassword"));
const ResetPasswordScreen = lazy(() => import("@/screens/ResetPassword"));
const StoreRegisterScreen = lazy(() => import("@/screens/StoreRegister"));
const Routers = () => {
  const {
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    HOME,
    STORE_REGISTER,
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
          <Route path={HOME} element={<HomeScreen />} />
          <Route path={STORE_REGISTER} element={<StoreRegisterScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
