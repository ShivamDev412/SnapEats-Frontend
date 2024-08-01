import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface StoreCategoriesSkeletonProps {
  count: number;
}

const StoreCategoriesSkeleton: React.FC<StoreCategoriesSkeletonProps> = ({
  count,
}) => {
  return (
    <div className="relative flex gap-2 items-center">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton className="px-4 py-2" width={100} key={index} />
      ))}
    </div>
  );
};

export default StoreCategoriesSkeleton;