import { t } from "i18next";
import useOrders from "./useOrders";
import useInfiniteScroll from "@/Hooks/useInfiniteScroll";
import { OrderItems } from "@/components/Orders";
import { StoreOrderSkeleton } from "@/components/Skeleton";

const Orders = () => {
  const { orders, loadMoreOrders, isLoading, totalCount } = useOrders();
  const lastOrderElementRef = useInfiniteScroll(loadMoreOrders);
  if(isLoading && orders.length < totalCount) return <StoreOrderSkeleton />;
  return (
    <section className="flex flex-col h-full w-10/12 flex-1 text-zinc-100">
      <h2 className="text-3xl font-bold my-6">{t("orders")}</h2>

      <section className="flex flex-col space-y-4">
        {orders.map((order, index) => (
          <div
            className="p-4 rounded-lg bg-zinc-800"
            ref={
              orders.length === index + 1 ? (lastOrderElementRef as any) : null
            }
          >
            <OrderItems order={order} />
          </div>
        ))}
      </section>
    </section>
  );
};

export default Orders;
