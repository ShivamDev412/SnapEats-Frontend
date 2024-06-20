import Skeleton from "react-loading-skeleton";

interface MenuItemsSkeletonProps {
  count: number;
}

const MenuItemsSkeleton: React.FC<MenuItemsSkeletonProps> = ({ count }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {Array.from({ length: count }).map((_, index) => (
        <MenuItemSkeleton key={index} />
      ))}
    </div>
  );
};

const MenuItemSkeleton: React.FC = () => {
  return (
    <div className="bg-zinc-800 rounded-lg w-[23.5%] 2xl:w-1/5">
      <Skeleton style={{ aspectRatio: "1/1" }} className="rounded-t-lg" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton width="80%" height={28} />
        <Skeleton width="90%" height={20} />
        <Skeleton width="40%" height={28} />
        <Skeleton width="30%" height={20} />
        <Skeleton className="px-2 py-1" width={100} />
      </div>
    </div>
  );
};

export default MenuItemsSkeleton;
