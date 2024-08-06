import StoreCard from "./StoreCard";
import useStorListings from "./useStoreListings";
import StoreListingSkeleton from "@/components/Skeleton/StoreListingSkeleton";
const StoreListings = () => {
  const { stores, isLoading } = useStorListings();

  if (isLoading) {
    return (
      <>
        <div className="block sm:hidden">
          <StoreListingSkeleton count={1} />
        </div>
        <div className="hidden sm:block md:hidden">
          <StoreListingSkeleton count={4} />
        </div>
        <div className="hidden md:block lg:hidden">
          <StoreListingSkeleton count={8} />
        </div>
        <div className="hidden lg:block">
          <StoreListingSkeleton count={12} />
        </div>
      </>
    );
  }
  return (
    <section>
      <div className="w-full flex gap-4 flex-wrap my-5">
        {stores?.data?.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
};

export default StoreListings;
