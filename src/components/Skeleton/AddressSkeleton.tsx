import Skeleton from "react-loading-skeleton";

const AddressSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col h-full w-full flex-1">
      <div className="flex justify-between">
        <Skeleton width={180} height={40} />
        <Skeleton width={150} height={40} />
      </div>
      <div className="flex gap-4 mt-10 flex-wrap flex-1 h-full">
        <AddressCardSkeleton />
        <AddressCardSkeleton />
        <AddressCardSkeleton />
      </div>
    </div>
  );
};
const AddressCardSkeleton = () => {
  return (
    <div className="w-full lg:w-[49%] 2xl:w-[32.5%] rounded-lg p-4 shadow-md shadow-zinc-600 bg-zinc-900   flex flex-col justify-between gap-4 h-[2in]">
      <div className="flex items-start justify-between">
        <div className="w-10/12 lg:w-8/12">
          <Skeleton count={2} />
        </div>
        <div className="rounded-[25px] flex gap-1 items-center justify-center">
          <Skeleton width={70} />
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton height={30} width={34} />
        <div className="flex gap-2">
          <Skeleton height={24} width={34} />
          <Skeleton height={24} width={34} />
        </div>
      </div>
    </div>
  );
};

export default AddressSkeleton;
