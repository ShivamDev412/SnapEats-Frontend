import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderSkeleton = () => (
  <div className="p-4 rounded-lg bg-zinc-800">
    <Skeleton height={32} width={200} className="mb-2" />
    <Skeleton height={15} width={150} className="mb-3" />
    <Skeleton height={24} width={170} className="mb-2" />
    <Skeleton height={24} width={250} className="mb-3" />
    <Skeleton height={32} width={150} className="mb-2" />
    <div className="flex items-start space-x-4">
      <Skeleton height={80} width={80} className="mb-2  rounded-lg" />
      <div className="flex flex-col">
        <Skeleton height={28} width={100} className="mb-2" />
        <Skeleton height={24} width={100} className="mb-2" />
      </div>
    </div>
  </div>
);

const UserOrderSkeleton = () => (
  <section className="animate-pulse flex flex-col h-full w-full flex-1 text-zinc-1000">
    <header className="flex justify-between items-center mb-4">
      <Skeleton width={150} height={30} />
    </header>

    <section className="flex flex-col space-y-4">
      <OrderSkeleton />
      <OrderSkeleton />
    </section>
  </section>
);

export default UserOrderSkeleton;