import {
  OverviewSection,
  OrderStatsSection,
  MostOrderedItem,
  RevenueTrendsSection,
} from "@/components/Dashboard";
const Dashboard = () => {
  return (
    <div className="w-11/12 flex flex-col gap-6">
      <OverviewSection />
      <section className="flex justify-between">
        <OrderStatsSection />
        <RevenueTrendsSection />
     
      </section>
      <MostOrderedItem />
    </div>
  );
};

export default Dashboard;
