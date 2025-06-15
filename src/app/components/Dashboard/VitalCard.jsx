'use client';
import HealthStatCard from '../Dashboard/HealthStatCard';

export default function VitalCard() {
  const stats = [
    { label: "BMI", value: "24.9", unit: "", status: "Healthy" },
    { label: "Temperature", value: "98.6", unit: "°F", status: "Normal" },
    { label: "BPM", value: "76", unit: "BPM", status: "Stable" },
    { label: "SpO2", value: "97", unit: "%", status: "Good" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50">
      {stats.map((stat, i) => (
        <HealthStatCard key={i} {...stat} />
      ))}
    </div>
  );
}
