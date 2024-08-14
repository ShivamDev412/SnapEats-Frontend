import Skeleton from "react-loading-skeleton";

const StoreDashboardSkeleton = () => {
  return (
    <div className="animate-pulse w-11/12 flex flex-col gap-6">
      <div className="flex gap-4 flex-wrap">
        <MatricesCardSkeleton />
        <MatricesCardSkeleton />
        <MatricesCardSkeleton />
      </div>
      <div className="flex gap-4 justify-between">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <ChartSkeleton />
    </div>
  );
};

export const MatricesCardSkeleton = () => {
  return (
    <div
      className={`bg-zinc-800 py-8 px-6 rounded-2xl flex flex-col gap-4 w-[32%] 2xl:w-1/4 items-center shadow-lg`}
      style={{ height: "90%" }}
    >
      <div style={{ width: "75%" }}>
        <Skeleton height={40} />
      </div>

      <div style={{ width: "20%" }}>
        <Skeleton height={60} />
      </div>
      <div style={{ width: "100%" }}>
        <Skeleton height={4} />
      </div>
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="w-1/2 flex justify-center items-center gap-2 flex-col ">
      <div style={{ width: "40%" }}>
        <Skeleton height={40} />
      </div>

      <div style={{ aspectRatio: "12/7", width: "100%" }}>
        <Skeleton height="90%" width="100%" />
      </div>
    </div>
  );
};
export default StoreDashboardSkeleton;
