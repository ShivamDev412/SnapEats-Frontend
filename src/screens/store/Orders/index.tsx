import { t } from "i18next";
import useOrders from "./useOrders";
import useInfiniteScroll from "@/Hooks/useInfiniteScroll";
import { OrderItems } from "@/components/Orders";
import { StoreOrderSkeleton } from "@/components/Skeleton";
import { LegacyRef } from "react";
import NoDataFound from "@/components/NoDataFound";

const Orders = () => {
  const { orders, loadMoreOrders, isFetching, totalCount } = useOrders();
  const lastOrderElementRef = useInfiniteScroll(loadMoreOrders);
  if (isFetching) return <StoreOrderSkeleton />;
  return (
    <section className="flex flex-col h-full w-10/12 flex-1 text-zinc-100">
      <h2 className="text-3xl font-bold my-6">{t("orders")}</h2>

      <section className="flex flex-col space-y-4">
        {orders.map((order, index) => (
          <div
            className="p-4 rounded-lg bg-zinc-800"
            ref={
              orders.length === index + 1
                ? (lastOrderElementRef as LegacyRef<HTMLDivElement> | undefined)
                : null
            }
          >
            <OrderItems order={order} type="store"/>
          </div>
        ))}
      </section>
      <div className="flex flex-1">
        {orders.length === 0 && (
          <NoDataFound message={"You haven't received any order"} />
        )}
      </div>
      {isFetching && orders.length < totalCount && (
        <div className="text-center">
          <p>{t("loading")}</p>
        </div>
      )}
    </section>
  );
};

export default Orders;
