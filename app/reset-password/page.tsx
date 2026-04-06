"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans antialiased px-6" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md p-10 rounded-3xl border shadow-xl" style={{ background: 'var(--card)', borderColor: 'var(--card-border)' }}>
        <div className="mb-8">
          <Logo />
          <h2 className="text-3xl font-black mt-6 mb-2" style={{ color: 'var(--foreground)' }}>Reset Password</h2>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Enter your new password below.</p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <p className="text-green-500 font-semibold">Password updated successfully!</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Redirecting you to login...</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>New Password</label>
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

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#7042F4]"
                style={{ background: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full py-4 rounded-lg text-base font-semibold text-white bg-[#7042F4] hover:bg-[#5B34E5] transition-all active:scale-[0.98] cursor-pointer"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}