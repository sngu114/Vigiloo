"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Logo from '@/components/Logo';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAlerts() {
      const { data } = await supabase
        .from('scam_alerts')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(10);
      
      if (data && data.length > 0) {
        setAlerts([...data, ...data]);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-[#F0EBFF] selection:text-[#7042F4]">

      {/* Hero Section */}
      <section className="relative overflow-hidden text-center pt-24 pb-16 px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F0EBFF] dark:bg-[#7042F4]/20 text-[#7042F4] text-xs font-bold mb-8 tracking-wide relative z-10">
          <span className="mr-2">🛡️</span> TRUSTED SECURITY EDUCATION
        </div>
        
        <h1 className="text-7xl font-black text-[#7042F4] mb-8 tracking-tight relative z-10">Our Mission:</h1>
        
        <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-xl leading-relaxed font-medium relative z-10">
          Empowering every generation to navigate the digital world safely. 
          We educate and protect people from evolving scams with expert guidance.
        </p>
      </section>

      {/* Path Selection Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold text-[#0F172A] dark:text-white mb-4 tracking-tight">Who are you protecting today?</h2>
          <p className="text-gray-400 text-lg font-medium">Head on over to the lessons page to pick out your plan.</p>
        </div>

        <div className="flex justify-center">
          <Link href="/lessons" className="w-full max-w-md">
            <button className="w-full bg-[#7042F4] text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:bg-[#5B34E5] hover:shadow-2xl hover:shadow-[#7042F4]/30 transition-all transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-3">
              Get Started
              <span className="text-2xl">→</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Scam Alerts Marquee Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h4 className="text-4xl font-black text-[#0F172A] dark:text-white mb-2">Latest Scam Alerts</h4>
            <p className="text-gray-500 font-medium">Real-time fraud reports.</p>
          </div>
          
          <Link 
            href="/news" 
            className="text-[#7042F4] font-bold text-sm hover:underline flex items-center gap-2 group transition-all"
          >
            More news 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Fixed: Forced a dark background for the container so white text is always visible, and restored purple accents */}
        <div className="bg-[#0F172A] border border-white/10 rounded-[40px] py-16 overflow-hidden relative marquee-mask">
          <div className="animate-marquee flex gap-8">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <a 
                  key={index}
                  href={alert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[350px] flex-shrink-0 bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-[#7042F4]/10 transition-all group cursor-pointer backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#7042F4]/20 text-[#7042F4] text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider">Official Alert</span>
                  </div>
                  {/* Fixed: Title now turns Purple on hover for better visual feedback */}
                  <h5 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-[#7042F4] transition-colors">
                    {alert.title}
                  </h5>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 font-medium">
                    {alert.description}
                  </p>
                  <span className="text-[#7042F4] text-xs font-bold transition-colors">
                    Read Full Report →
                  </span>
                </a>
              ))
            ) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[350px] h-[220px] bg-white/5 rounded-[32px] animate-pulse mx-4" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent border-t border-gray-100 dark:border-gray-800 pt-16 pb-12 px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
             <Logo />
             <p className="mt-4 text-gray-400 text-sm font-medium">© 2026 Vigiloo - Scam Prevention Network. A non-profit initiative.</p>
          </div>
          <div className="flex space-x-10 text-sm font-bold text-gray-400">
    <Link href="/privacy" className="hover:text-[#7042F4] transition-colors cursor-pointer">Privacy Policy</Link>
    <Link href="/terms" className="hover:text-[#7042F4] transition-colors cursor-pointer">Terms of Service</Link>
            <Link href="/about" className="hover:text-[#7042F4] transition-colors cursor-pointer">About Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}