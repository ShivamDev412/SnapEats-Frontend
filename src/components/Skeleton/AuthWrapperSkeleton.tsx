import React, { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

const AuthWrapperSkeleton: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <main className="flex justify-between bg-zinc-950 h-screen">
      <section className="hidden animate-pulse lg:flex flex-col justify-center items-center lg:w-6/12 2xl:w-7/12 h-full">
        <div className="h-auto w-7/12">
          <Skeleton className="animate-pulse" style={{ aspectRatio: "1/1" }} />
        </div>
        <h2 className="text-4xl text-center mt-4">
          <Skeleton width={300} />
        </h2>
        <h3 className="text-2xl mt-2 text-center">
          <Skeleton width={400} />
        </h3>
      </section>
      <section className="w-full animate-pulse lg:w-6/12 2xl:w-5/12 flex flex-col justify-center items-center h-full">
        {children}
      </section>
    </main>
  );
};

export default AuthWrapperSkeleton;
