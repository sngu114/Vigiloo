"use client";

import React from 'react';
import Link from 'next/link';

export default function YouthScamsPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* GRID WRAPPER: Aligns Top Bar with Sidebars */}
        <div className="grid grid-cols-12 gap-12 items-start">
          
          {/* TOP SECTION: Progress Bar + Back Button */}
          <div className="col-span-12 flex items-start gap-4 mb-10">
            {/* Back Button - Sticks out to the left */}
            <div className="w-12 flex-shrink-0">
               <Link href="/lessons">
                <button className="mt-2 w-12 h-12 bg-gray-50 border border-gray-300 rounded-2xl flex items-center justify-center text-xl shadow-sm hover:bg-white hover:border-[#7042F4] text-[#7042F4] transition-all group cursor-pointer">
                  <span className="font-black transform group-hover:-translate-x-1 transition-transform">←</span>
                </button>
              </Link>
            </div>

            {/* Progress Bar Card - Aligned with the sidebar */}
            <div className="flex-grow bg-white rounded-3xl p-6 border border-gray-200/60 shadow-sm flex items-center justify-between">
              <div className="flex-grow max-w-2xl">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-[#7042F4]">Skill Level: Rookie</span>
                  <span className="text-xs font-bold text-gray-400">XP TO LEVEL UP</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#7042F4] h-full w-[40%] rounded-full shadow-[0_0_12px_rgba(112,66,244,0.3)]" />
                </div>
              </div>
              <div className="flex items-center space-x-4 ml-10">
                <div className="bg-purple-50 px-4 py-2 rounded-xl flex items-center space-x-2 border border-purple-100">
                  <span className="text-xl">⚡</span>
                  <span className="font-bold text-[#7042F4] text-sm">5 Day Streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT SIDEBAR: Stats */}
          <div className="col-span-3 space-y-6 sticky top-28">
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200/60 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 tracking-tight">Gamer Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm font-bold">
                    <span>💎</span>
                    <span>Vigiloo Gems</span>
                  </div>
                  <span className="font-black text-gray-900">1,120</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm font-bold">
                    <span>🛡️</span>
                    <span>Shields</span>
                  </div>
                  <span className="font-black text-gray-900">3</span>
                </div>
              </div>
            </div>

            <div className="bg-[#7042F4] rounded-[2rem] p-6 text-white shadow-xl shadow-[#7042F4]/20">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Next Rank</p>
              <h3 className="text-xl font-black mb-3">Digital Ninja</h3>
              <p className="text-xs font-medium opacity-80 mb-6 leading-relaxed">
                Spot 5 "Free Currency" scams to unlock the Ninja profile border!
              </p>
              <button className="w-full bg-white text-[#7042F4] py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors cursor-pointer">
                View Rewards
              </button>
            </div>
          </div>

          {/* CENTER: The Youth Path */}
          <div className="col-span-6 flex flex-col items-center">
            <div className="text-center mb-16">
              <span className="bg-[#F0EBFF] text-[#7042F4] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                Level 1
              </span>
              <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter mb-2">Youth & Gaming</h1>
              <p className="text-gray-500 font-medium text-lg">Protect your accounts and your currency.</p>
            </div>

            <div className="relative w-full max-w-md flex flex-col items-center py-10">
              {/* Central Vertical Path Line */}
              <div className="absolute top-0 bottom-0 w-2 bg-gray-100 left-1/2 -translate-x-1/2 rounded-full" />

              {/* LESSON 1: Active (The Currency Trap) */}
              <div className="relative z-10 mb-24 -translate-x-12 flex flex-col items-center group">
                <button className="w-24 h-24 bg-[#7042F4] rounded-[2.5rem] shadow-[0_8px_0_#5B34E5,0_15px_30px_rgba(112,66,244,0.4)] flex items-center justify-center text-3xl transform active:translate-y-[4px] active:shadow-[0_4px_0_#5B34E5] transition-all cursor-pointer hover:scale-105">
                  🎮
                </button>
                <div className="absolute left-28 top-1/2 -translate-y-1/2 w-48">
                  <h4 className="font-black text-gray-900 text-sm">The "Free Robux" Trap</h4>
                  <p className="text-[10px] font-black text-[#7042F4] uppercase tracking-widest mt-1">Play Now</p>
                </div>
              </div>

              {/* LESSON 2: Locked (Social Media Giveaways) */}
              <div className="relative z-10 mb-24 translate-x-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-sm">
                  🔒
                </div>
                <div className="absolute right-24 top-1/2 -translate-y-1/2 w-48 text-right">
                  <h4 className="font-black text-gray-400 text-sm">Fake Giveaways</h4>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Locked</p>
                </div>
              </div>

              {/* LESSON 3: Locked (Phishing via DMs) */}
              <div className="relative z-10 mb-24 -translate-x-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-sm">
                  🔒
                </div>
                <div className="absolute left-24 top-1/2 -translate-y-1/2 w-48">
                  <h4 className="font-black text-gray-400 text-sm">Suspicious DMs</h4>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Locked</p>
                </div>
              </div>

              {/* CERTIFICATION GOAL */}
              <div className="relative z-10 mt-10">
                <div className="w-28 h-28 rounded-full border-4 border-dashed border-gray-200 flex flex-col items-center justify-center bg-white">
                  <span className="text-2xl mb-1 grayscale opacity-50">🏆</span>
                  <span className="text-[8px] font-black text-gray-300 text-center uppercase leading-tight">Vigiloo<br/>Pro Badge</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Quests & Leaderboard */}
          <div className="col-span-3 space-y-6 sticky top-28">
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200/60 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 tracking-tight">Loot Quests</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-lg">📱</span>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-700">Check 1 Scam News</span>
                      <span className="text-green-500">✅</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 opacity-40">
                  <span className="text-lg">🤺</span>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-700">Win 1 Duel</span>
                      <span className="text-[10px] font-bold text-gray-400">0/1</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#7042F4] h-full w-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-gray-200/60 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 tracking-tight">Top Defended</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "NeonShield", pts: "9,100", me: false },
                  { rank: 2, name: "Cypher", pts: "8,250", me: false },
                  { rank: 14, name: "You", pts: "1,120", me: true },
                ].map((u) => (
                  <div key={u.rank} className={`flex items-center justify-between p-2 rounded-xl ${u.me ? 'bg-[#7042F4]/5 border border-[#7042F4]/10' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-black ${u.me ? 'text-[#7042F4]' : 'text-gray-400'}`}>{u.rank}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <span className={`text-xs font-bold ${u.me ? 'text-[#7042F4]' : 'text-gray-700'}`}>{u.name}</span>
                    </div>
                    <span className="text-xs font-black text-gray-900">{u.pts}</span>
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