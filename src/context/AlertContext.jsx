'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSocket } from "@/context/SocketContext"; // Assuming you have this context
import toast from "react-hot-toast"; // For notifications

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const socket = useSocket(); // Get the socket instance from your SocketContext

  const [healthScore, setHealthScore] = useState(100);
  const [healthData, setHealthData] = useState({})
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  // Determine if an alert should be active based on the health score
  const isAlert = healthScore < 30;

  // Routes where the alert sound/popup should be suppressed
  const silentRoutes = ['/login'];
  const isSilent = silentRoutes.includes(pathname);

  // Logic to determine if the alert sound should play
  const shouldPlaySound = isAlert && !muted && !isSilent;

  // Effect to manage audio playback based on `shouldPlaySound`
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlaySound) {
      audio.loop = true;
      audio.currentTime = 0;
      audio.play().catch(err => console.warn('Playback error:', err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [shouldPlaySound]);

  // Effect to listen for Socket.IO health data updates
  useEffect(() => {
    // Ensure the socket instance and its underlying connection exist
    if (socket && socket.socket) {
      console.log("Setting up Socket.IO listener for patient health data.");

      // Listen for the 'mlResult' event (or whatever event sends patient health data)
      const handleMlResult = (data) => {
        console.log("Socket.IO: Patient health data received", data);
        // Assuming 'data' contains a 'Score' property, similar to the staff side
        if (data && typeof data.Score === 'number') {
          setHealthScore(data.Score);
          setHealthData(data);
          toast.success(`Health data updated! Score: ${data.Score}`); // Provide user feedback
        } else {
          console.warn("Received unexpected data format from mlResult:", data);
          toast.error("Failed to update health data: Invalid format.");
        }
      };

      socket.socket.on("mlResult", handleMlResult);

      // Clean up the event listener when the component unmounts or socket changes
      return () => {
        console.log("Cleaning up Socket.IO listener for patient health data.");
        socket.socket.off("mlResult", handleMlResult);
      };
    }
  }, [socket]); // Re-run if the socket instance changes

  // Determine if the health popup should be shown
  // It should be an alert, not on the dashboard, and not in silent routes
  const showPopup = isAlert && !isSilent;

  return (
    <AlertContext.Provider value={{ healthScore, setHealthScore, muted, setMuted, isAlert }}>
      {children}
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />

      {showPopup && (
        <div className="fixed bottom-50 right-6 z-50 max-w-sm w-[340px] bg-white/90 border border-red-200 backdrop-blur-xl shadow-2xl rounded-2xl px-6 py-5 flex flex-col gap-4 animate-fade-in-up">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-red-700 font-bold text-base">⚠ Critical Health Alert</p>
              <p className="text-sm text-red-500 mt-1">Your health score is critically low.</p>
            </div>
            {healthData && healthData.Alert && <div className="bg-red-600 text-white rounded-full px-4 py-2 font-bold text-lg shadow-md">
              {healthData.Alert} <br/>
              {healthData.Descp}
            </div>}
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2.5 rounded-lg font-semibold transition-all shadow"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
