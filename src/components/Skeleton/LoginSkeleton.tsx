import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AuthWrapperSkeleton from "../Skeleton/AuthWrapperSkeleton";

const LoginSkeleton = () => {
  return (
    <AuthWrapperSkeleton>
      <div
        className="w-full lg:w-8/12 rounded-md h-full lg:h-fit content-center justify-center gap-4"
        style={{ padding: "2rem" }}
      >
        <div className="h-auto w-[2.5in] mx-auto mb-4">
          <Skeleton height={55} width={240} />
        </div>
        <div className="text-center mb-5">
          <Skeleton width={150} height={40} />
        </div>
        <div className="mb-4 w-full">
          <Skeleton height={56} />
        </div>
        <div className="mb-4 w-full">
          <Skeleton height={56} />
        </div>
        <div className="flex justify-between mb-4 w-full">
          <Skeleton height={24} width={120} />
        </div>
        <div className="mb-4 w-full">
          <Skeleton height={40} />
        </div>
        <div className="text-right font-medium mt-4 w-full">
          <Skeleton width={200} height={24} />
        </div>
      </div>
    </AuthWrapperSkeleton>
  );
};

export default LoginSkeleton;
