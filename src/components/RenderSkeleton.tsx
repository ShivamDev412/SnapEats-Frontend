import { BROWSER_ROUTE } from "@/utils/Endpoints";
import {
  LoginSkeleton,
  ProfileSkeleton,
  SignupSkeleton,
  AddressSkeleton,
  StoreProfileSkeleton,
  MenuSkeleton,
  ItemDetailSkeleton,
  HomeSkeleton,
  StoreOrderSkeleton,
  UserOrderSkeleton,
  CheckoutSkeleton,
  HomeDetailSkeleton,
  StoreDashboardSkeleton,
} from "./Skeleton";

const RenderSkeleton = ({ pathname }: { pathname: string }) => {
  if (pathname === BROWSER_ROUTE.LOGIN) {
    return <LoginSkeleton />;
  } else if (pathname === BROWSER_ROUTE.SIGNUP) {
    return <SignupSkeleton />;
  } else if (pathname === BROWSER_ROUTE.PROFILE) {
    return <ProfileSkeleton />;
  } else if (pathname === BROWSER_ROUTE.MANAGE_ADDRESS) {
    return <AddressSkeleton />;
  } else if (pathname === BROWSER_ROUTE.STORE_PROFILE) {
    return <StoreProfileSkeleton />;
  } else if (pathname === BROWSER_ROUTE.STORE_MENU) {
    return <MenuSkeleton />;
  } else if (pathname === BROWSER_ROUTE.STORE_MENU_DETAILS) {
    return <ItemDetailSkeleton />;
  } else if (pathname === BROWSER_ROUTE.HOME) {
    return <HomeSkeleton />;
  } else if (pathname === BROWSER_ROUTE.STORE_ORDERS) {
    return <StoreOrderSkeleton />;
  } else if (pathname === BROWSER_ROUTE.ORDERS) {
    return <UserOrderSkeleton />;
  } else if (pathname === BROWSER_ROUTE.CHECKOUT) {
    return <CheckoutSkeleton />;
  } else if (pathname === BROWSER_ROUTE.USER_STORE_DETAIL) {
    return <HomeDetailSkeleton />;
  } else if (pathname === BROWSER_ROUTE.STORE_DASHBOARD) {
    return <StoreDashboardSkeleton />;
  } else {
    return <></>;
  }
};
export default RenderSkeleton;
