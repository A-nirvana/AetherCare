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

// Custom hook to throttle the execution of a useEffect
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
dont give any other insights only take vitals and give insights on the vitals only
Give short personalized insights for each vital. Format your answer like:
1. BMI: [short recommendation]
2. Temperature: [short recommendation]
3. BPM: [short recommendation]
4. SpO2: [short recommendation]

Don't use asterisks (*), bold markdown, or include any sources or links.
Keep each insight to 1 sentence.
`;
    axios
      .post("/api/gemini-tips", { query: prompt })
      .then((res) => {
        const lines = res.data.tips
          .split("\n")
          .filter((line) => line.trim() !== "" && !line.toLowerCase().includes("source"))
          .map((line) => {
            const match = line.match(/^\d+\.\s*\*\*(.*?)\*\*:?\s*(.*)/) || line.match(/^\d+\.\s*(.*?):\s*(.*)/);
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
  }, [bmi, temperature, bpm, spo2],30000);

  return (  
    <div className="bg-white border border-green-200 rounded-2xl shadow-lg p-6 w-full h-[300px] mt-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-green-600" />
        <h2 className="text-xl font-semibold text-green-700">Vital Recommendation</h2>
      </div>
      {loading ? (
        <p className="text-gray-500 animate-pulse">Analyzing your vitals...</p>
      ) : (
        <ul className="space-y-3 text-gray-700">
          {tips.map((tip, idx) => (
            <li key={idx}>
              {tip.title && <strong className="text-green-700">{tip.title}: </strong>}
              {tip.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorTipsWeb;
