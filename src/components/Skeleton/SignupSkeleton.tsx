import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SignupSkeleton = () => {
  return (
    <div className="flex justify-between bg-zinc-950 h-screen">
      <div className="hidden animate-pulse lg:flex flex-col justify-center items-center lg:w-6/12 2xl:w-7/12 h-full">
        <div className="h-auto w-7/12">
          <Skeleton style={{ aspectRatio: "1/1" }} />
        </div>
        <h2 className="text-4xl text-center mt-4">
          <Skeleton width={300} />
        </h2>
        <h3 className="text-2xl mt-2 text-center">
          <Skeleton width={400} />
        </h3>
      </div>
      <div className="animate-pulse w-full lg:w-6/12 2xl:w-5/12 flex flex-col justify-center items-center h-full">
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
          <div className="mb-4 w-full">
            <Skeleton height={56} />
          </div>
          <div className="mb-4 w-full">
            <Skeleton height={56} />
          </div>
          <div className="mb-4 w-full">
            <Skeleton height={40} />
          </div>
          <div className="text-right font-medium mt-4 w-full">
            <Skeleton width={200} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSkeleton;
