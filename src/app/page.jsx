"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeartPulse, Siren, Stethoscope, Sparkles, Mic } from 'lucide-react';

const NavBar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="fixed w-full backdrop-blur-lg bg-white/60 dark:bg-green-900/80 z-50 border-b border-green-200 shadow-sm"
  >
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="https://res.cloudinary.com/dmhbmurzw/image/upload/v1750529139/WhatsApp_Image_2025-06-11_at_11.27.51_qdckha.png" alt="aethercare" width={60} height={60}/>
        <h1 className="text-xl font-extrabold tracking-tight text-green-900">AetherCare</h1>
      </div>
      <div className="hidden md:flex gap-8 text-green-800 text-sm font-medium">
        {['Home', 'About', 'Features', 'Team'].map(section => (
          <a
            key={section}
            href={`#${section.toLowerCase()}`}
            className="hover:text-green-600 transition-colors duration-200"
          >
            {section}
          </a>
        ))}
      </div>
      <a href="#get-started" className="bg-green-500 hover:bg-green-400 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition">Get Started</a>
    </div>
  </motion.nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section id="home" className="h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-white relative overflow-hidden flex items-center justify-center text-center">
      <motion.div style={{ y }} className="z-10 px-6">
        <h1 className="text-6xl md:text-8xl font-bold text-green-900 tracking-tight leading-tight">Smart HealthGuard</h1>
        <p className="text-lg md:text-2xl text-green-700 mt-6 mb-10 max-w-2xl mx-auto">
          AI-powered IoT for real-time health alerts, emergency response, and predictive care.
        </p>
        <a href="/login" className="inline-block bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg">Start Your Journey</a>
      </motion.div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-4xl mx-auto text-center px-6">
      <h2 className="text-4xl font-bold text-green-900 mb-6">Why AetherCare?</h2>
      <p className="text-green-700 text-lg">
        Traditional systems react late. We prevent. Our platform predicts health emergencies before they occur and ensures inclusive care with voice assistance, automated alerts, and personalized health tips.
      </p>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:border-green-300 transition"
  >
    <div className="text-green-500 text-3xl mb-4">{icon}</div>
    <h4 className="text-lg font-semibold text-green-900 mb-2">{title}</h4>
    <p className="text-green-700 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const Features = () => {
  const data = [
    { icon: <HeartPulse />, title: "AI Risk Prediction", desc: "Real-time vitals analysis to predict emergencies early." },
    { icon: <Siren />, title: "Emergency Alerts", desc: "Live updates sent to hospitals, ambulances, and caregivers." },
    { icon: <Stethoscope />, title: "First Aid Guidance", desc: "CPR and aid tutorials triggered during emergencies." },
    { icon: <Sparkles />, title: "Chronic Care Plans", desc: "Personalized insights for lifestyle and diet adjustments." },
    { icon: <HeartPulse />, title: "Medical Chatbot", desc: "Analyzes X-rays, ECGs and lab reports with high accuracy." },
    { icon: <Mic />, title: "Voice Assistant", desc: "Health tips and reminders for elderly and visually impaired." },
  ];

  return (
    <section id="features" className="py-24 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Our Breakthrough Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item, i) => <FeatureCard key={i} {...item} />)}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const members = [
    { name: "Anirban Bora", email: "anirbora3@gmail.com", src:"https://res.cloudinary.com/dmhbmurzw/image/upload/v1750525224/Y19jcm9wLGFyXzE6MQ_tjallv.jpg" },
    { name: "Faruk Ahmed", email: "fa0713026@gmail.com", src:"https://res.cloudinary.com/dmhbmurzw/image/upload/v1750527438/503587757_18297371146222939_9171532591407133951_n_kdmqow.jpg" },
    { name: "Jubaraj Talukdar", email: "jubaraj.t3006@gmail.com", src:"https://res.cloudinary.com/dmhbmurzw/image/upload/v1750527578/467165669_1784522038958182_4422218240004610435_n_s6z8ta.jpg" },
    { name: "Misbahul Karim", email: "mixbaul786@gmail.com", src:"https://res.cloudinary.com/dmhbmurzw/image/upload/v1750527073/WhatsApp_Image_2025-06-21_at_22.41.20_idjgge.jpg" }
    ,
  ];

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((member, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-green-200 shadow-md">
              <img
                src={`${member.src}`}
                alt={member.name}
                className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-green-400"
              />
              <h4 className="font-semibold text-green-800">{member.name}</h4>
              <p className="text-sm text-green-600">{member.email}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="get-started" className="py-24 bg-gradient-to-r from-green-500 to-green-600 text-white text-center">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-4">Ready to Revolutionize Healthcare?</h2>
      <p className="text-md mb-8">Get started with AetherCare and experience intelligent, real-time healthcare support like never before.</p>
      <a href="#" className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-green-50 transition">Start Now</a>
      <p className="text-xs mt-10">© 2025 AetherCare. All rights reserved.</p>
    </div>
  </footer>
);

const AetherCare = () => {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Team />
      <Footer />
    </div>
  );
};

export default AetherCare;
