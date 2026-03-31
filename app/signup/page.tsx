"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    setError('');
    setSuccess('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Account created! Check your email to confirm your account, then sign in.');
    }
  };

  return (
    <div className="min-h-screen flex font-sans antialiased text-gray-900 bg-white">
      {/* THE FIX: This hides the global navbar wrapper only on this page */}
      <style jsx global>{`
        .global-navbar-wrapper { display: none !important; }
      `}</style>

      {/* Left Side: Marketing Panel */}
      <div className="w-1/2 bg-[#7042F4] p-24 flex flex-col justify-between">
        <div className="space-y-16">
          <div className="flex items-center space-x-3 text-white">
            <Logo isWhite={true} />
          </div>

          <div className="space-y-6 max-w-2xl text-white">
            <h1 className="text-7xl font-bold tracking-tighter leading-tight">
              Join Vigiloo.
            </h1>
            <p className="text-2xl text-[#E9E1FF]">
              Create your account and start mastering the art of digital self-defense today.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="w-1/2 bg-white flex flex-col justify-between p-24">
        <div className="w-full max-w-lg mx-auto space-y-12">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tight text-[#0F172A]">Create Account</h2>
            <p className="text-lg text-gray-600">Get started with Vigiloo for free.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#7042F4] focus:border-[#7042F4] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#7042F4] focus:border-[#7042F4] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#7042F4] focus:border-[#7042F4] outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="button"
              onClick={handleSignUp}
              className="w-full flex justify-center py-4 px-6 rounded-lg shadow-xl text-base font-semibold text-white bg-[#7042F4] hover:bg-[#5B34E5] transition-all transform active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              className="font-bold text-[#7042F4] hover:underline"
              onClick={() => router.push('/')}
            >
              Sign in
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <button className="hover:text-gray-600">Privacy Policy</button>
          <button className="hover:text-gray-600">Terms of Service</button>
          <button className="hover:text-gray-600">Help Center</button>
        </div>
      </div>
    </div>
  );
}