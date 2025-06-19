'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the shape of the context value
// interface ISocketContext {
//   socket: Socket | null;
//   isConnected: boolean;
// }

// Create the context with a default null value
const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

// Create a custom hook for easy access to the context
export const useSocket = () => {
  return useContext(SocketContext);
};

// Create the provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // This code runs only on the client side
    // Use your actual server URL from environment variables
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      // Add any connection options here
      // e.g., for user authentication with a query
      // query: { userId: 'some-user-id' }
    });

    socketInstance.on('connect', () => {
      console.log('Socket.IO: Connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket.IO: Disconnected');
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Cleanup on component unmount
    return () => {
      console.log('Socket.IO: Disconnecting');
      socketInstance.disconnect();
    };
  }, []); // The empty dependency array ensures this runs only once

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};