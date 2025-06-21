"use client";
import { Archivo } from 'next/font/google';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const HealthScore = () => {
  return (
    <div className="bg-gradient-to-tr from-[#ede9fe] to-[#f4f3ff] rounded-2xl px-6 py-6 flex justify-between items-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30 relative overflow-hidden group transition duration-300 hover:scale-[1.01]">
      {/* Decorative blurred blob */}
      <div className="absolute w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-3xl top-[-30%] right-[-10%] z-0"></div>

      {/* Text Content */}
      <div className="relative z-10">
        <h2 className={`${archivo.className} text-[1.5rem] font-extrabold text-gray-800`}>
          Health Score
        </h2>
        <p className={`${inter.className} text-sm text-gray-600 mt-2 font-medium`}>
          Based on your health tracking, your score is <strong className="text-gray-900 font-semibold">78</strong> and considered <span className="text-green-600 font-semibold">Good</span>.
        </p>
        <Link
          href="/statistic"
          className="text-blue-600 text-sm mt-4 inline-block font-semibold transition-all duration-300 hover:text-blue-800 hover:underline"
        >
          Tell me more &rarr;
        </Link>
      </div>

      {/* Score Badge */}
      <div className="relative z-10">
        <div className="bg-gradient-to-bl from-pink-600 to-pink-600 text-white font-extrabold text-3xl rounded-full px-7 py-4 shadow-lg animate-soft-pulse ring-4 ring-pink-100">
          78
        </div>
      </div>
    </div>
  );
};

export default HealthScore;
