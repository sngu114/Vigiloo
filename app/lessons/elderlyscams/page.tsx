"use client";

import React, { useState } from 'react';
import Link from 'next/link';

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
  <div className="flex-1 min-w-[180px]">
    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-2">{title}</h3>
    <div className="space-y-2">
      {users.map((u) => (
        <div key={u.rank} className={`flex items-center justify-between p-2 rounded-xl transition-colors ${u.me ? 'bg-[#7042F4]/10 border border-[#7042F4]/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-black w-4 ${u.me ? 'text-[#7042F4] dark:text-[#A78BFF]' : 'text-slate-400'}`}>{u.rank}</span>
            <span className={`text-xs font-bold ${u.me ? 'text-[#7042F4] dark:text-[#A78BFF]' : 'text-slate-700 dark:text-slate-300'}`}>{u.name}</span>
          </div>
          <span className="text-[10px] font-black text-slate-900 dark:text-slate-100">{u.pts}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function ElderlyScamsPage() {
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  const lessons = [
    { id: 1, points: 25, title: "The Secret Psychology of Digital Thieves", description: "Discover how scammers manipulate your natural instincts of trust and urgency to bypass your defenses.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, points: 30, title: "That Official Email May Be a Trap", description: "A deep dive into 'Phishing'—the art of creating fake messages that look exactly like your bank or the IRS.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 3, points: 40, title: "Don't Answer That 'Emergency' Call", description: "The 'Grandparent Scam' is rising. Learn the immediate steps to verify a caller's identity before sending money.", image: "https://images.unsplash.com/photo-1520923642038-b4259ace9451?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 4, points: 25, title: "The Hidden Risks of Social Sharing", description: "Why your 'Public' posts are a goldmine for impersonators and how to lock down your private information.", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 5, points: 50, title: "How to Spot a Fake Online Store", description: "Thousands of fraudulent websites go live daily. Learn to check for encryption and verified seller badges.", image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 6, points: 75, title: "What to Do If You Are Hacked", description: "Minutes matter. Follow this emergency checklist to freeze your credit and secure your legacy.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 7, points: 35, title: "The New Era of Artificial Intelligence Scams", description: "AI can now mimic voices and faces. Learn how to set up a 'Family Safety Word' for total verification.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 8, points: 25, title: "Protecting Your Digital Estate", description: "Ensure your digital photos, accounts, and passwords are passed down securely to your loved ones.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 9, points: 60, title: "Becoming a Human Firewall", description: "The final test. Combine everything you've learned to spot advanced deception in real-time simulations.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans antialiased pb-20 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="flex flex-col md:flex-row items-start gap-4 mb-16">
          <Link href="/lessons">
            <button className="mt-2 w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-xl shadow-sm hover:border-[#7042F4] text-[#7042F4] transition-all group cursor-pointer">
              <span className="font-black transform group-hover:-translate-x-1 transition-transform">←</span>
            </button>
          </Link>

          <div className="flex-grow w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex flex-col gap-6">
            <XPTracker />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <MiniLeaderboard 
                title="Local Center" 
                users={[
                  { rank: 1, name: "Alice W.", pts: "1,250", me: false },
                  { rank: 2, name: "Steven N.", pts: "1,120", me: true },
                  { rank: 3, name: "Robert T.", pts: "1,100", me: false }
                ]} 
              />
              <MiniLeaderboard 
                title="Regional Guard" 
                users={[
                  { rank: 12, name: "Elena G.", pts: "1,450", me: false },
                  { rank: 18, name: "Steven N.", pts: "1,120", me: true },
                  { rank: 19, name: "Arthur M.", pts: "1,080", me: false }
                ]} 
              />
              <MiniLeaderboard 
                title="Global Defense" 
                users={[
                  { rank: 1, name: "CyberSage", pts: "15,400", me: false },
                  { rank: 42, name: "Steven N.", pts: "1,120", me: true },
                  { rank: 43, name: "Martha K.", pts: "1,115", me: false }
                ]} 
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] dark:text-white tracking-tighter mb-4 uppercase">Elderly Scams</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg md:text-xl italic">Read the headlines. Master the defense. Protect your future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:border-[#7042F4]/30 transition-all flex flex-col relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-[#F0EBFF] dark:bg-[#7042F4]/20 text-[#7042F4] dark:text-[#A78BFF] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                +{lesson.points} XP
              </div>

              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs mb-6">
                {lesson.id}
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 leading-[1.2] tracking-tight uppercase min-h-[3rem]">
                {lesson.title}
              </h3>
              
              <img 
                src={lesson.image} 
                alt={lesson.title} 
                className="w-full h-48 object-cover rounded-2xl mb-6 border border-slate-50 dark:border-slate-800 shadow-sm"
              />

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                {lesson.description}
              </p>

              <button 
                onClick={() => setActiveLesson(lesson)}
                className="mt-auto w-full py-4 bg-[#7042F4] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#5B34E5] transition-colors cursor-pointer"
              >
                Start Lesson
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[#7042F4] rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Academic Goal</p>
            <h3 className="text-3xl font-black mb-4">Vigiloo Security Badge</h3>
            <p className="font-medium opacity-80 leading-relaxed max-w-md">
              Complete the curriculum to finalize your status as a Certified Digital Safety Guardian.
            </p>
          </div>
          <button className="bg-white text-[#7042F4] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors cursor-pointer">
            Claim Certificate
          </button>
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
              <iframe
                src={activeLesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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