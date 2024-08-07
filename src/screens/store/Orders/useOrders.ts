import { useEffect, useState, useRef } from "react";
import { useGetStoreOrdersQuery } from "@/redux/slice/api/store/orderSlice";
import { OrderType } from "@/redux/slice/api/user/orderSlice";

const useOrders = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { data: ordersData, isFetching } = useGetStoreOrdersQuery(pageNumber, {
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
  }, [ordersData, pageNumber, orders]);

  useEffect(() => {
    return () => {
      setPageNumber(1);
      setOrders([]);
      setTotalCount(0);
    };
  }, []);

  const loadMoreOrders = () => {
    if (!isFetching && orders.length < totalCount) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return { orders, loadMoreOrders, isFetching, totalCount };
};

export default useOrders;
