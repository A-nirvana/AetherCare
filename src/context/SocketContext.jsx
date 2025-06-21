'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // useEffect(() => {
  //   const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  //   });

  //   socketInstance.on('connect', () => {
  //     console.log('Socket.IO: Connected');
  //     setIsConnected(true);
  //   });

  //   socketInstance.on('disconnect', () => {
  //     console.log('Socket.IO: Disconnected');
  //     setIsConnected(false);
  //   });

  //   setSocket(socketInstance);

  //   return () => {
  //     console.log('Socket.IO: Disconnecting');
  //     socketInstance.disconnect();
  //   };
  // }, []);

  // return (
  //   <SocketContext.Provider value={{ socket, isConnected }}>
  //     {children}
  //   </SocketContext.Provider>
  // );
  return (
    <SocketContext.Provider value={{ socket: null, isConnected: false }}>
      {children}
    </SocketContext.Provider>
  );
};