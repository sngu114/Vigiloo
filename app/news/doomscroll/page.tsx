"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

interface ScamAlert {
  id: string | number;
  title: string;
  description: string;
  link: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DoomscrollPage() {
  const [alerts, setAlerts] = useState<ScamAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      const { data } = await supabase.from('scam_alerts').select('*');
      if (data) {
        setAlerts([...data].sort(() => Math.random() - 0.5));
      }
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  return (
    <div className="h-screen w-full bg-[#0F172A] overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative">
      
      {/* Adjusted Floating Back Button */}
      <div className="fixed top-24 left-10 z-50">
        <Link href="/news">
          <button className="bg-[#7042F4]/20 backdrop-blur-md text-[#F0EBFF] border border-[#7042F4]/30 px-6 py-3 rounded-2xl font-bold hover:bg-[#7042F4] hover:text-white transition-all shadow-xl flex items-center gap-2 cursor-pointer group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> 
            Back to News
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="h-screen flex items-center justify-center text-[#7042F4] font-black text-2xl animate-pulse">
          FETCHING THE TEA...
        </div>
      ) : (
        <>
          <div className="snap-start h-0" />

          {alerts.map((alert) => (
            <section 
              key={alert.id} 
              className="h-screen w-full snap-start flex items-center justify-center p-6 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-[400px] h-[400px] bg-[#7042F4] opacity-10 blur-[120px] rounded-full" />
              </div>

              <div className="max-w-xl w-full bg-white/5 border border-white/10 p-10 rounded-[45px] backdrop-blur-xl shadow-2xl transition-transform hover:scale-[1.01]">
                
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-snug">
                  {alert.title}
                </h2>
                
                <div className="text-gray-300 text-lg leading-relaxed mb-10 font-medium">
                  <p className="mb-4">
                    <span className="text-white font-bold">The Vibe:</span> This one is reaching. Basically, scammers are out here doing too much.
                  </p>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <p className="text-[#7042F4] font-black text-xs uppercase tracking-widest mb-2">TL;DR</p>
                    <p className="text-gray-400 italic">
                      {alert.description.length > 180 ? alert.description.substring(0, 180) + "..." : alert.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-white/10 pt-8">
                  <a 
                    href={alert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white text-[#0F172A] px-8 py-3.5 rounded-2xl font-black hover:bg-[#7042F4] hover:text-white transition-all text-center text-sm shadow-lg shadow-white/5"
                  >
                    Read More 
                  </a>
                  <span className="text-white/20 font-bold text-xs flex items-center gap-2">
                    Keep scrolling <span className="animate-bounce">↓</span>
                  </span>
                </div>
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}