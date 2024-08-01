import StoreCard from "./StoreCard";
import useStorListings from "./useStoreListings";
import StoreCardSkeleton from "../Skeleton/StoreListingSkeleton";
const StoreListings = () => {
  const { stores, isLoading } = useStorListings();
  if (isLoading) return <StoreCardSkeleton count={2} />;
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
