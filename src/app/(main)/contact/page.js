'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
<<<<<<< HEAD

export default function ContactPage() {
  return (
    <div className="grow min-h-screen bg-gradient-to-br from-green-50 to-white">
      <main className="flex-1 py-12 px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-green-700 mb-3">📬 Contact Us</h2>
          <p className="text-gray-600">
            Have a question, suggestion, or just want to connect? We’d love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-gray-700"
          >
            <ContactInfo
              icon={<Mail className="text-green-600 mt-1" />} label="Email" detail="support@aethercare.com"
            />
            <ContactInfo
              icon={<Phone className="text-green-600 mt-1" />} label="Phone" detail="+91 98765 43210"
            />
            <ContactInfo
              icon={<MapPin className="text-green-600 mt-1" />} label="Address" detail="NIT Silchar, Assam, India"
            />

            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h4 className="font-semibold text-green-800">Quick Facts</h4>
              <ul className="text-sm list-disc list-inside text-green-700">
                <li>Average response time: under 24 hrs</li>
                <li>Active support: 9 AM - 9 PM IST</li>
                <li>Support in 3 languages</li>
=======
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
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
              </ul>
            </div>
          </motion.div>

<<<<<<< HEAD
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 bg-white p-6 rounded-xl shadow-lg border border-green-200"
=======
          {/* Contact Form Panel */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-emerald-200 space-y-5"
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
          >
            <input
              type="text"
              placeholder="Your Name"
<<<<<<< HEAD
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
=======
              className={`w-full px-5 py-3 rounded-lg bg-white border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${bodyFont.className}`}
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
              required
            />
            <input
              type="email"
              placeholder="Your Email"
<<<<<<< HEAD
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
=======
              className={`w-full px-5 py-3 rounded-lg bg-white border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${bodyFont.className}`}
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
<<<<<<< HEAD
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
=======
              className={`w-full px-5 py-3 rounded-lg bg-white border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${bodyFont.className}`}
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
              required
            ></textarea>
            <button
              type="submit"
<<<<<<< HEAD
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
=======
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition"
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
            >
              Send Message
            </button>
          </motion.form>
        </div>

<<<<<<< HEAD
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="max-w-5xl mx-auto mt-16 text-center text-sm text-gray-500"
        >
          <p>We respect your privacy. Your data will never be shared.</p>
        </motion.div>
=======
        <p className="mt-14 text-sm text-gray-500 text-center">We respect your privacy. Your information is never shared.</p>
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
      </main>
    </div>
  );
}

function ContactInfo({ icon, label, detail }) {
  return (
    <div className="flex items-start gap-4">
<<<<<<< HEAD
      {icon}
      <div>
        <h4 className="font-semibold text-gray-800">{label}</h4>
        <p className="text-gray-600">{detail}</p>
      </div>
    </div>
  );
}
=======
      <div>{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{label}</h4>
        <p className="text-gray-600 text-sm">{detail}</p>
      </div>
    </div>
  );
}
>>>>>>> 473b03d96b1c0cd281f44df5f5574644bfd9b031
