import { FaHeartbeat, FaTemperatureHigh, FaLungs, FaRunning } from "react-icons/fa";
import { BsCapsule } from "react-icons/bs";
import { Mulish } from 'next/font/google';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'], // You can adjust the weights as needed
});
const iconMap = {
  BMI: <FaRunning size={22} className="text-orange-500" />,
  Temperature: <FaTemperatureHigh size={22} className="text-green-500" />,
  BPM: <FaHeartbeat size={22} className="text-red-500" />,
  SpO2: <FaLungs size={22} className="text-blue-500" />,
};

const badgeColorMap = {
  BMI: "bg-orange-100 text-orange-600",
  Temperature: "bg-green-100 text-green-600",
  BPM: "bg-red-100 text-red-600",
  SpO2: "bg-blue-100 text-blue-600",
};

const arcColorMap = {
  BMI: "#e5a657",
  Temperature: "#34d399",
  BPM: "#f87171",
  SpO2: "#60a5fa",
};

const HealthStatCard = ({ label, value, unit, status }) => {
  const icon = iconMap[label] || <BsCapsule size={20} />;
  const badgeClass = badgeColorMap[label] || "bg-gray-100 text-gray-500";
  const arcColor = arcColorMap[label] || "#9ca3af";

  return (
    <div className="w-[200px] h-[260px] bg-white rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.10)] p-4 flex flex-col items-center justify-between">
      {/* Header */}
      <div className="w-full space-y-2 items-center">
        <div className="flex space-x-3">
        <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
        <span className={`${mulish.className} text-gray-700 font-[600] text-base pt-2`}>{label}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-md font-semibold ${badgeClass}`}>
          {status}
        </span>
      </div>

      {/* Circular progress */}
      <div className="relative w-[120px] h-[120px] mt-2 mb-2">
        <svg className="absolute top-0 left-0" width="120" height="120">
          {/* Dashed circle background */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress arc */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke={arcColor}
            strokeWidth="10"
            fill="none"
            strokeDasharray="240"
            strokeDashoffset="60"
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>

        {/* Center Value */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-semibold text-gray-800">{value}</div>
          <div className="text-sm text-gray-500">{unit}</div>
        </div>
      </div>
    </div>
  );
};

export default HealthStatCard;
