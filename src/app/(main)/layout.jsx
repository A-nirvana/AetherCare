"use client";

import Sidebar from "@/components/Sidebar";
import { SocketProvider } from "@/context/SocketContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullPageLoader from "../loading";

export default function MainLayout({ children }) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user.isLoading && !user.isAuthenticated) {
      router.push("/login");
    }
  }, [user.isLoading, user.isAuthenticated, router]);
  if (user.isLoading) {
    return <FullPageLoader/>
  }
  if (!user.isAuthenticated) {
    return (<FullPageLoader />);
  }
  return (
    <div className="flex bg-green-50">
      <Sidebar />
      <SocketProvider>{children}</SocketProvider>
    </div>
  );
}
