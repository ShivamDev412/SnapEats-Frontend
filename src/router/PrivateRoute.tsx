import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import MainWrapper from "@/Wrappers/MainWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import RenderSkeleton from "@/components/RenderSkeleton";
function PrivateRoute() {
  const token = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  return token?.token ? (
    <MainWrapper>
      <Suspense fallback={<RenderSkeleton pathname={location.pathname} />}>
        <Outlet />
      </Suspense>
    </MainWrapper>
  ) : (
    <Navigate to={BROWSER_ROUTE.LOGIN} />
  );
}

export default PrivateRoute;
