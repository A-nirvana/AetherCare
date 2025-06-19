"use client";
import { useSocket } from "@/context/SocketContext";
import HealthStatCard from "../Dashboard/HealthStatCard";
import { use, useEffect, useMemo, useState } from "react";
import axios from "axios";

function getLastObjectByKey(obj) {
  if (!obj || Object.keys(obj).length === 0) {
    return null; // Handle empty or null object
  }

  const keys = Object.keys(obj);
  keys.sort(); // Sorts keys lexicographically (Firebase push keys are designed for this)

  const lastKey = keys[keys.length - 1];
  return obj[lastKey];
}

export default function VitalCard() {
  const socket = useSocket();
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

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

  }, []); // Empty dependency array means this runs once on mount

  // Use useMemo to re-calculate stats only when healthData changes
  const stats = useMemo(() => {
    if (!healthData) {
      return [
        { label: "BMI", value: "--", unit: "", status: "N/A" },
        { label: "Temperature", value: "--", unit: "°F", status: "N/A" },
        { label: "BPM", value: "--", unit: "BPM", status: "N/A" },
        { label: "SpO2", value: "--", unit: "%", status: "N/A" },
      ];
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
      { label: "BMI", value: "24.9", unit: "", status: "Healthy" },
      { label: "Temperature", value: healthData.DHT_Temp ? (healthData.DHT_Temp * 9/5 + 32).toFixed(1) : "--", unit: "°F", status: getTempStatus(healthData.DHT_Temp) }, // Convert C to F
      { label: "BPM", value: healthData.BPM, unit: "BPM", status: getBPMStatus(healthData.BPM) },
      { label: "SpO2", value: healthData.SpO2, unit: "%", status: getSpO2Status(healthData.SpO2) },
      // { label: "Humidity", value: healthData.Humidity, unit: "%", status: healthData.Humidity > 80 ? "High" : "Normal" },
      // { label: "MPU Temp", value: healthData.MPU_Temp, unit: "°C", status: healthData.MPU_Temp > 40 ? "High" : "Normal" },
    ];
  }, [healthData]); 

  
  useEffect(() => {
    if (!socket || !socket.isConnected) return;
    socket.socket.on("sensorData", (data) => {
      console.log("Received health data update:", data);
    });
    // Cleanup on unmount
    return () => {
      socket.socket.off("healthDataUpdate");
    };
  }, [socket]);
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading health data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50">
      {stats.map((stat, i) => (
        <HealthStatCard key={i} {...stat} />
      ))}
    </div>
  );
}
