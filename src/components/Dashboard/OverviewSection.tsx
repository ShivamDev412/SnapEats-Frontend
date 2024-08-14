import { useGetOverviewMatricesQuery } from "@/redux/slice/api/store/dashboardSlice";
import MatricesCard from "./MatricesCard";
import { MatricesCardSkeleton } from "../Skeleton/StoreDashboardSkeleton";

const OverviewSection = () => {
  const { data: overviewMatricesData, isLoading } =
    useGetOverviewMatricesQuery();
  if (isLoading)
    return (
      <div className="flex gap-4 flex-wrap">
        <MatricesCardSkeleton />
        <MatricesCardSkeleton />
        <MatricesCardSkeleton />
      </div>
    );
  return (
    <section className="flex gap-4 flex-wrap">
      <MatricesCard
        title={"Total Orders"}
        value={overviewMatricesData?.data?.numberOfOrders || 0}
        index={0}
      />
      <MatricesCard
        title={"Total Revenue ($)"}
        value={Math.ceil(overviewMatricesData?.data?.totalRevenue || 0)}
        index={1}
      />
      <MatricesCard
        title={"Average Order Value ($)"}
        value={Math.ceil(overviewMatricesData?.data?.averageOrderValue || 0)}
        index={2}
      />
    </section>
  );
};

export default OverviewSection;
