/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAcceptOrderMutation,
  useRejectOrderMutation,
} from "@/redux/slice/api/store/orderSlice";
import { removeOrderData } from "@/redux/slice/storeOrderSlice";
import { RootState } from "@/redux/Store";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
// import StoreNotificationSound from "@/assets/sounds/store_notification.mp3";
import { useDispatch, useSelector } from "react-redux";

const useNewOrderPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { popUpOrderData } = useSelector(
    (state: RootState) => state.storeOrder
  );
  const dispatch = useDispatch();

  // const playNotificationSound = () => {
  //   const audio = new Audio(StoreNotificationSound);
  //   audio.play().catch((error) => console.error("Error playing audio:", error));
  // };
  useEffect(() => {
    // playNotificationSound();
    setIsVisible(true);
  }, []);
  const [acceptOrder] = useAcceptOrderMutation();
  const [rejectOrder] = useRejectOrderMutation();
  const handleOrder = async (orderId: string, type: "accept" | "reject") => {
    try {
      const res =
        type === "accept"
          ? await acceptOrder(orderId).unwrap()
          : await rejectOrder(orderId).unwrap();
      if (res.success) {
        Toast(res.message, "success");
        dispatch(removeOrderData(orderId));
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
    }
  };
  return {
    isVisible,
    handleOrder,
    popUpOrderData,
  };
};

export default useNewOrderPopUp;
