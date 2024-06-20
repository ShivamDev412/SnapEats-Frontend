import Skeleton from "react-loading-skeleton";

const ItemDetailSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col w-11/12 2xl:w-10/12 mt-10 gap-4">
      <Skeleton className="h-10 w-10" />
      <div className="flex gap-4">
        <div className="w-5/12 h-ful">
          <Skeleton style={{ aspectRatio: "1/1" }} />
        </div>

        <div className="flex flex-col gap-4">
          <PrimaryDetailSkeleton />
          <div className="flex gap-2">
            <Skeleton width={70} height={40} />
            <Skeleton width={70} height={40} />
          </div>
          <div>
            <Skeleton width={80} height={28} />
            <div className="flex flex-col gap-2 mt-2">
              <OptionSkeleton />
              <OptionSkeleton />
              <OptionSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrimaryDetailSkeleton: React.FC = () => {
  return (
    <div className="flex gap-3 flex-col">
      <Skeleton height={40} width="75%" />
      <Skeleton height={28} width="80%" />
      <Skeleton height={32} width="45%" />
      <div className="flex gap-4 flex-wrap items-center">
        <Skeleton height={28} width={100} />
        <Skeleton height={28} width={100} />
        <Skeleton height={28} width={100} />
      </div>
    </div>
  );
};

const OptionSkeleton: React.FC = () => {
  return (
    <div className="ml-2">
      <Skeleton width={100} height={30} className="mb-2" />
      <div className="flex gap-2 ml-2 flex-wrap">
        <Skeleton width={100} height={28} />
        <Skeleton width={100} height={28} />
        <Skeleton width={100} height={28} />
      </div>
    </div>
  );
};

export default ItemDetailSkeleton;
