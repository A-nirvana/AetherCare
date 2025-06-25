'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ShieldUser } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Urbanist, DM_Sans } from 'next/font/google';

const headingFont = Urbanist({ subsets: ['latin'], weight: ['600', '700'] });
const bodyFont = DM_Sans({ subsets: ['latin'], weight: ['400', '500'] });

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const user = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) return alert('Please fill in all fields');
    if (isLogin) user.login({ userId, password });
    else console.log('Register:', userId, password);
    setUserId('');
    setPassword('');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-[#f5fff5] via-[#ebfbee] to-[#c7f6d4] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-green-300/30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-green-200/30 rounded-full blur-2xl bottom-[-100px] right-[-80px] animate-bounce" />

      <motion.div
        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-md border border-green-100 rounded-3xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
              isLogin
                ? 'bg-green-600 text-white shadow'
                : 'bg-white text-green-600 border border-green-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
              !isLogin
                ? 'bg-green-600 text-white shadow'
                : 'bg-white text-green-600 border border-green-400'
            }`}
          >
            Register
          </button>
        </div>

        <h2
          className={`text-center text-3xl sm:text-4xl font-bold text-green-800 ${headingFont.className}`}
        >
          {isLogin ? 'Welcome Back' : 'Create AetherCare ID'}
        </h2>
        <p className={`text-center text-green-700 text-sm mt-2 ${bodyFont.className}`}>
          {isLogin ? 'Login to access your dashboard' : 'Register to start tracking your health'}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Input icon={<User />} placeholder="Full Name" />
              <Input icon={<Mail />} placeholder="Email" type="email" required />
            </>
          )}

          {isLogin && (
            <Input
              icon={<ShieldUser />}
              placeholder="User ID (Machine ID)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          )}

          <Input
            icon={<Lock />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-700 font-medium hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

function Input({ icon, placeholder, type = 'text', value, onChange, required }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-10 pr-4 py-3 bg-green-50 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm font-medium"
      />
    </div>
  );
}