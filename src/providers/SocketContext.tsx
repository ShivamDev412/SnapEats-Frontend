// SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket, disconnectSocket } from "@/redux/middleware/socketMiddleware";
import store from "@/redux/Store";

interface SocketContextType {
  socket: Socket | null;
}

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = initializeSocket(store);
    setSocket(newSocket);

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
