"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// --- SUB-COMPONENTS ---

const XPTracker = () => (
  <div className="flex-grow w-full max-w-2xl">
    <div className="flex justify-between mb-2">
      <span className="text-xs font-black uppercase tracking-widest text-[#7042F4]">Skill Level: Rookie</span>
      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">XP TO LEVEL UP</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
      <div className="bg-[#7042F4] h-full w-[40%] rounded-full shadow-[0_0_15px_rgba(112,66,244,0.4)]" />
    </div>
  </div>
);

const LeaderboardRow = ({ u }: { u: any }) => (
  <div className={`flex items-center justify-between p-3 rounded-2xl transition-colors ${u.me ? 'bg-[#7042F4]/10 border border-[#7042F4]/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
    <div className="flex items-center space-x-3">
      <span className={`text-[10px] font-black w-4 ${u.me ? 'text-[#7042F4]' : 'text-gray-400'}`}>{u.rank}</span>
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
      <span className={`text-xs font-bold ${u.me ? 'text-[#7042F4]' : 'text-gray-700 dark:text-gray-300'}`}>{u.name}</span>
    </div>
    <span className="text-xs font-black text-gray-900 dark:text-white">{u.pts}</span>
  </div>
);

// --- MAIN PAGE ---

export default function YouthScamsPage() {
  const [activeWorld, setActiveWorld] = useState(1);
  const [isExploring, setIsExploring] = useState(false);

  const worlds = [
    { id: 0, name: "Social Media", icon: "📱", color: "#E11D48", desc: "Identify fake giveaways and verify influencers.", status: "Locked", lessons: ["Profile Verifier", "Link Detective", "DM Safety", "Ad Spotter", "Influencer Check", "Giveaway Trap", "Final Boss"] },
    { id: 1, name: "Gaming Safety", icon: "🎮", color: "#7042F4", desc: "Protect your accounts and digital currency.", status: "Active", lessons: ["Skin Trading 101", "Chat Moderation", "Account Shield", "Currency Scams", "Marketplace VPN", "Trade Bots", "Vault Guardian"] },
    { id: 2, name: "Web Browsing", icon: "🌐", color: "#0EA5E9", desc: "Master the art of spotting phishing links.", status: "Locked", lessons: ["URL Anatomy", "SSL Basics", "Popup Blocker", "Email Phishing", "Script Alerts", "Proxy Defense", "Cyber Master"] },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] font-sans antialiased pb-20 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-12 gap-8 items-start relative z-10">
          
          <header className="col-span-12 flex flex-col md:flex-row items-start gap-4 mb-10">
            <Link href="/lessons">
              <button className="mt-2 w-12 h-12 v-glass-panel flex items-center justify-center text-[#7042F4] group">
                <span className="font-black transform group-hover:-translate-x-1 transition-transform">←</span>
              </button>
            </Link>
            <div className="flex-grow w-full v-glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <XPTracker />
              <div className="bg-[#7042F4]/10 px-4 py-2 rounded-xl flex items-center space-x-2 border border-[#7042F4]/20">
                <span className="text-xl">⚡</span>
                <span className="font-bold text-[#7042F4] text-sm whitespace-nowrap">5 Day Streak</span>
              </div>
            </div>
          </header>

          {/* ASIDE/LEADERBOARD - Moved to order-1 on mobile to appear above world selection */}
          <aside className="order-1 lg:order-2 col-span-12 lg:col-span-3">
            <div className="v-glass-panel p-8">
              <h3 className="font-black text-gray-900 dark:text-white mb-6 text-sm uppercase text-center lg:text-left">Global Rankings</h3>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "NeonShield", pts: "9,100", me: false },
                  { rank: 2, name: "Cypher", pts: "8,250", me: false },
                  { rank: 14, name: "You", pts: "1,120", me: true },
                ].map((u) => <LeaderboardRow key={u.rank} u={u} />)}
              </div>
            </div>
          </aside>

          {/* MAIN WORLD SELECTOR - Set to order-2 on mobile */}
          <main className="order-2 lg:order-1 col-span-12 lg:col-span-9 flex flex-col items-center justify-center min-h-[50vh] relative py-20">
            <div 
              className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-[80px] opacity-10 transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: worlds[activeWorld].color }}
            />

            <div className="flex items-center justify-center space-x-4 lg:space-x-12 w-full pt-10">
              {worlds.map((world) => {
                const isActive = activeWorld === world.id;
                return (
                  <div key={world.id} onClick={() => {setActiveWorld(world.id); setIsExploring(false);}} className={`relative cursor-pointer transition-all duration-500 flex flex-col items-center ${isActive ? 'scale-105 z-20' : 'scale-75 opacity-40 grayscale'}`}>
                    <div className="w-32 h-32 lg:w-56 lg:h-56 rounded-[2.5rem] flex items-center justify-center text-5xl lg:text-8xl shadow-2xl transition-all duration-500 animate-bounce bg-gray-50 dark:bg-gray-900" style={{ border: isActive ? `4px solid ${world.color}` : '4px solid transparent' }}>
                      {world.icon}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center max-w-md px-4">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">{worlds[activeWorld].name}</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-8">{worlds[activeWorld].desc}</p>
              
              {worlds[activeWorld].status === "Active" ? (
                <button onClick={() => setIsExploring(!isExploring)} className="px-10 py-4 rounded-2xl font-black text-white uppercase tracking-widest shadow-xl transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: worlds[activeWorld].color }}>
                  {isExploring ? "Close Map" : "Enter World"}
                </button>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-gray-400 font-black uppercase tracking-tighter">
                  <span>🔒 Complete Level 1 to unlock</span>
                </div>
              )}
            </div>

            {isExploring && (
              <div className="mt-16 w-full relative min-h-[400px] animate-in fade-in zoom-in-95 duration-1000">
                <div className="relative w-full overflow-x-auto no-scrollbar py-20 px-10">
                  <div className="relative min-w-[1200px] flex items-center justify-between h-[300px]">
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                      <path d="M 50 150 C 150 50, 250 250, 400 150 S 650 50, 800 150 S 1050 250, 1150 150" fill="transparent" stroke={worlds[activeWorld].color} strokeWidth="10" strokeLinecap="round" className="opacity-20 transition-all duration-700" />
                      <path d="M 50 150 C 150 50, 250 250, 400 150 S 650 50, 800 150 S 1050 250, 1150 150" fill="transparent" stroke={worlds[activeWorld].color} strokeWidth="4" strokeDasharray="15,15" strokeLinecap="round" className="opacity-60 transition-all duration-700" />
                    </svg>

                    {worlds[activeWorld].lessons.map((lesson, idx) => {
                      const positions = ["-mt-32", "mt-32", "-mt-16", "mt-16", "-mt-24", "mt-24", "mt-0"];
                      const isCurrent = idx === 0;
                      const isBoss = idx === worlds[activeWorld].lessons.length - 1;
                      return (
                        <div key={idx} className={`relative z-10 flex flex-col items-center group transition-all duration-700 ${positions[idx]}`}>
                          {/* 3 Stars Added Back Here */}
                          <div className="flex space-x-1 mb-2">
                            {[1, 2, 3].map((star) => (
                              <span key={star} className={`text-sm ${isCurrent ? 'text-yellow-400 animate-pulse' : 'text-gray-300 dark:text-gray-700'}`}>★</span>
                            ))}
                          </div>
                          
                          <button className={`relative flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${isBoss ? 'w-28 h-28' : 'w-20 h-20'} ${isCurrent ? 'scale-110' : 'grayscale opacity-60'}`}>
                            <div className="absolute inset-0 rounded-[2rem] rotate-12 opacity-20" style={{ backgroundColor: isCurrent ? worlds[activeWorld].color : '#1e293b' }} />
                            <div className={`w-full h-full rounded-[1.8rem] flex flex-col items-center justify-center border-b-8 border-r-4 ${isCurrent ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'}`} style={{ borderColor: isCurrent ? worlds[activeWorld].color : '#0f172a' }}>
                              <span className="text-2xl font-black">{isBoss ? "🚩" : idx + 1}</span>
                            </div>
                          </button>
                          <div className="absolute -bottom-12 whitespace-nowrap text-center">
                            <h4 className={`text-xs font-bold ${isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{lesson}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}