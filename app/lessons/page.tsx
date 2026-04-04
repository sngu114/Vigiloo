"use client";

import React from 'react';
import Link from 'next/link';

export default function LessonsHub() {
  return (
    <div className="min-h-screen font-sans antialiased bg-transparent" style={{ color: 'var(--foreground)' }}>
      {/* Hero Header */}
      <section className="pt-20 pb-10 text-center relative z-10">
        <div className="inline-block px-4 py-1.5 mb-6 bg-[#F0EBFF] dark:bg-[#7042F4]/20 text-[#7042F4] rounded-full text-xs font-black uppercase tracking-widest">
          Vigiloo Academy
        </div>
        <h1 className="text-6xl font-black mb-4 tracking-tighter" style={{ color: 'var(--foreground)' }}>
          Choose Your Path
        </h1>
        <p className="text-xl font-medium max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
          Every journey starts with a single step. Select a specialized track to begin your defense training.
        </p>
      </section>

      {/* Path Selection Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {[
            { title: "Senior Defense", icon: "👴", desc: "Specialized guidance on identifying phone impersonators, medical insurance fraud, and banking transfers.", link: "/lessons/elderlyscams" },
            { title: "Youth & Gaming", icon: "🎮", desc: "Stay safe from social media phishing, gaming currency scams, and deceptive influencer sponsorships.", link: "/lessons/youthscams" },
            { title: "General Knowledge", icon: "📁", desc: "Browse our complete database of scam education for all age groups and categories to become a security expert.", link: "/lessons/all" }
          ].map((item) => (
            <div key={item.title} className="p-10 rounded-[40px] border shadow-sm text-center flex flex-col items-center group hover:shadow-2xl transition-all duration-300 backdrop-blur-md bg-white/5 dark:bg-gray-900/40"
              style={{ borderColor: 'var(--card-border)' }}>
              <div className="w-20 h-20 bg-[#F8F7FF] dark:bg-[#7042F4]/10 rounded-3xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
              <p className="leading-relaxed mb-10 flex-grow px-2 font-medium" style={{ color: 'var(--muted)' }}>
                {item.desc}
              </p>
              <Link href={item.link} className="w-full">
                <button className="w-full bg-[#7042F4] text-white py-4 rounded-2xl font-bold hover:bg-[#5B34E5] shadow-lg transition-colors cursor-pointer">
                  Enter Hub →
                </button>
              </Link>
            </div>
          ))}

        </div>
      </section>

      {/* Footer Stats */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center border-t relative z-10" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex justify-center gap-12" style={{ color: 'var(--muted)' }}>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>20+</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Interactive Modules</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>5k+</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Global Students</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>0$</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Always Free</span>
          </div>
        </div>
      </section>
    </div>
  );
}