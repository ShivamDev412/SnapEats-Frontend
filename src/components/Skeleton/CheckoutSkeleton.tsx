import Skeleton from "react-loading-skeleton";

const CheckoutSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col w-full text-zinc-100 gap-4 justify-center items-center">
      <div className="w-full">
        {" "}
        <Skeleton width={200} height={36} />
      </div>

      <div className="bg-zinc-800 rounded-lg p-4 w-full">
        <Skeleton width={150} />
        <div>
          {[1, 2].map((index) => (
            <div key={index} className="mt-4">
              <Skeleton width={200} />
              {[1, 2].map((itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between mt-2"
                >
                  <Skeleton width={120} />
                  <Skeleton width={60} />
                </div>
              ))}
              <div className="flex items-center justify-between mt-2">
                <Skeleton width={80} />
                <Skeleton width={50} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <Skeleton width={120} />
          <Skeleton width={80} />
        </div>
      </div>
      <div className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-4 w-full">
        <Skeleton className="text-2xl font-semibold" width={180} height={32} />
        <div>
          <Skeleton className="text-lg font-semibold" width={160} height={28} />
          <div className="flex flex-col sm:flex-row">
            <Skeleton width="100%" height={24} />
            <Skeleton width="100%" height={24} />
          </div>
          <Skeleton className="mt-2" width={120} height={32} />
        </div>
      </div>
      <div className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-4 w-full">
        <Skeleton className="text-2xl font-semibold" width={180} height={32} />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div>
              <Skeleton width={120} height={24} />
              <Skeleton width={180} height={20} />
            </div>
          </div>
          <Skeleton className="text-sm w-fit" width={120} height={32} />
        </div>
      </div>
      <div className="w-full sm:w-1/3">
        <Skeleton height={50} />
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
