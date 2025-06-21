'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // const getToken = useCallback(() => {
  //   return localStorage.getItem('authToken');
  // }, []);
  const getToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }, []);

  // const login = useCallback(async (credentials) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(credentials),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Login failed');
  //     }

  //     const data = await response.json();
  //     const { user, token } = data;

  //     localStorage.setItem('authToken', token);
  //     setUser(user);
  //     router.push('/');

  //   } catch (error) {
  //     console.error('Login error:', error);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      console.log("Mock login with:", credentials);

      // Mock user data as if login succeeded
      const mockUser = {
        id: "demo123",
        name: "Jubaraj",
        bmi: 22.5,
      };

      // Skip API call and use dummy values
      localStorage.setItem("authToken", "mock-token");
      setUser(mockUser);
      router.push("/dashboard"); // or just '/' if that’s your main dashboard

    } catch (error) {
      console.error("Mock Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
  }, []);

  // useEffect(() => {
  //   async function validateUserSession() {
  //     setIsLoading(true);
  //     const storedToken = getToken();

  //     if (!storedToken) {
  //       setUser(null);
  //       setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/me`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${storedToken}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         // Handle HTTP error (e.g., 401 Unauthorized due to expired token)
  //         console.warn(`Server responded with status ${response.status} when fetching user data.`);
  //         localStorage.removeItem("authToken"); // Clear invalid token
  //         setUser(null);
  //         setIsLoading(false);
  //         return;
  //       }

  //       const data = await response.json();

  //       if (data.isValid) {
  //         setUser(data.user);
  //       } else {
  //         console.log("Server indicated invalid session:", data.error);
  //         localStorage.removeItem("authToken");
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error("Failed to validate session:", error);
  //       localStorage.removeItem("authToken");
  //       setUser(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   validateUserSession();
  // }, [getToken]);

  const isAuthenticated = !!user;

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};