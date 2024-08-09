import { t } from "i18next";
import useOrders from "./useOrders";
import useInfiniteScroll from "@/Hooks/useInfiniteScroll";
import { OrderItems } from "@/components/Orders";
import { UserOrderSkeleton } from "@/components/Skeleton";
import { LegacyRef } from "react";
import NoDataFound from "@/components/NoDataFound";

const Orders = () => {
  const { orders, loadMoreOrders, isFetching, totalCount } = useOrders();
  const lastOrderElementRef = useInfiniteScroll(loadMoreOrders);
  if (isFetching && orders.length < totalCount) return <UserOrderSkeleton />;
  return (
    <section className="flex flex-col min-h-full w-full flex-1 text-zinc-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{t("orders")}</h2>
      </div>
      {orders.length > 0 && (
        <section className="flex flex-col space-y-4">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="p-4 rounded-lg bg-zinc-800"
              ref={
                orders.length === index + 1
                  ? (lastOrderElementRef as
                      | LegacyRef<HTMLDivElement>
                      | undefined)
                  : null
              }
            >
              <OrderItems order={order} />
            </div>
          ))}
        </section>
      )}
      <div className="flex flex-1">
        {orders.length === 0 && (
          <NoDataFound message={"You haven't ordered anythings yet"} />
        )}
      </div>
    </section>
  );
};

export default Orders;
