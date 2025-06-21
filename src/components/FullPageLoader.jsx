"use client";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import loadingAnimation from "@/assets/loading.json";

const FullPageLoader = () => {
  const animationRef = useRef();

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.setSpeed(1.98); // ✅ 3x faster
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <Lottie
        lottieRef={animationRef}
        animationData={loadingAnimation}
        loop
        autoplay
        className="w-64 h-64"
      />
    </div>
  );
};

export default FullPageLoader;
