import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import RenderSkeleton from "@/components/RenderSkeleton";
import { LoginSkeleton, SignupSkeleton } from "@/components/Skeleton";

const handleSkeleton = (pathname: string) => {
  switch (pathname) {
    case BROWSER_ROUTE.LOGIN:
      return <LoginSkeleton />;
    case BROWSER_ROUTE.SIGNUP:
      return <SignupSkeleton />;
    default:
      return "Loading...";
  }
};

function PublicRoute() {
  const location = useLocation();
  const token = useSelector((state: RootState) => state.auth);
  return token?.token ? (
    <Navigate to={BROWSER_ROUTE.HOME} />
  ) : (
    // <Suspense fallback={<RenderSkeleton pathname={location.pathname} />}>
    <Suspense fallback={handleSkeleton(location.pathname)}>
      <Outlet />
    </Suspense>
  );
}

export default PublicRoute;
