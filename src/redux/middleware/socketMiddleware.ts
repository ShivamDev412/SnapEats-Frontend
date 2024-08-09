// socketMiddleware.ts
import { MiddlewareAPI, Dispatch, Action } from "@reduxjs/toolkit";
import { SOCKET_EVENT } from "@/utils/Constants";
import { io, Socket } from "socket.io-client";
import { addOrderData } from "../slice/storeOrderSlice";
import { setOrderStatus } from "../slice/userOrderSlice";
// import moment from "moment-timezone";

let socket: Socket | null = null;

export const initializeSocket = (
  store: MiddlewareAPI<Dispatch<Action>>
): Socket => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on(SOCKET_EVENT.CONNECT, () => {});
    socket.on(SOCKET_EVENT.NEW_ORDER, (order) => {
      store.dispatch(addOrderData(order));
    });
    socket.on(SOCKET_EVENT.DISCONNECT, () => {});

    socket.on(
      SOCKET_EVENT.ORDER_STATUS,
      (order: {
        status: string;
        orderId: string;
        storeName: string;
        estimatedDeliveryTime: {
          minTime: string;
          maxTime: string;
        };
      }) => {
        const orderData = {
          status: order.status,
          orderId: order.orderId,
          storeName: order.storeName,
          // estimatedDeliveryTime: order.estimatedDeliveryTime,
        };
        store.dispatch(setOrderStatus(orderData));
      }
    );
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const socketMiddleware = (store: MiddlewareAPI<Dispatch<Action>>) => {
  return (next: Dispatch<Action>) => (action: Action) => {
    initializeSocket(store);
    return next(action);
  };
};
