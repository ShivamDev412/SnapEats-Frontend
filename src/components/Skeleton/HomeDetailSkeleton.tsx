import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import default skeleton styles
import StorePlaceholderImage from "@/assets/store_placeholder.webp";
import StoreCategoriesSkeleton from "./StoreCategoriesSkeleton";
const HomeDetailSkeleton = () => {
  return (
    <section className="animate-pulse">
      {/* BannerProfileSection Skeleton */}
      <section className="flex flex-wrap flex-col sm:flex-row gap-2 sm:gap-5 border-b border-zinc-700 pb-4">
        <div className="w-full sm:w-1/3">
          <img
            src={StorePlaceholderImage}
            alt="store-image-placeholder"
            className="h-full w-full rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-3 xl:gap-4">
          <Skeleton width="70%" height={40} />

          <Skeleton width="80%" height={20} />

          <Skeleton width={140} height={32} />

          <div className="flex gap-2 items-center">
            <Skeleton width={120} height={24} />
            <Skeleton width={8} height={8} className="bg-white rounded-full" />
            <Skeleton width={100} height={24} />
          </div>
        </div>
      </section>

      {/* Placeholder for MenuCategories */}
      <div className="mt-5">
        <StoreCategoriesSkeleton count={3} />
      </div>

      {/* Placeholder for MenuItemsSection */}
      <div className="block sm:hidden">
        <MenuItemsSectionSkeleton />
      </div>
      <div className="hidden sm:block md:hidden">
        <MenuItemsSectionSkeleton />
        <MenuItemsSectionSkeleton />
      </div>
      <div className="hidden md:block lg:hidden">
        <MenuItemsSectionSkeleton />
        <MenuItemsSectionSkeleton />
        <MenuItemsSectionSkeleton />
      </div>
      <div className="hidden lg:block">
        <MenuItemsSectionSkeleton />
        <MenuItemsSectionSkeleton />
        <MenuItemsSectionSkeleton />
        <MenuItemsSectionSkeleton />
      </div>
    </section>
  );
};

const MenuItemsSectionSkeleton = () => {
  return (
    <section>
      <section className="my-8">
        <Skeleton width={180} height={32} />
        <div className="flex flex-wrap gap-2 mt-5">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="flex w-full sm:w-[49%] lg:w-1/3 my-1 xl:my-0 xl:w-1/3 gap-2 bg-zinc-800 p-2 rounded-lg"
            >
              <Skeleton width="1in" height="1in" className="rounded-lg" />
              <div className="flex flex-col gap-2 items-start">
                <Skeleton width={120} height={24} />
                <Skeleton width={180} height={20} className="text-sm" />
                <div className="flex gap-2 items-center">
                  <Skeleton width={50} height={20} />
                  <Skeleton width={50} height={20} />
                  <Skeleton width={60} height={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default HomeDetailSkeleton;
