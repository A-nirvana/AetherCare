"use client";

import { use, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {Header, HealthScore, VitalCard, ClimateCard, ECGCard, DoctorTipsWeb, BotpressChat} from "@/components/Dashboard"
import { getLastObjectByKey } from "@/lib/utils";
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const socket = useSocket();
  const userData = useUser();
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SOCKET_URL}/api/rtdb/all`
        );
        const data = res.data.data.sensorData;
        const latestData = getLastObjectByKey(data);
        setHealthData(latestData);
      } catch (err) {
        console.error("Failed to fetch health data:", err);
        setError("Failed to load health data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Use useMemo to re-calculate stats only when healthData changes
  const stats = useMemo(() => {
    if (!healthData) {
      return [];
    }
    const getBPMStatus = (bpm) => {
      if (bpm >= 60 && bpm <= 100) return "Normal";
      if (bpm < 60) return "Low";
      return "High";
    };

    const getSpO2Status = (spo2) => {
      if (spo2 >= 95) return "Good";
      if (spo2 >= 90 && spo2 < 95) return "Warning";
      return "Critical";
    };

    const getTempStatus = (tempCelsius) => {
        const tempFahrenheit = (tempCelsius * 9/5) + 32;
        if (tempFahrenheit >= 97.0 && tempFahrenheit <= 99.0) return "Normal";
        if (tempFahrenheit > 99.0) return "Elevated";
        return "Low";
    };

    return [
      // { label: "BMI", value: userData.user.bmi?userData.user.bmi:"--", unit: "", status: "Healthy" },
      { label: "BMI", value: userData?.user?.bmi ?? "--", unit: "", status: "Healthy" },
      { label: "Temperature", value: healthData.Temperature ? (healthData.Temperature * 9/5 + 32).toFixed(1) : "--", unit: "°F", status: getTempStatus(healthData.Temperature) }, // Convert C to F
      { label: "BPM", value: healthData.BPM, unit: "BPM", status: getBPMStatus(healthData.BPM) },
      { label: "SpO2", value: healthData.SpO2, unit: "%", status: getSpO2Status(healthData.SpO2) },
    ];
  }, [healthData, userData]);


  useEffect(() => {
    if (!socket || !socket.isConnected) return;
    socket.socket.on("sensorData", (obj) => {
      console.log("Received health data update:", obj);
      setHealthData(obj.data);
    });
    return () => {
      socket.socket.off("healthDataUpdate");
    };
  }, [socket]);

  return (
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Header />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4">
            <HealthScore />
            <VitalCard stats={stats} isLoading={isLoading} error={error} />
          </div>
            <ClimateCard />
          </div>
          <div className="w-full lg:w-1/3">
      </div>
      {stats.length && <DoctorTipsWeb bmi={stats[0].value} temperature={stats[1].value} bpm={stats[2].value} spo2={stats[3].value} />}
      <BotpressChat />
      </div>
  );
}
