"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Define the shape of your data to stop the "red" TypeScript errors
interface ScamAlert {
  id: string | number;
  title: string;
  description: string;
  link: string;
  published_at: string;
}

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsPage() {
  const [alerts, setAlerts] = useState<ScamAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllAlerts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('scam_alerts')
          .select('*')
          .order('published_at', { ascending: false });
        
        if (error) throw error;
        if (data) setAlerts(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans antialiased text-[#0F172A]">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-sm font-bold text-[#7042F4] uppercase tracking-widest mb-4">
              Vigiloo / <span className="text-gray-400">Live Feed</span>
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-6">
              Recent <span className="text-[#7042F4]">News</span>
            </h1>
            <p className="max-w-2xl text-gray-500 text-xl font-medium leading-relaxed">
              Real-time updates on global fraud trends, phishing campaigns, and digital threats targeting your safety.
            </p>
          </div>

          {/* NEW DOOMSCROLL BUTTON */}
          <Link href="/news/doomscroll">
            <button className="group bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#7042F4] transition-all shadow-lg active:scale-95 cursor-pointer">
              Doomscroll the news
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>
        </div>
      </section>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-[40px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alerts.map((alert) => (
              <a 
                key={alert.id}
                href={alert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-2xl hover:border-[#F0EBFF] transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-[#F0EBFF] text-[#7042F4] text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest">
                    Official Report
                  </span>
                  <span className="text-gray-300 text-xs font-bold">
                    {new Date(alert.published_at).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold mb-4 group-hover:text-[#7042F4] transition-colors leading-tight">
                  {alert.title}
                </h2>

                <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow line-clamp-4">
                  {alert.description}
                </p>

                <div className="flex items-center text-[#7042F4] font-bold text-sm">
                  View Source Details 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && alerts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold text-xl">No recent alerts found. You're safe for now!</p>
          </div>
        )}
      </main>
    </div>
  );
}