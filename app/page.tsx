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

  const [resetSent, setResetSent] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password',
    });
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
      setError('');
    }
  };

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans antialiased" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      
      {/* Left Side: Marketing & Image Panel (Shared 1/2 of screen on desktop) */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top Messaging: Adjusted to take up 50% height */}
        <div className="bg-[#7042F4] p-10 lg:p-20 flex-grow basis-1/2 flex items-center">
          <div className="space-y-8 lg:space-y-12">
            <div className="flex items-center space-x-3 text-white">
              <Logo isWhite={true} />
            </div>
            <div className="space-y-4 lg:space-y-6 max-w-2xl text-white">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight">
                Stay Vigilant.
              </h1>
              <p className="text-xl lg:text-2xl text-[#E9E1FF]">
                Join Vigiloo to master the art of digital self-defense. We provide the tools and education you need to navigate the web safely.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Image Area: Adjusted to take up remaining 50% height */}
        <div className="relative basis-1/2 w-full min-h-[250px] lg:min-h-0 bg-[#0F172A]">
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

      {/* Right Side: Login Form (1/2 of screen on desktop) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-10 lg:p-24" style={{ background: 'var(--card)' }}>
        <div className="w-full max-w-lg mx-auto space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>Welcome Back</h2>
            <p className="text-lg" style={{ color: 'var(--muted)' }}>Continue your learning journey with Vigiloo.</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#7042F4]"
                style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>Password</label>
                <button type="button" onClick={handleForgotPassword} className="text-sm font-medium text-[#7042F4] hover:underline cursor-pointer">Forgot password?</button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#7042F4]"
                style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}
                required
              />
            </div>

            {resetSent && (
              <p className="text-green-500 text-sm font-medium">
                Password reset email sent! Check your inbox.
              </p>
            )}

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-6 rounded-lg shadow-xl text-base font-semibold text-white bg-[#7042F4] hover:bg-[#5B34E5] transition-all transform active:scale-[0.98] cursor-pointer"
            >
              Sign In to Vigiloo
            </button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--card-border)' }}></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 font-bold tracking-widest" style={{ background: 'var(--card)', color: 'var(--muted)' }}>Or Continue With</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer" style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}>Google</button>
            <button className="flex items-center justify-center py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer" style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}>Apple</button>
            <button className="flex items-center justify-center py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer" style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}>Email</button>
          </div>

          <div className="text-center text-sm" style={{ color: 'var(--muted)' }}>
            New to Vigiloo? <button className="font-bold text-[#7042F4] hover:underline cursor-pointer" onClick={() => router.push('/signup')}>Create an account</button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-4 lg:space-x-8 text-[10px] font-bold uppercase tracking-widest mt-12 lg:mt-0" style={{ color: 'var(--muted)' }}>
          <button className="hover:text-gray-600 transition-colors">Privacy Policy</button>
          <button className="hover:text-gray-600 transition-colors">Terms of Service</button>
          <button className="hover:text-gray-600 transition-colors">Help Center</button>
        </div>
      </div>
    </div>
  );
}