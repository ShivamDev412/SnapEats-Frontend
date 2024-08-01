import { useEffect, useState, useRef } from "react";
import {
  OrderType,
  useGetOrdersQuery,
} from "@/redux/slice/api/user/orderSlice";

const useOrders = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [orders, setOrders] = useState<OrderType>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { data: ordersData, isLoading } = useGetOrdersQuery(pageNumber, {
    refetchOnMountOrArgChange: true,
  });
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (ordersData?.data) {
      setPageNumber(ordersData.data.page);
      setTotalCount(ordersData.data.totalCount);
      pageNumber === 1
        ? setOrders(ordersData.data.orders)
        : setOrders([...orders, ...ordersData.data.orders]);
   
    }
  }, [ordersData, pageNumber]);

  useEffect(() => {
    return () => {
      setPageNumber(1);
      setOrders([]);
      setTotalCount(0);
    };
  }, []);

  const loadMoreOrders = () => {
    if (!isLoading && orders.length < totalCount) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Waiting for confirmation from the store";
      case "CONFIRMED":
        return "Order confirmed by the store";
      case "PREPARING":
        return "Order is being prepared";
      case "DELIVERED":
        return "Order has been delivered successfully";
      case "CANCELED":
        return "Order has been cancelled";
      default:
        return status;
    }
  };

  return { orders, loadMoreOrders, handleStatus, isLoading, totalCount };
};

export default useOrders;
