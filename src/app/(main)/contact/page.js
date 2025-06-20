'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 bg-white p-6 rounded-xl shadow-lg border border-green-200"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Send Message
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="max-w-5xl mx-auto mt-16 text-center text-sm text-gray-500"
        >
          <p>We respect your privacy. Your data will never be shared.</p>
        </motion.div>
      </main>
    </div>
  );
}

function ContactInfo({ icon, label, detail }) {
  return (
    <div className="flex items-start gap-4">
      {icon}
      <div>
        <h4 className="font-semibold text-gray-800">{label}</h4>
        <p className="text-gray-600">{detail}</p>
      </div>
    </div>
  );
}