import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import RenderSkeleton from "@/components/RenderSkeleton";

function PublicRoute() {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth);
  return token?.token ? (
    <Navigate to={BROWSER_ROUTE.HOME} />
  ) : (
    <Suspense fallback={<RenderSkeleton pathname={location.pathname} />}>
      <Outlet />
    </Suspense>
  );
}

export default PublicRoute;
