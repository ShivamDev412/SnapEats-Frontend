import { t } from "i18next";
import useOrders from "./useOrders";
import useInfiniteScroll from "@/Hooks/useInfiniteScroll";
import { OrderItems } from "@/components/Orders";

const Orders = () => {
  const { orders, loadMoreOrders, isFetching, totalCount } =
    useOrders();
  const lastOrderElementRef = useInfiniteScroll(loadMoreOrders);
  return (
    <section className="flex flex-col h-full w-full flex-1 text-zinc-100">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{t("orders")}</h2>
      </header>
      <section className="flex flex-col space-y-4">
        {orders.map((order, index) => (
          <div key={order.id}
            className="p-4 rounded-lg bg-zinc-800"
            ref={
              orders.length === index + 1 ? (lastOrderElementRef as any) : null
            }
          >
            <OrderItems order={order} />
          </div>
        ))}
        {isFetching && orders.length < totalCount && (
          <div className="text-center">
            <p>{t("loading")}</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default Orders;
