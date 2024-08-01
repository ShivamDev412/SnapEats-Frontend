import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface StoreListingSkeletonProps {
  count: number;
}

const StoreListingSkeleton: React.FC<StoreListingSkeletonProps> = ({
  count,
}) => {
  return (
    <div className="w-full flex gap-4 flex-wrap my-5">
      {Array.from({ length: count }).map((_, index) => (
        <StoreCardSkeleton key={index} />
      ))}
    </div>
  );
};

const StoreCardSkeleton: React.FC = () => {
  return (
    <div className="w-full sm:w-[48.5%] xl:w-[24%] rounded-sm flex flex-col gap-2 bg-zinc-800 relative">
      <Skeleton
        style={{ aspectRatio: "1 / 0.55" }}
        className="rounded-t-sm w-full"
      />
      <div className="flex flex-col gap-1 px-3 pb-2">
        <div className="flex justify-between items-center">
          <Skeleton width={200} height={24} />
        </div>
        <p className="text-[0.9rem]">
          <Skeleton width={120} />
        </p>
        <div className="flex items-center gap-2 text-zinc-300 text-[0.9rem]">
          <Skeleton width={80} />
          <span className="bg-zinc-200 h-[3px] w-[3px] rounded-full"></span>
          <Skeleton width={60} />
        </div>
      </div>
    </div>
  );
};

export default StoreListingSkeleton;