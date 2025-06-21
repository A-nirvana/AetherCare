"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FullPageLoader from "../components/FullPageLoader";

export default function LayoutWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Initial mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // shorter load time
    return () => clearTimeout(timer);
  }, []);

  // On every route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000); // show loader for 1 sec on route change
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);
  }, [loading]);

  return <>{loading ? <FullPageLoader /> : children}</>;
}
