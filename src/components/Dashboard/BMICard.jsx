import { MdMonitorHeart } from 'react-icons/md';
import { FaRunning } from 'react-icons/fa';

const BMICard = () => {
  return (
    <div className="w-[200px] h-[250px] rounded-xl bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-4 flex flex-col justify-between items-center">

      {/* Top Section */}
      <div className="w-full flex justify-between items-center">
        <div className="bg-[#FDEDD1] p-2 rounded-lg">
          <MdMonitorHeart className="text-[#DDA95E] text-xl" />
        </div>
        <div className="bg-[#FDEDD1] text-[#DDA95E] px-2 py-1 text-xs rounded-md font-semibold">
          Healthy
        </div>
      </div>

      {/* Middle Text */}
      <div className="mt-2 text-gray-800 font-medium text-sm">BMI</div>

      {/* Circular Progress Ring */}
      <div className="relative w-[120px] h-[120px] mt-2">
        {/* Background Ring */}
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke="#E5E7EB"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke="#DDA95E"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="300"
            strokeDashoffset="60" // Adjust based on BMI value
          />
        </svg>

        {/* Center Icon and Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <FaRunning className="text-[#DDA95E] text-xl mb-1" />
          <span className="text-black text-xl font-semibold">24.9</span>
        </div>
      </div>
    </div>
  );
};

export default BMICard;
