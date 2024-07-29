import React from "react";
import PrimaryInfo from "./PrimaryInfo";
import OrderItemsComponent from "./OrderItemsComponent";

const OrderItems: React.FC<{ order: any }> = ({ order }) => {
  return (
    <>
      <PrimaryInfo
        name={order?.user?.name || order?.store?.name}
        createdAt={order.createdAt}
        totalAmount={order.totalAmount}
        status={order.status}
      />
      <OrderItemsComponent orderItems={order.items} />
    </>
  );
};

export default OrderItems;
