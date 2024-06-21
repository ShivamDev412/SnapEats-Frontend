import Skeleton from "react-loading-skeleton";
import MenuItemsSkeleton from "./MenuItemsSkeleton";

const MenuSkeleton = () => {
  return (
    <div className="animate-pulse w-11/12 2xl:w-10/12">
      <Skeleton height={36} width={159} className="mb-10" />
      {/* search and add skeleton */}
      <div className="flex gap-4 items-center">
        <div className="md:m-0 w-6/12">
          <Skeleton height={40} />
        </div>
        <Skeleton height={40} width={162} />
      </div>
      {/* categories skeleton */}
      <div className="my-10 flex flex-wrap gap-4">
        <Skeleton className="px-4 py-2" width={100} />
        <Skeleton className="px-4 py-2" width={100} />
        <Skeleton className="px-4 py-2" width={100} />
        <Skeleton className="px-4 py-2" width={100} />
      </div>
      {/* menu items skeleton */}
      <MenuItemsSkeleton count={5} />
    </div>
  );
};

export default MenuSkeleton;
