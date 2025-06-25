'use client';

import Link from 'next/link';
import { Archivo } from 'next/font/google';
import { Inter } from 'next/font/google';
import { AlertTriangle, HeartPulse, VolumeX, Volume2 } from 'lucide-react';
import { useAlert } from '@/context/AlertContext'; // ✅ use the global context

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const HealthScore = () => {
  const { healthScore, muted, setMuted, isAlert } = useAlert(); // ✅ global state

  return (
    <div
      className={`rounded-2xl px-6 py-6 flex justify-between items-center shadow-lg border relative overflow-hidden group transition duration-300 hover:scale-[1.01]
        ${isAlert
          ? 'bg-gradient-to-tr from-red-100 to-red-200 border-red-300'
          : 'bg-gradient-to-tr from-[#ede9fe] to-[#f4f3ff] border-white/30'
        }`}
    >
      {/* Decorative blob */}
      <div
        className={`absolute w-40 h-40 rounded-full opacity-20 blur-3xl top-[-30%] right-[-10%] z-0
          ${isAlert ? 'bg-red-400' : 'bg-pink-300'}`}
      ></div>

      {/* Text Content */}
      <div className="relative z-10">
        <h2 className={`${archivo.className} text-[1.5rem] font-extrabold ${isAlert ? 'text-red-800' : 'text-gray-800'}`}>
          {isAlert ? '⚠️ Health Alert' : 'Health Score'}
        </h2>
        <p className={`${inter.className} text-sm mt-2 font-medium ${isAlert ? 'text-red-700' : 'text-gray-600'}`}>
          {isAlert
            ? <>Your score is <strong className="text-red-800 font-semibold">{healthScore}</strong>. It's considered <span className="text-red-600 font-bold">Critical</span>.</>
            : <>Your score is <strong className="text-gray-900 font-semibold">{healthScore}</strong> and considered <span className="text-green-600 font-semibold">Good</span>.</>
          }
        </p>
        <Link
          href="/statistic"
          className={`text-sm mt-4 inline-block font-semibold transition-all duration-300 hover:underline ${
            isAlert ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          {isAlert ? 'View urgent tips →' : 'Tell me more →'}
        </Link>

        {/* Persistent Mute/Unmute Button */}
        {isAlert && (
          <button
            onClick={() => setMuted(!muted)}
            className="mt-3 flex items-center gap-2 text-sm text-red-700 font-medium hover:text-red-900 transition"
          >
            {muted ? <Volume2 size={18} /> : <VolumeX size={18} />}
            {muted ? 'Unmute Alert' : 'Mute Alert'}
          </button>
        )}
      </div>

      {/* Score Badge */}
      <div className="relative z-10 flex items-center justify-center">
        <div className={`rounded-full px-7 py-4 shadow-lg font-extrabold text-3xl flex items-center gap-2 ring-4
          ${isAlert
            ? 'bg-red-600 text-white ring-red-200 animate-pulse'
            : 'bg-gradient-to-bl from-pink-600 to-pink-600 text-white ring-pink-100 animate-soft-pulse'
          }`}>
          {isAlert ? <AlertTriangle size={28} /> : <HeartPulse size={28} />}
          {healthScore}
        </div>
      </div>
    </div>
  );
};

export default HealthScore;
