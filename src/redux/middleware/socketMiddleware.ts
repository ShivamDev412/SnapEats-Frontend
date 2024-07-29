// socketMiddleware.ts
import { MiddlewareAPI, Dispatch, Action } from "@reduxjs/toolkit";
import { SOCKET_EVENT } from "@/utils/Constants";
import { io, Socket } from "socket.io-client";
import { addOrderData } from "../slice/storeOrderSlice";

let socket: Socket | null = null;

export const initializeSocket = (
  store: MiddlewareAPI<Dispatch<Action>>
): Socket => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on(SOCKET_EVENT.CONNECT, () => {
      console.log("Socket connected");
    });
    socket.on(SOCKET_EVENT.NEW_ORDER, (order) => {
      store.dispatch(addOrderData(order));
    });
    socket.on(SOCKET_EVENT.DISCONNECT, () => {
      console.log("Socket disconnected");
    });

    socket.on(SOCKET_EVENT.ORDER_STATUS, (status) => {
      console.log("Order status update received:", status);
      // Dispatch an action to the store if needed
      store.dispatch({ type: "ORDER_STATUS_UPDATE", payload: status });
    });
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
