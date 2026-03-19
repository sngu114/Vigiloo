"use client";

import Logo from '@/components/Logo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
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
        // Double the data for a seamless loop
        setAlerts([...data, ...data]);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans selection:bg-[#F0EBFF] selection:text-[#7042F4]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-5 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Logo /> 
        <div className="hidden lg:flex items-center space-x-10 text-sm font-semibold text-gray-600">
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Daily Quiz</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Elderly Scams</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Youth Scams</Link>
          
          
          {/* SOCIAL MEDIA PRACTICE - Now matches other nav items */}
          <Link href="/socialmedia" className="hover:text-[#7042F4] transition-colors cursor-pointer">
            Social Media Practice
          </Link>
        </div>
        
        {/* EMERGENCY BUTTON - Added cursor-pointer for the finger icon */}
        <Link href="/emergency">
          <button className="bg-[#E11D48] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#BE123C] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            Emergency Help
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-center pt-24 pb-16 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7042F4] rounded-full blur-[120px]"></div>
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-300 rounded-full blur-[100px]"></div>
        </div>

        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F0EBFF] text-[#7042F4] text-xs font-bold mb-8 tracking-wide">
          <span className="mr-2">🛡️</span> TRUSTED SECURITY EDUCATION
        </div>
        
        <h1 className="text-7xl font-black text-[#7042F4] mb-8 tracking-tight">Vigiloo</h1>
        
        <p className="max-w-2xl mx-auto text-gray-500 text-xl leading-relaxed font-medium">
          Empowering every generation to navigate the digital world safely. 
          We educate and protect people from evolving scams with expert guidance.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-[#7042F4] text-white px-10 py-4 rounded-2xl font-bold shadow-2xl hover:bg-[#5B34E5] transition-all transform hover:-translate-y-1 cursor-pointer">
            Start Your Protection
          </button>
          <button className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm cursor-pointer">
            How it Works
          </button>
        </div>
      </section>

      {/* Path Selection Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight">Who are you protecting today?</h2>
          <p className="text-gray-400 text-lg">Choose a path to receive tailored resources and live alerts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Elderly Card */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center flex flex-col items-center group hover:shadow-2xl hover:border-[#F0EBFF] transition-all duration-300">
            <div className="w-20 h-20 bg-[#F8F7FF] rounded-3xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition-transform duration-300">👴</div>
            <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">Protecting Myself / Elderly</h3>
            <p className="text-gray-500 leading-relaxed mb-10 flex-grow px-2">Specialized guidance on identifying phone impersonators, medical insurance fraud, and banking transfers.</p>
            <button className="w-full bg-[#7042F4] text-white py-4 rounded-2xl font-bold group-hover:bg-[#5B34E5] shadow-lg transition-colors cursor-pointer">
              Enter Senior Hub →
            </button>
          </div>

          {/* Youth Card */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center flex flex-col items-center group hover:shadow-2xl hover:border-[#F0EBFF] transition-all duration-300">
            <div className="w-20 h-20 bg-[#F8F7FF] rounded-3xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition-transform duration-300">🎓</div>
            <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">Protecting Myself / Youth</h3>
            <p className="text-gray-500 leading-relaxed mb-10 flex-grow px-2">Stay safe from social media phishing, gaming currency scams, and deceptive influencer sponsorships.</p>
            <button className="w-full bg-[#7042F4] text-white py-4 rounded-2xl font-bold group-hover:bg-[#5B34E5] shadow-lg transition-colors cursor-pointer">
              Enter Youth Hub →
            </button>
          </div>

          {/* All Scams Card */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center flex flex-col items-center group hover:shadow-2xl hover:border-[#F0EBFF] transition-all duration-300">
            <div className="w-20 h-20 bg-[#F8F7FF] rounded-3xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition-transform duration-300">📁</div>
            <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">Explore All Scams</h3>
            <p className="text-gray-500 leading-relaxed mb-10 flex-grow px-2">Browse our complete database of scam education for all age groups and categories to become a security expert.</p>
            <button className="w-full bg-[#7042F4] text-white py-4 rounded-2xl font-bold group-hover:bg-[#5B34E5] shadow-lg transition-colors cursor-pointer">
              View All Scams 🔍
            </button>
          </div>
        </div>
      </section>

      {/* UPDATED: Scam Alerts Marquee Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="mb-8">
          <h4 className="text-4xl font-black text-[#0F172A] mb-2">Latest Scam Alerts</h4>
          <p className="text-gray-500 font-medium">Real-time fraud reports.</p>
        </div>

        <div className="bg-[#0F172A] rounded-[40px] py-16 overflow-hidden relative marquee-mask">
          <div className="animate-marquee flex gap-8">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <a 
                  key={index}
                  href={alert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-[350px] flex-shrink-0 bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white/10 transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#7042F4]/20 text-[#7042F4] text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider">Official Alert</span>
                  </div>
                  <h5 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-[#7042F4] transition-colors">
                    {alert.title}
                  </h5>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {alert.description}
                  </p>
                  <span className="text-white/40 text-xs font-bold group-hover:text-white transition-colors">
                    Read Full Report →
                  </span>
                </a>
              ))
            ) : (
              // Loading Skeleton Slabs
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[350px] h-[220px] bg-white/5 rounded-[32px] animate-pulse mx-4" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-12 px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
             <Logo />
             <p className="mt-4 text-gray-400 text-sm font-medium">© 2026 Vigiloo - Scam Prevention Network. A non-profit initiative.</p>
          </div>
          <div className="flex space-x-10 text-sm font-bold text-gray-400">
            <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Terms of Service</Link>
            <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}