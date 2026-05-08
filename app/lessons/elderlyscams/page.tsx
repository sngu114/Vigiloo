"use client";

import React, { useState, useEffect } from 'react'; // Added useEffect
import Link from 'next/link';
import LessonCard from "@/components/LessonCard";

// Helper for Supabase Video URLs - Fixed path formatting
const getSupabaseVideoUrl = (path: string) => 
  `https://nhkarhhrbyenusvisdzj.supabase.co/storage/v1/object/public/videos/${path}`;

const XPTracker = () => (
  <div className="flex-grow w-full">
    <div className="flex justify-between mb-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-[#7042F4] dark:text-[#A78BFF]">Skill Level: Guardian</span>
      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">XP TO CERTIFICATION</span>
    </div>
    <div className="w-full bg-gray-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
      <div className="bg-[#7042F4] h-full w-[65%] rounded-full shadow-[0_0_15px_rgba(112,66,244,0.4)]" />
    </div>
  </div>
);

const MiniLeaderboard = ({ title, users }: { title: string, users: any[] }) => (
  <div className="flex-1 min-w-[200px]">
    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-2">
      {title}
    </h3>
    <div className="space-y-2">
      {users.map((u) => (
        <div 
          key={u.rank} 
          className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
            u.me 
              ? 'bg-[#7042F4]/10 border border-[#7042F4]/20' 
              : 'hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-black w-4 ${
              u.me ? 'text-[#7042F4] dark:text-[#A78BFF]' : 'text-slate-400'
            }`}>
              {u.rank}
            </span>
            <span className={`text-xs font-bold ${
              u.me ? 'text-[#7042F4] dark:text-[#A78BFF]' : 'text-slate-700 dark:text-slate-300'
            }`}>
              {u.name}
            </span>
          </div>
          <span className="text-[10px] font-black text-slate-900 dark:text-white">
            {u.pts}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function ElderlyScamsPage() {
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  
  // Hydration fix state
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const lessons = [
    { id: 1, points: 25, title: "FBI WARNS OF QR CODE SCAMS", description: "NBC NEWS", image: "https://images.unsplash.com/photo-1600147131759-880e94a6185f?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", videoPath: "qrcodescam.mp4" },
    { id: 2, points: 30, title: "CARD DECLINED SCAM", description: "CBS4", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400", videoPath: "carddeclinedscam.mp4" },
    { id: 3, points: 40, title: "AI PHONE CALL SCAM", description: "TODAY", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400", videoPath: "aiphonecallscam.mp4" },
    { id: 4, points: 25, title: "BITCOIN SCAM", description: "GOOD MORNING AMERICA", image: "https://images.unsplash.com/photo-1623227413711-25ee4388dae3?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", videoPath: "bitcoinscam.mp4" },
    { id: 5, points: 50, title: "CALL IMPERSONATION SCAM", description: "HAWAII NEWS NOW", image: "https://images.unsplash.com/photo-1618590067824-5ba32ca76ce9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", videoPath: "impersonationscam.mp4" },
    { id: 6, points: 75, title: "FAKE ROMANCE SCAM", description: "ABC7 News Bay Area", image: "https://images.unsplash.com/photo-1587483166702-bf9aa66bd791?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", videoPath: "fakeromancescam.mp4" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans antialiased pb-20 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <header className="w-full flex flex-col gap-6 mb-16">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <Link href="/lessons">
              <button className="mt-2 w-12 h-12 v-glass-panel border-2 flex items-center justify-center text-[#7042F4] group border-[#7042F4]">
                <span className="font-black transform group-hover:-translate-x-1 transition-transform">←</span>
              </button>
            </Link>
            
            <div className="flex-grow w-full v-glass-panel p-6 flex flex-col items-center justify-between gap-4">
              <XPTracker />
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <MiniLeaderboard 
                  title="Local Center" 
                  users={[
                    { rank: 1, name: "Alice W.", pts: "1,250", me: false },
                    { rank: 2, name: "You", pts: "1,120", me: true },
                    { rank: 3, name: "Robert T.", pts: "1,100", me: false }
                  ]} 
                />
                <MiniLeaderboard 
                  title="Regional Guard" 
                  users={[
                    { rank: 12, name: "Elena G.", pts: "1,450", me: false },
                    { rank: 18, name: "You", pts: "1,120", me: true },
                    { rank: 19, name: "Arthur M.", pts: "1,080", me: false }
                  ]} 
                />
                <MiniLeaderboard 
                  title="Global Defense" 
                  users={[
                    { rank: 1, name: "CyberSage", pts: "15,400", me: false },
                    { rank: 42, name: "You", pts: "1,120", me: true },
                    { rank: 43, name: "Martha K.", pts: "1,115", me: false }
                  ]} 
                />
              </div>
            </div>
          </div>
        </header>

        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] dark:text-white tracking-tighter mb-4 uppercase">Elderly Scams</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg md:text-xl italic">Read the headlines. Master the defense. Protect your future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              hasMounted={hasMounted}
              onStart={() => setActiveLesson(lesson)}
            />
          ))}
        </div>

        
      </div>

      {activeLesson && (
        <div className="fixed inset-0 bg-slate-900/95 dark:bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-5xl overflow-hidden relative shadow-2xl">
            <button 
              onClick={() => setActiveLesson(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-900 dark:text-white font-black cursor-pointer"
            >
              ✕
            </button>
            <div className="aspect-video w-full bg-black">
              <video
                src={getSupabaseVideoUrl(activeLesson.videoPath)}
                className="w-full h-full"
                controls
                autoPlay
              />
            </div>
            <div className="p-8 md:p-12 bg-white dark:bg-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight uppercase">Lesson #{activeLesson.id}</h3>
                <p className="text-[#7042F4] dark:text-[#A78BFF] font-black text-[10px] uppercase tracking-widest">Digital Defense Academy</p>
              </div>
              <button 
                onClick={() => setShowAssessment(true)}
                className="px-10 py-4 bg-[#7042F4] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#5B34E5] transition-colors"
              >
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssessment && (
        <div className="fixed inset-0 bg-slate-900/95 dark:bg-black/95 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Assessment</h3>
                <p className="text-[10px] font-black text-[#7042F4] uppercase tracking-widest">Lesson #{activeLesson?.id}: Verification</p>
              </div>
              <button 
                onClick={() => setShowAssessment(false)}
                className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-900 dark:text-white font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-12">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-xs">{i + 1}</span>
                    <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-12">
                    {[1, 2, 3, 4].map((opt) => (
                      <button key={opt} className="p-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-[#7042F4] dark:hover:border-[#7042F4] transition-all text-left flex items-center gap-3 group">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-[#7042F4]" />
                        <div className="h-3 w-1/2 bg-slate-50 dark:bg-slate-800/50 rounded-full" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
              <button 
                className="px-12 py-4 bg-[#7042F4] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#5B34E5] shadow-lg shadow-[#7042F4]/20 transition-all"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}