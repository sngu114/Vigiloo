"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function YouthScamsPage() {
  const [activeWorld, setActiveWorld] = useState(1);

  const worlds = [
    { 
      id: 0, 
      name: "Social Media", 
      icon: "📱", 
      color: "#E11D48", 
      desc: "Identify fake giveaways and verify influencers.",
      status: "Locked"
    },
    { 
      id: 1, 
      name: "Gaming Safety", 
      icon: "🎮", 
      color: "#7042F4", 
      desc: "Protect your accounts and digital currency.",
      status: "Active"
    },
    { 
      id: 2, 
      name: "Web Browsing", 
      icon: "🌐", 
      color: "#0EA5E9", 
      desc: "Master the art of spotting phishing links.",
      status: "Locked"
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] font-sans antialiased pb-20 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="grid grid-cols-12 gap-8 items-start relative z-10">
          
          {/* TOP SECTION */}
          <div className="col-span-12 flex flex-col md:flex-row items-start gap-4 mb-10">
            <div className="w-12 flex-shrink-0">
               <Link href="/lessons">
                <button className="mt-2 w-12 h-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center text-xl shadow-sm hover:border-[#7042F4] text-[#7042F4] transition-all group cursor-pointer">
                  <span className="font-black transform group-hover:-translate-x-1 transition-transform">←</span>
                </button>
              </Link>
            </div>

            <div className="flex-grow w-full bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-grow w-full max-w-2xl">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-[#7042F4]">Skill Level: Rookie</span>
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500">XP TO LEVEL UP</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#7042F4] h-full w-[40%] rounded-full shadow-[0_0_15px_rgba(112,66,244,0.4)]" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-[#7042F4]/10 px-4 py-2 rounded-xl flex items-center space-x-2 border border-[#7042F4]/20">
                  <span className="text-xl">⚡</span>
                  <span className="font-bold text-[#7042F4] text-sm whitespace-nowrap">5 Day Streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* WORLD SELECTOR - CENTER MAIN */}
          <div className="col-span-12 lg:col-span-9 flex flex-col items-center justify-center min-h-[50vh] lg:min-h-[60vh] relative py-20">
            
            {/* Dynamic Background Glow */}
            <div 
              className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-[80px] lg:blur-[120px] opacity-10 lg:opacity-20 transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: worlds[activeWorld].color }}
            />

            {/* Selection Area - Removed overflow hidden to prevent clipping bounce */}
            <div className="flex items-center justify-center space-x-4 lg:space-x-12 w-full pt-10">
              {worlds.map((world) => {
                const isActive = activeWorld === world.id;
                return (
                  <div 
                    key={world.id}
                    onClick={() => setActiveWorld(world.id)}
                    className={`relative cursor-pointer transition-all duration-500 flex flex-col items-center flex-shrink-0 ${
                      isActive ? 'scale-105 lg:scale-110 z-20' : 'scale-75 opacity-40 hover:opacity-60 z-10 grayscale'
                    }`}
                  >
                    {/* Floating Island Effect */}
                    <div 
                      className={`w-32 h-32 lg:w-56 lg:h-56 rounded-[2.5rem] lg:rounded-[3rem] flex items-center justify-center text-5xl lg:text-8xl shadow-2xl transition-all duration-500 animate-bounce`}
                      style={{ 
                        backgroundColor: isActive ? '#f8fafc' : '#f1f5f9',
                        border: isActive ? `4px solid ${world.color}` : '4px solid transparent',
                        boxShadow: isActive ? `0 20px 50px ${world.color}33` : 'none',
                        animationDuration: isActive ? '3s' : '5s'
                      }}
                    >
                      <div className="dark:hidden opacity-90">{world.icon}</div>
                      <div className="hidden dark:block opacity-100 filter drop-shadow-md">{world.icon}</div>
                      
                      {isActive && (
                        <>
                           <div className="absolute -top-4 -right-4 animate-ping bg-[#7042F4]/20 w-8 h-8 rounded-full" />
                           <div className="absolute top-10 -left-10 animate-pulse bg-[#7042F4]/10 w-12 h-12 rounded-full" />
                        </>
                      )}
                    </div>

                    {/* Shadow/Pedestal */}
                    <div 
                      className="w-24 h-3 lg:w-48 lg:h-6 mt-12 rounded-[100%] blur-md transition-all duration-500 bg-gray-400 dark:bg-black"
                      style={{ opacity: isActive ? 0.3 : 0.1 }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <div className="mt-8 lg:mt-16 text-center max-w-md px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4 text-gray-900 dark:text-white">
                {worlds[activeWorld].name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-8">
                {worlds[activeWorld].desc}
              </p>
              
              {worlds[activeWorld].status === "Active" ? (
                <button 
                  className="px-10 py-4 rounded-2xl font-black text-white uppercase tracking-widest shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: worlds[activeWorld].color }}
                >
                  Enter World
                </button>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-gray-400 dark:text-gray-500 font-black uppercase tracking-tighter">
                  <span>🔒</span>
                  <span>Complete Level 1 to unlock</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: Leaderboard */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md rounded-[2rem] p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="font-black text-gray-900 dark:text-white mb-4 tracking-tight">Top Defended</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "NeonShield", pts: "9,100", me: false },
                  { rank: 2, name: "Cypher", pts: "8,250", me: false },
                  { rank: 14, name: "You", pts: "1,120", me: true },
                ].map((u) => (
                  <div key={u.rank} className={`flex items-center justify-between p-2 rounded-xl ${u.me ? 'bg-[#7042F4]/10 dark:bg-[#7042F4]/20 border border-[#7042F4]/20 dark:border-[#7042F4]/30' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-black ${u.me ? 'text-[#7042F4]' : 'text-gray-400 dark:text-gray-500'}`}>{u.rank}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                      <span className={`text-xs font-bold ${u.me ? 'text-[#7042F4]' : 'text-gray-700 dark:text-gray-300'}`}>{u.name}</span>
                    </div>
                    <span className="text-xs font-black text-gray-900 dark:text-white">{u.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}