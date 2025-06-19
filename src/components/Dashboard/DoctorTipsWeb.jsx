'use client';
import { useState, useEffect } from 'react';

export default function DoctorTipsWeb() {
  const [tip, setTip] = useState('Loading tip...');

  const fetchTip = async () => {
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await res.json();
      setTip(data.text);
    } catch (err) {
      setTip('Could not load a tip right now.');
    }
  };

  useEffect(() => {
    fetchTip(); // fetch first tip
    const interval = setInterval(fetchTip, 10000); // fetch every 10 seconds
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 w-full max-w-md transition-all">
      <h2 className="text-lg font-bold mb-3 text-green-600">🩺 Doctor's Recommendation</h2>
      <p className="text-gray-700">{tip}</p>
    </div>
  );
}
