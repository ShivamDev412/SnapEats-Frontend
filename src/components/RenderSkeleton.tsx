import { BROWSER_ROUTE } from "@/utils/Endpoints";
import {
  LoginSkeleton,
  ProfileSkeleton,
  SignupSkeleton,
  AddressSkeleton,
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
  }
};
export default RenderSkeleton;