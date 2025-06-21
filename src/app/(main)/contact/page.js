'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Raleway, Poppins } from 'next/font/google';

const headingFont = Raleway({ subsets: ['latin'], weight: ['700'] });
const bodyFont = Poppins({ subsets: ['latin'], weight: ['400'] });

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 overflow-hidden font-sans">
      {/* Floating Particles */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-100 rounded-full blur-3xl opacity-20 top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-emerald-100 rounded-full blur-2xl opacity-20 bottom-[-120px] right-[-120px] animate-bounce" />

      <main className="relative z-10 flex flex-col items-center justify-center py-16 px-6 sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-14 ${headingFont.className}`}
        >
          <h2 className="text-4xl font-bold text-emerald-700 mb-3 tracking-tight">Contact Our Team</h2>
          <p className={`text-gray-600 max-w-xl mx-auto text-base ${bodyFont.className}`}>
            We’re always ready to listen. Feel free to reach out with your queries, ideas, or just to say hello!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
          {/* Contact Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-emerald-100 space-y-6"
          >
            <ContactInfo icon={<Mail className="text-emerald-600 w-6 h-6" />} label="Email" detail="support@aethercare.com" />
            <ContactInfo icon={<Phone className="text-emerald-600 w-6 h-6" />} label="Phone" detail="+91 98765 43210" />
            <ContactInfo icon={<MapPin className="text-emerald-600 w-6 h-6" />} label="Address" detail="NIT Silchar, Assam, India" />

            <div className="mt-6 bg-emerald-100 rounded-xl p-4 text-sm text-emerald-800 shadow-sm">
              <h4 className="font-semibold mb-2">Support Facts</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Responses within 24 hrs</li>
                <li>Available 9 AM - 9 PM IST</li>
                <li>Multilingual support</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form Panel */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-emerald-200 space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full px-5 py-3 rounded-lg bg-white border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${bodyFont.className}`}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full px-5 py-3 rounded-lg bg-white border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${bodyFont.className}`}
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className={`w-full px-5 py-3 rounded-lg bg-white border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${bodyFont.className}`}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>

        <p className="mt-14 text-sm text-gray-500 text-center">We respect your privacy. Your information is never shared.</p>
      </main>
    </div>
  );
}

function ContactInfo({ icon, label, detail }) {
  return (
    <div className="flex items-start gap-4">
      <div>{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{label}</h4>
        <p className="text-gray-600 text-sm">{detail}</p>
      </div>
    </div>
  );
}
