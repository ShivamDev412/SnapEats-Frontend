import React from "react";
import PrimaryInfo from "./PrimaryInfo";
import OrderItemsComponent from "./OrderItemsComponent";
import { OrderType } from "@/redux/slice/api/user/orderSlice";

const OrderItems: React.FC<{ order: OrderType; type: "store" | "user" }> = ({
  order,
  type = "user",
}) => {
  return (
    <>
      <PrimaryInfo
        name={(order?.user?.name || order?.store?.name) as string}
        createdAt={order.createdAt}
        totalAmount={order.totalAmount}
        status={order.status}
        type={type}
      />
      <OrderItemsComponent orderItems={order.items} />
    </>
  );
};

export default OrderItems;
