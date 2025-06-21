'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
=======
import { Sparkles } from 'lucide-react';
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['600'] });

export default function HealthTipsPage() {
  const [query, setQuery] = useState('');
  const [tipsData, setTipsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchTips = async () => {
<<<<<<< HEAD
    if (!query.trim()) return setError("Please enter something.");
=======
    if (!query.trim()) return setError("Please enter a topic!");
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
    setError('');
    setLoading(true);
    setTipsData([]);

    try {
      const res = await fetch('/api/gemini-tips', {
        method: 'POST',
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error(await res.text());

      const { tips: rawText } = await res.json();

<<<<<<< HEAD
      // Parse Gemini tips into { heading, body, source }
      const parsed = rawText
  .split(/\n(?=\d+\.)/) // Split at lines starting with "1.", "2.", etc.
  .map(block => {
    const headingMatch = block.match(/\d+\.\s*(.*?)[:\-–]/);
    const sourceMatch = block.match(/Source:\s*(https?:\/\/[^\s)]+)[\s)]?/i);

    const heading = headingMatch
      ? headingMatch[1].replace(/[*_]+/g, '').trim()
      : 'Health Tip';

    let source = sourceMatch ? sourceMatch[1].trim() : null;
    if (source && /[)\]]$/.test(source)) {
      source = source.slice(0, -1); // remove trailing bracket/parenthesis
    }

    const content = block
  .replace(/\d+\.\s*/, '') // remove "1. "
  .replace(headingMatch?.[0] || '', '') // remove heading
  .replace(/Source:.*/i, '') // remove source line
  .replace(/[*_]+/g, '') // remove markdown styling
  .trim()
  .replace(/[\[\]\(\)]+$/, ''); // remove stray trailing brackets or parentheses


    return { heading, content, source };
  });

=======
      const parsed = rawText
        .split(/\n(?=\d+\.)/)
        .map(block => {
          const headingMatch = block.match(/\d+\.\s*(.*?)[:\-–]/);
          const sourceMatch = block.match(/Source:\s*(https?:\/\/[^\s)]+)[\s)]?/i);

          const heading = headingMatch
            ? headingMatch[1].replace(/[*_]+/g, '').trim()
            : 'Health Tip';

          let source = sourceMatch ? sourceMatch[1].trim() : null;
          if (source && /[)\]]$/.test(source)) {
            source = source.slice(0, -1);
          }

          const content = block
            .replace(/\d+\.\s*/, '')
            .replace(headingMatch?.[0] || '', '')
            .replace(/Source:.*/i, '')
            .replace(/[*_]+/g, '')
            .trim()
            .replace(/[\[\]()]+$/, '');

          return { heading, content, source };
        });
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031

      setTipsData(parsed);
    } catch (e) {
      console.error(e);
<<<<<<< HEAD
      setError('Failed to get tips. Please try again.');
=======
      setError('Something went wrong. Try again later.');
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="grow min-h-screen bg-green-50">
      <main className="flex-1 p-8 space-y-6 overflow-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl font-bold text-green-800 ${montserrat.className}`}
        >
          🧠 Instant Health Tips
        </motion.h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. diabetes, fever, nutrition..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={searchTips}
            className="px-5 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? 'Searching…' : 'Get Tips'}
          </button>
        </div>

        {error && <p className="text-red-500 font-medium">{error}</p>}

        {tipsData.length > 0 && (
          <div className="space-y-6">
            {tipsData.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-green-800 mb-2">{tip.heading}</h2>
                <p className="text-gray-700 leading-relaxed mb-3">{tip.content}</p>
                {tip.source && (
                  <a
                    href={tip.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    Source: {tip.source}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
=======
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-green-50 via-[#e7f8ec] to-green-100 p-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-10">
            <Sparkles className="text-green-700 w-7 h-7 animate-pulse" />
            <h1 className={`text-4xl font-extrabold text-green-900 ${montserrat.className}`}>
              Smart Health Tips
            </h1>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type a health topic..."
              className="flex-1 px-6 py-3 rounded-full text-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={searchTips}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-full shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Thinking…' : 'Get Tips'}
            </button>
          </div>

          {error && (
            <p className="text-red-600 mt-4 text-lg font-medium">{error}</p>
          )}

          {tipsData.length > 0 && (
            <div className="mt-10 space-y-6">
              {tipsData.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/90 rounded-2xl p-6 shadow hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-green-800 mb-2">{tip.heading}</h2>
                  <p className="text-gray-800 text-base">{tip.content}</p>
                  {tip.source && (
                    <a
                      href={tip.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-green-700 text-sm underline"
                    >
                      Source: {tip.source}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
      </main>
    </div>
  );
}
