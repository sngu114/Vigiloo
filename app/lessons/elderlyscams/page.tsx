"use client";

import React from 'react';
import Link from 'next/link';

export default function ElderlyScamsPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* TOP SECTION: Back Button + Progress Bar */}
        <div className="flex items-start gap-4 mb-10">
          {/* Back Button - Increased visibility */}
          <Link href="/lessons">
            <button className="mt-2 w-12 h-12 bg-gray-50 border border-gray-300 rounded-2xl flex items-center justify-center text-xl shadow-sm hover:bg-white hover:border-[#7042F4] text-[#7042F4] transition-all group cursor-pointer">
              <span className="font-black transform group-hover:-translate-x-1 transition-transform">←</span>
            </button>
          </Link>

          {/* Progress Bar Card */}
          <div className="flex-grow bg-white rounded-3xl p-6 border border-gray-200/60 shadow-sm flex items-center justify-between">
            <div className="flex-grow max-w-2xl">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#7042F4]">Vigiloo Progress</span>
                <span className="text-xs font-bold text-gray-400">65% TO CERTIFICATION</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-[#7042F4] h-full w-[65%] rounded-full shadow-[0_0_12px_rgba(112,66,244,0.3)]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-10">
              <div className="bg-orange-50 px-4 py-2 rounded-xl flex items-center space-x-2 border border-orange-100">
                <span className="text-xl">🔥</span>
                <span className="font-bold text-orange-600 text-sm">12 Day Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* ... Rest of your component remains exactly the same ... */}
        <div className="grid grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR: Stats */}
          <div className="col-span-3 space-y-6 sticky top-28">
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200/60 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 tracking-tight">Vigiloo Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm font-bold">
                    <span>⭐</span>
                    <span>Total Points</span>
                  </div>
                  <span className="font-black text-gray-900">2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm font-bold">
                    <span>🏆</span>
                    <span>Badges</span>
                  </div>
                  <span className="font-black text-gray-900">8</span>
                </div>
              </div>
            </div>

            <div className="bg-[#7042F4] rounded-[2rem] p-6 text-white shadow-xl shadow-[#7042F4]/20">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Next Milestone</p>
              <h3 className="text-xl font-black mb-3">Identity Guard</h3>
              <p className="text-xs font-medium opacity-80 mb-6 leading-relaxed">
                Complete 3 more Vigiloo lessons to earn the advanced security badge.
              </p>
              <button className="w-full bg-white text-[#7042F4] py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors cursor-pointer">
                View Badges
              </button>
            </div>
          </div>

          {/* CENTER: The Lesson Path */}
          <div className="col-span-6 flex flex-col items-center">
            <div className="text-center mb-16">
              <span className="bg-[#F0EBFF] text-[#7042F4] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                Level 1
              </span>
              <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter mb-2">Elderly Scams</h1>
              <p className="text-gray-500 font-medium text-lg">Master the art of spotting online deception.</p>
            </div>

            <div className="relative w-full max-w-md flex flex-col items-center py-10">
              {/* Central Vertical Path Line */}
              <div className="absolute top-0 bottom-0 w-2 bg-gray-100 left-1/2 -translate-x-1/2 rounded-full" />

              {/* LESSON 1: Active (Zig-Zag Left) */}
              <div className="relative z-10 mb-24 -translate-x-12 flex flex-col items-center group">
                <button className="w-24 h-24 bg-[#7042F4] rounded-[2.5rem] shadow-[0_8px_0_#5B34E5,0_15px_30px_rgba(112,66,244,0.4)] flex items-center justify-center text-3xl transform active:translate-y-[4px] active:shadow-[0_4px_0_#5B34E5] transition-all cursor-pointer">
                  ▶️
                </button>
                <div className="absolute left-28 top-1/2 -translate-y-1/2 w-48">
                  <h4 className="font-black text-gray-900 text-sm">Introduction to Scams</h4>
                  <p className="text-[10px] font-black text-[#7042F4] uppercase tracking-widest mt-1">Start Now</p>
                </div>
              </div>

              {/* LESSON 2: Locked (Zig-Zag Right) */}
              <div className="relative z-10 mb-24 translate-x-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-sm">
                  🔒
                </div>
                <div className="absolute right-24 top-1/2 -translate-y-1/2 w-48 text-right">
                  <h4 className="font-black text-gray-400 text-sm">Email Phishing</h4>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Locked</p>
                </div>
              </div>

              {/* LESSON 3: Locked (Zig-Zag Left) */}
              <div className="relative z-10 mb-24 -translate-x-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-sm">
                  🔒
                </div>
                <div className="absolute left-24 top-1/2 -translate-y-1/2 w-48">
                  <h4 className="font-black text-gray-400 text-sm">Phone Scams</h4>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">Locked</p>
                </div>
              </div>

              {/* CERTIFICATION GOAL */}
              <div className="relative z-10 mt-10">
                <div className="w-28 h-28 rounded-full border-4 border-dashed border-gray-200 flex flex-col items-center justify-center bg-white">
                  <span className="text-2xl mb-1 grayscale opacity-50">🎓</span>
                  <span className="text-[8px] font-black text-gray-300 text-center uppercase leading-tight">Vigiloo<br/>Certification</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Quests & Leaderboard */}
          <div className="col-span-3 space-y-6 sticky top-28">
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200/60 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4 tracking-tight">Daily Quests</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-lg">📖</span>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-700">Read 1 Article</span>
                      <span className="text-green-500">✅</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 opacity-40">
                  <span className="text-lg">🎯</span>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-700">Perfect Quiz</span>
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
              <h3 className="font-black text-gray-900 mb-4 tracking-tight">Leaderboard</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Alex Riva", pts: "4,820", me: false },
                  { rank: 2, name: "Sarah K.", pts: "4,550", me: false },
                  { rank: 14, name: "You", pts: "2,450", me: true },
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