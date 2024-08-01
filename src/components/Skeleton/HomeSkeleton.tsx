import StoreCategoriesSkeleton from "./StoreCategoriesSkeleton";
import StoreListingSkeleton from "./StoreListingSkeleton";

const HomeSkeleton = () => {
  return (
    <section className="w-full animate-pulse">
      <div className="block sm:hidden">
        <StoreCategoriesSkeleton count={3} />
        <StoreListingSkeleton count={1} />
      </div>
      <div className="hidden sm:block">
        <StoreCategoriesSkeleton count={4} />
        <StoreListingSkeleton count={4} />
      </div>
    </section>
  );
};

export default HomeSkeleton;