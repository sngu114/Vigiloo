"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';

// --- SUB-COMPONENTS ---

const XPTracker = () => (
  <div className="flex-grow w-full">
    <div className="flex justify-between mb-2">
      <span className="text-xs font-black uppercase tracking-widest text-[#7042F4]">Skill Level: Rookie</span>
      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">XP TO LEVEL UP</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
      <div className="bg-[#7042F4] h-full w-[40%] rounded-full shadow-[0_0_15px_rgba(112,66,244,0.4)]" />
    </div>
  </div>
);

const MiniLeaderboard = ({ title, users }: { title: string, users: any[] }) => (
  <div className="flex-1 min-w-[200px]">
    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 px-2">{title}</h3>
    <div className="space-y-2">
      {users.map((u) => (
        <div key={u.rank} className={`flex items-center justify-between p-2 rounded-xl transition-colors ${u.me ? 'bg-[#7042F4]/10 border border-[#7042F4]/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-black w-4 ${u.me ? 'text-[#7042F4]' : 'text-gray-400'}`}>{u.rank}</span>
            <span className={`text-xs font-bold ${u.me ? 'text-[#7042F4]' : 'text-gray-700 dark:text-gray-300'}`}>{u.name}</span>
          </div>
          <span className="text-[10px] font-black text-gray-900 dark:text-white">{u.pts}</span>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function YouthScamsPage() {
  const [activeWorld, setActiveWorld] = useState(1);
  const [isExploring, setIsExploring] = useState(false);
  const [openLesson, setOpenLesson] = useState<number | null>(null);
  const [brainrotType, setBrainrotType] = useState<'none' | 'subway' | 'minecraft'>('none');

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const stopDragging = () => setIsDragging(false);

  const onDragging = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const worlds = [
    { id: 0, name: "Social Media", icon: "📱", color: "#E11D48", desc: "Identify fake giveaways and verify influencers.", status: "Active", lessons: ["Fake Verified", "The Like Trap", "DM Phishing", "Bot Swarms", "Ad Camouflage", "Data Mining", "The Algorithm Boss"] },
    { id: 1, name: "Gaming Safety", icon: "🎮", color: "#7042F4", desc: "Protect your accounts and digital currency.", status: "Active", lessons: ["Robux Scam 101", "Chat Moderation", "Account Shield", "Currency Scams", "Marketplace VPN", "Trade Bots", "Vault Guardian"] },
    { id: 2, name: "Web Browsing", icon: "🌐", color: "#0EA5E9", desc: "Master the art of spotting phishing links.", status: "Active", lessons: ["URL Anatomy", "SSL Basics", "Popup Blocker", "Email Phishing", "Script Alerts", "Proxy Defense", "Cyber Master"] },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] font-sans antialiased pb-20 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .grab-cursor { cursor: grab; }
        .grab-cursor:active { cursor: grabbing; }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex flex-col space-y-8 relative z-10">
          
          <header className="w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <Link href="/lessons">
                <button className="mt-2 w-12 h-12 v-glass-panel border-2 flex items-center justify-center text-[#7042F4] group" style={{borderColor: worlds[activeWorld].color}}>
                  <span className="font-black transform group-hover:-translate-x-1 transition-transform">←</span>
                </button>
              </Link>
              <div className="flex-grow w-full v-glass-panel p-6 flex flex-col items-center justify-between gap-4">
                <XPTracker />
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <MiniLeaderboard title="Local" users={[{rank: 1, name: "You", pts: "1,120", me: true}, {rank: 2, name: "NeighborBot", pts: "900", me: false}, {rank: 3, name: "LocalGhost", pts: "850", me: false}]} />
                  <MiniLeaderboard title="Regional" users={[{rank: 5, name: "Speedster", pts: "2,400", me: false}, {rank: 8, name: "You", pts: "1,120", me: true}, {rank: 9, name: "BatonRougeHero", pts: "1,100", me: false}]} />
                  <MiniLeaderboard title="Global" users={[{rank: 1, name: "NeonShield", pts: "9,100", me: false}, {rank: 14, name: "You", pts: "1,120", me: true}, {rank: 15, name: "Cypher", pts: "1,110", me: false}]} />
                </div>
              </div>
            </div>
          </header>

          <main className="w-full flex flex-col items-center justify-center min-h-[50vh] relative py-10">
            <div 
              className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-[80px] opacity-10 transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: worlds[activeWorld].color }}
            />

            <div className="flex items-center justify-center space-x-4 lg:space-x-12 w-full pt-10">
              {worlds.map((world) => {
                const isActive = activeWorld === world.id;
                return (
                  <div key={world.id} 
                    onClick={() => {setActiveWorld(world.id); setIsExploring(false); setOpenLesson(null);}} 
                    className={`relative cursor-pointer transition-all duration-500 flex flex-col items-center group ${isActive ? 'scale-105 z-20' : 'scale-75 opacity-40 grayscale'}`}>
                    <div className="w-32 h-32 lg:w-56 lg:h-56 rounded-[2.5rem] flex items-center justify-center text-5xl lg:text-8xl shadow-2xl transition-all duration-500 bg-gray-50 dark:bg-gray-900 group-hover:animate-bounce" 
                      style={{ border: isActive ? `4px solid ${world.color}` : '4px solid transparent' }}>
                      {world.icon}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center max-w-md px-4">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">{worlds[activeWorld].name}</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-8">{worlds[activeWorld].desc}</p>
              
              <button onClick={() => setIsExploring(!isExploring)} className="px-10 py-4 rounded-2xl font-black text-white uppercase tracking-widest shadow-xl transition-transform hover:scale-105 active:scale-95" style={{ backgroundColor: worlds[activeWorld].color }}>
                {isExploring ? "Close Map" : "Enter World"}
              </button>
            </div>

            {isExploring && (
              <div className="mt-16 w-full relative min-h-[400px] animate-in fade-in zoom-in-95 duration-1000">
                <div 
                  ref={scrollRef}
                  onMouseDown={startDragging}
                  onMouseLeave={stopDragging}
                  onMouseUp={stopDragging}
                  onMouseMove={onDragging}
                  className="relative w-full overflow-x-auto no-scrollbar py-20 px-10 grab-cursor select-none"
                >
                  <div className="relative min-w-[1200px] flex items-center justify-between h-[300px]">
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                      <path d="M 50 150 C 150 50, 250 250, 400 150 S 650 50, 800 150 S 1050 250, 1150 150" fill="transparent" stroke={worlds[activeWorld].color} strokeWidth="10" strokeLinecap="round" className="opacity-20 transition-all duration-700" />
                      <path d="M 50 150 C 150 50, 250 250, 400 150 S 650 50, 800 150 S 1050 250, 1150 150" fill="transparent" stroke={worlds[activeWorld].color} strokeWidth="4" strokeDasharray="15,15" strokeLinecap="round" className="opacity-60 transition-all duration-700" />
                    </svg>

                    {worlds[activeWorld].lessons.map((lesson, idx) => {
                      const positions = ["-mt-32", "mt-32", "-mt-16", "mt-16", "-mt-24", "mt-24", "mt-0"];
                      const isCurrent = idx === 0;
                      return (
                        <div key={idx} className={`relative z-10 flex flex-col items-center group transition-all duration-700 ${positions[idx]}`}>
                          <div className="flex space-x-1 mb-2">
                            {[1, 2, 3].map((star) => (
                              <span key={star} className={`text-sm ${isCurrent ? 'text-yellow-400 animate-pulse' : 'text-gray-300 dark:text-gray-700'}`}>★</span>
                            ))}
                          </div>
                          
                          <button onClick={() => setOpenLesson(idx)} className={`relative flex items-center justify-center transition-all duration-300 transform hover:scale-110 w-20 h-20 ${isCurrent ? 'scale-110' : 'grayscale opacity-60'}`}>
                            <div className="absolute inset-0 rounded-[2rem] rotate-12 opacity-20" style={{ backgroundColor: isCurrent ? worlds[activeWorld].color : '#1e293b' }} />
                            <div className={`w-full h-full rounded-[1.8rem] flex flex-col items-center justify-center border-b-8 border-r-4 ${isCurrent ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'}`} style={{ borderColor: isCurrent ? worlds[activeWorld].color : '#0f172a' }}>
                              <span className="text-2xl font-black">{idx + 1}</span>
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

                {/* Refined Lesson Content Area: Balanced & Responsive */}
                {openLesson !== null && (
                  <div className="w-full mt-20 relative animate-in slide-in-from-bottom-10 duration-500 flex justify-center px-4">
                    <div className="flex flex-col lg:flex-row gap-8 items-start relative max-w-[1200px] w-full"> 
                      
                      {/* Scaled Lesson Container */}
                      <div className="flex-grow w-full lg:w-[70%] p-6 md:p-10 v-glass-panel border-4 rounded-[2.5rem]" style={{borderColor: worlds[activeWorld].color}}>
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight">Lesson {openLesson + 1}: {worlds[activeWorld].lessons[openLesson]}</h3>
                          <button onClick={() => {setOpenLesson(null); setBrainrotType('none');}} className="text-gray-400 hover:text-white text-2xl font-black">✕</button>
                        </div>
                        
                        <div className="flex flex-col gap-2"> 
                          {/* Main Video Box */}
                          <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-black border-4 border-gray-800 relative shadow-xl">
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
                              <span className="text-6xl mb-4">🎥</span>
                              <p className="text-lg font-bold uppercase tracking-widest">Main Lesson Content</p>
                            </div>
                          </div>

                          {/* Attention Span Video */}
                          {brainrotType !== 'none' && (
                            <div className="animate-in slide-in-from-top-2 duration-500">
                              <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-gray-900 border-4 border-gray-800 relative shadow-lg mb-4">
                                 <div className="w-full h-full flex items-center justify-center bg-black/40 text-md font-bold text-green-500 text-center">
                                   {brainrotType === 'subway' ? '🎮 SUBWAY SURFERS ACTIVE' : '⛏️ MINECRAFT PARKOUR ACTIVE'}
                                 </div>
                              </div>
                              <div className="flex items-center justify-center space-x-2">
                                <span className="bg-green-500 w-2 h-2 rounded-full animate-ping" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">
                                  {brainrotType === 'subway' ? 'Subway Surfers Active' : 'Minecraft Parkour Active'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Controls Sidebar */}
                      <div className="w-full lg:w-48 flex flex-col gap-3 h-fit lg:mt-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center lg:text-left px-2">Attention Span Mode</span>
                        <button 
                          onClick={() => setBrainrotType(brainrotType === 'subway' ? 'none' : 'subway')}
                          className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg border-2 transition-all ${brainrotType === 'subway' ? 'bg-green-500 text-white border-green-400' : 'bg-gray-100 dark:bg-gray-800 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                          Subway Surfers
                        </button>
                        <button 
                          onClick={() => setBrainrotType(brainrotType === 'minecraft' ? 'none' : 'minecraft')}
                          className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg border-2 transition-all ${brainrotType === 'minecraft' ? 'bg-green-500 text-white border-green-400' : 'bg-gray-100 dark:bg-gray-800 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                          Minecraft Parkour
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}