"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevents page reload on form submit
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen flex font-sans antialiased text-gray-900" data-login>
      {/* Left Side: Marketing Panel */}
      <div className="w-1/2 bg-[#7042F4] p-20 flex flex-col">
        <div className="space-y-12 mb-12">
          <div className="flex items-center space-x-3 text-white">
            <Logo isWhite={true} />
          </div>

          <div className="space-y-6 max-w-2xl text-white">
            <h1 className="text-7xl font-bold tracking-tighter leading-tight">
              Stay Vigilant.
            </h1>
            <p className="text-2xl text-[#E9E1FF]">
              Join Vigiloo to master the art of digital self-defense. We provide the tools and education you need to navigate the web safely.
            </p>
          </div>
        </div>

        {/* Big Image Box: Changed from h-96 to flex-grow with aspect ratio */}
        <div className="relative flex-grow w-full rounded-2xl bg-[#0F172A] border-8 border-white/10 shadow-2xl overflow-hidden min-h-[400px]">
          <Image 
            src="/placeholder.png"
            alt="Vigiloo Security Illustration"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-between p-24">
        <div className="w-full max-w-lg mx-auto space-y-10">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tight text-[#0F172A]">Welcome Back</h2>
            <p className="text-lg text-gray-600">Continue your learning journey with Vigiloo.</p>
          </div>

          {/* Form wrapper for "Enter" key support */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#7042F4] focus:border-[#7042F4] outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-sm font-medium text-[#7042F4] hover:underline">Forgot password?</button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#7042F4] focus:border-[#7042F4] outline-none"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-6 rounded-lg shadow-xl text-base font-semibold text-white bg-[#7042F4] hover:bg-[#5B34E5] transition-all transform active:scale-[0.98] cursor-pointer"
            >
              Sign In to Vigiloo
            </button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or Continue With</span></div>
          </div>

          {/* Updated to 3 columns for Email button */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-semibold transition-colors">Google</button>
            <button className="flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-semibold transition-colors">Apple</button>
            <button className="flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-semibold transition-colors">Email</button>
          </div>

          <div className="text-center text-sm text-gray-600">
            New to Vigiloo? <button className="font-bold text-[#7042F4] hover:underline" onClick={() => router.push('/signup')}>Create an account</button>
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