import StoreCard from "./StoreCard";
import useStorListings from "./useStoreListings";

const StoreListings = () => {
  const { stores, isLoading } = useStorListings();
  if (isLoading) return <p>Loading...</p>;
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
