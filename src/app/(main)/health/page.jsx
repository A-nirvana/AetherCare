'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['600'] });

export default function HealthTipsPage() {
  const [query, setQuery] = useState('');
  const [tipsData, setTipsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchTips = async () => {
    if (!query.trim()) return setError("Please enter a topic!");
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

      setTipsData(parsed);
    } catch (e) {
      console.error(e);
      setError('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
      </main>
    </div>
  );
}
