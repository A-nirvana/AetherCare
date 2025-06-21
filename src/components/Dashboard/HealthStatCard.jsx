import {
  FaHeartbeat,
  FaTemperatureHigh,
  FaLungs,
  FaRunning,
} from "react-icons/fa";
import { BsCapsule } from "react-icons/bs";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const iconMap = {
  BMI: <FaRunning size={26} className="text-yellow-500" />,
  Temperature: <FaTemperatureHigh size={26} className="text-green-500" />,
  BPM: <FaHeartbeat size={26} className="text-red-500" />,
  SpO2: <FaLungs size={26} className="text-blue-500" />,
};

const badgeColorMap = {
  BMI: "bg-yellow-200 text-yellow-800",
  Temperature: "bg-green-200 text-green-800",
  BPM: "bg-red-200 text-red-800",
  SpO2: "bg-blue-200 text-blue-800",
};

const cardBgMap = {
  BMI: "from-yellow-50 to-white",
  Temperature: "from-green-50 to-white",
  BPM: "from-red-50 to-white",
  SpO2: "from-blue-50 to-white",
};

const arcColorMap = {
  BMI: "#facc15",        // Yellow
  Temperature: "#10b981",// Green
  BPM: "#ef4444",        // Red
  SpO2: "#3b82f6",       // Blue
};

const HealthStatCard = ({ label, value, unit, status }) => {
  const icon = iconMap[label] || <BsCapsule size={24} />;
  const badgeClass = badgeColorMap[label] || "bg-gray-100 text-gray-500";
  const bgGradient = cardBgMap[label] || "from-gray-100 to-white";
  const maxValues = {
    BPM: 150,
    SpO2: 102,
    Temperature: 120,
    BMI: 40,
  };

  const maxValue = maxValues[label] || 100;
  const normalizedValue = Math.min(Math.max(0, parseFloat(value)), maxValue);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = normalizedValue / maxValue;
  const strokeDashoffset = circumference - progressPercentage * circumference;

  const goodStatus = ["Normal", "Healthy", "Good", "Stable"];
  const warningStatus = ["Warning", "Elevated", "Low"];

  const arcColor =
  ["Normal", "Healthy", "Good", "Stable"].includes(status)
    ? arcColorMap[label] || "#9CA3AF"
    : ["Warning", "Elevated", "Low"].includes(status)
    ? "#F59E0B"
    : "#DC2626";

  return (
    <div
      className={`w-[200px] h-[280px] bg-gradient-to-br ${bgGradient} rounded-xl shadow-lg p-4 flex flex-col items-center justify-between hover:scale-[1.025] transition-transform duration-300 backdrop-blur-sm bg-opacity-80 border border-white/20`}
    >
      {/* Header */}
      <div className="w-full space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow-md">{icon}</div>
          <span className={`${mulish.className} font-[800] text-lg tracking-wide`}>
            {label}
          </span>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-md font-semibold inline-block ${badgeClass}`}
        >
          {status}
        </span>
      </div>

      {/* Circular progress */}
      <div className="relative w-[130px] h-[130px] mt-2 mb-3">
        <svg className="absolute top-0 left-0" width="130" height="130">
          <defs>
            <linearGradient id="progressGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={arcColor} stopOpacity="1" />
              <stop offset="100%" stopColor={arcColor} stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="65"
            cy="65"
            r="50"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          {/* Foreground arc */}
          <circle
            cx="65"
            cy="65"
            r="50"
            stroke={arcColor}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
          />
        </svg>

        {/* Centered value */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-[22px] font-bold">{value}</div>
          <div className="text-[13px] text-gray-600">{unit}</div>
        </div>
      </div>
    </div>
  );
};

export default HealthStatCard;
