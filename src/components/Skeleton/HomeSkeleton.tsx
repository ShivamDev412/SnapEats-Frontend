import StoreCategoriesSkeleton from "./StoreCategoriesSkeleton";
import StoreListingSkeleton from "./StoreListingSkeleton";

const HomeSkeleton = () => {
  return (
    <section className="w-full animate-pulse">
      <div className="block sm:hidden">
        <StoreCategoriesSkeleton count={3} />
        <StoreListingSkeleton count={1} />
      </div>
      <div className="hidden sm:block md:hidden">
        <StoreCategoriesSkeleton count={6} />
        <StoreListingSkeleton count={4} />
      </div>
      <div className="hidden md:block lg:hidden">
        <StoreCategoriesSkeleton count={6} />
        <StoreListingSkeleton count={8} />
      </div>
      <div className="hidden lg:block">
        <StoreCategoriesSkeleton count={8} />
        <StoreListingSkeleton count={12} />
      </div>
    </section>
  );
};

export default HomeSkeleton;
