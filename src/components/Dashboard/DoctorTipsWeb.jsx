"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";

const useThrottledCallback = (callback, delay) => {
  const throttleRef = useRef(false);
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (!throttleRef.current) {
      callback(...args);
      throttleRef.current = true;
      timeoutRef.current = setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    }
  }, [callback, delay]);
};

const useThrottledEffect = (callback, dependencies, delay) => {
  const throttledCallback = useThrottledCallback(callback, delay);
  useEffect(() => {
    throttledCallback();
  }, dependencies);
};

function DoctorTipsWeb({ bmi = 24.5, temperature = 98.6, bpm = 76, spo2 = 98 }) {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useThrottledEffect(() => {
    const prompt = `
You are a health assistant AI. Based on the following vitals:
- BMI: ${bmi}
- Temperature: ${temperature}°F
- Heart Rate (BPM): ${bpm}
- SpO2: ${spo2}%

Only give insights based on these vitals. Format your answer like:
1. BMI: [short recommendation]
2. Temperature: [short recommendation]
3. BPM: [short recommendation]
4. SpO2: [short recommendation]

Dont give general tips. Dont give source
No asterisks or bold markdown. Each insight must be 1 sentence.
`;

    axios
      .post("/api/gemini-tips", { query: prompt })
      .then((res) => {
        const lines = res.data.tips
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => {
            const match =
              line.match(/^\d+\.\s*\*\*(.*?)\*\*:?:\s*(.*)/) ||
              line.match(/^\d+\.\s*(.*?):\s*(.*)/);
            if (match) {
              return { title: match[1].trim(), content: match[2].trim() };
            }
            return { title: "", content: line.trim() };
          });
        setTips(lines);
        setLoading(false);
      })
      .catch(() => {
        setTips([{ title: "", content: "Unable to fetch tips." }]);
        setLoading(false);
      });
  }, [bmi, temperature, bpm, spo2], 30000);

  return (
    <div className="bg-gradient-to-br from-[#f0fff4] to-[#e6f7ec] border border-[#d1fadf] rounded-2xl shadow-xl p-6 w-full h-[340px] mt-6 transition-all">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="text-[#0fc100] w-6 h-6" />
        <h2 className="text-2xl font-bold text-[#065f46] tracking-tight">
          Vital Recommendations
        </h2>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-5 w-full rounded-md bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <ul className="space-y-4 pl-2 text-lg text-[#1e3a2d]">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-3 h-3 mt-2 rounded-full bg-[#0fc100] flex-shrink-0 shadow-md" />
              <div>
                <span className="font-semibold text-[#0fc100] text-[1.05rem]">
                  {tip.title}
                </span>
                {tip.title && ": "}
                <span className="text-[1.05rem] leading-relaxed">
                  {tip.content}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorTipsWeb;