"use client";
import HealthStatCard from "../Dashboard/HealthStatCard";

export default function VitalCard({stats, isLoading, error}) {
  
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
