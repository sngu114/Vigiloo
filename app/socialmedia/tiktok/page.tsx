"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

// 1. Interfaces
interface Message {
  id: number;
  text: string;
  sender: 'me' | 'bot';
}

interface Scenario {
  name: string;
  handle: string;
  avatar: string;
  initialMessages: Message[];
  botReply: string;
  linkTrigger: string;
  tip: string;
}

// 2. TikTok Scenarios
const TIKTOK_SCENARIOS: Record<string, Scenario> = {
  VERIFICATION: {
    name: "TikTok Verification",
    handle: "verification_center_bot",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=tiktok",
    initialMessages: [
      { id: 1, text: "Congratulations! Your account is eligible for the blue verification badge.", sender: "bot" },
      { id: 2, text: "Apply now to secure your status and prevent account suspension.", sender: "bot" }
    ],
    botReply: "Complete your application here: tiktok-blue-badge.com/apply-now",
    linkTrigger: "tiktok-blue-badge.com/apply-now",
    tip: "TikTok will NEVER DM you to offer verification. Official updates appear in your 'System Notifications' in the Inbox."
  },
  GIVEAWAY: {
    name: "TikTok Rewards",
    handle: "rewards_hub_2026",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=rewards",
    initialMessages: [
      { id: 1, text: "You've been randomly selected to receive 50,000 TikTok Coins! 🎁", sender: "bot" },
      { id: 2, text: "You have 30 minutes to claim before we pick another winner.", sender: "bot" }
    ],
    botReply: "Claim your coins at: bit.ly/free-tt-coins-claim",
    linkTrigger: "bit.ly/free-tt-coins-claim",
    tip: "Scammers use 'Sense of Urgency' (the 30-minute limit) to make you panic and click without thinking."
  }
};

export default function TikTokPractice() {
  const [currentType, setCurrentType] = useState<keyof typeof TIKTOK_SCENARIOS>("VERIFICATION");
  const scenario = TIKTOK_SCENARIOS[currentType];
  
  const [messages, setMessages] = useState<Message[]>(scenario.initialMessages);
  const [input, setInput] = useState("");
  const [isPhished, setIsPhished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync messages when scenario changes
  useEffect(() => {
    setMessages(scenario.initialMessages);
    setIsPhished(false);
  }, [currentType, scenario.initialMessages]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: "me" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        text: scenario.botReply, 
        sender: "bot" 
      }]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans">
      {/* --- ORIGINAL NAV BAR --- */}
      <nav className="flex items-center justify-between px-12 py-5 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Logo /> 
        <div className="hidden lg:flex items-center space-x-10 text-sm font-semibold text-gray-600">
          <Link href="/home" className="hover:text-[#7042F4] transition-colors cursor-pointer font-bold">Home</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Daily Quiz</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Elderly Scams</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Youth Scams</Link>
          <Link href="/socialmedia" className="text-[#7042F4] transition-colors cursor-pointer font-bold">Social Media Practice</Link>
        </div>
        <Link href="/emergency">
          <button className="bg-[#E11D48] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#BE123C] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            Emergency Help
          </button>
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto pt-16 px-6 text-center pb-20">
        {/* --- ORIGINAL HEADINGS --- */}
        <h1 className="text-4xl font-black text-[#0F172A] mb-4 uppercase italic tracking-tighter">TikTok Safety Simulator</h1>
        <p className="text-gray-500 mb-8 font-medium italic">Practice identifying phishing links in a safe, controlled environment.</p>

        {/* Scenario Toggles */}
        <div className="flex justify-center gap-3 mb-12">
          <button 
            onClick={() => setCurrentType("VERIFICATION")}
            className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${currentType === 'VERIFICATION' ? 'bg-[#FE2C55] text-white shadow-lg scale-105' : 'bg-white border border-gray-200 text-gray-400 hover:border-[#FE2C55]'}`}
          >
            Verification Scam
          </button>
          <button 
            onClick={() => setCurrentType("GIVEAWAY")}
            className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${currentType === 'GIVEAWAY' ? 'bg-[#FE2C55] text-white shadow-lg scale-105' : 'bg-white border border-gray-200 text-gray-400 hover:border-[#FE2C55]'}`}
          >
            Giveaway Scam
          </button>
        </div>

        {/* TikTok Phone UI */}
        <div className="relative mx-auto w-full max-w-[340px] aspect-[9/19] bg-white rounded-[3rem] shadow-2xl border-[10px] border-black overflow-hidden flex flex-col">
          
          {/* PHISHED OVERLAY */}
          {isPhished && (
            <div className="absolute inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center p-8 text-white animate-in fade-in duration-300">
              <span className="text-6xl mb-6">⚠️</span>
              <h2 className="text-xl font-black mb-2 italic uppercase">Account Compromised!</h2>
              <p className="text-xs text-gray-400 text-center mb-8 leading-relaxed font-medium">
                That link was designed to steal your TikTok login session. By clicking it, you would have lost access to your account.
              </p>
              <button 
                onClick={() => setIsPhished(false)} 
                className="bg-[#FE2C55] text-white px-10 py-3 rounded-sm font-bold text-xs uppercase active:scale-95 transition-transform"
              >
                Try Again
              </button>
            </div>
          )}

          {/* TikTok Header */}
          <div className="px-4 py-4 border-b border-gray-50 flex items-center justify-between bg-white">
            <span className="text-xl font-bold">⟨</span>
            <div className="flex flex-col items-center">
              <p className="text-[13px] font-bold leading-none">{scenario.name}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-1 tracking-wide">@{scenario.handle}</p>
            </div>
            <span className="text-xl font-bold">⋯</span>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col bg-white">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <img src={scenario.avatar} alt="bot" className="w-8 h-8 rounded-full mr-2 self-end mb-1 border border-gray-100" />
                )}
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug font-semibold ${
                  msg.sender === 'me' 
                    ? 'bg-[#FE2C55] text-white rounded-br-none' 
                    : 'bg-[#F1F1F2] text-black rounded-bl-none'
                }`}>
                  {msg.text.includes(scenario.linkTrigger) ? (
                    <>
                      {msg.text.split(scenario.linkTrigger)[0]}
                      <button 
                        onClick={() => setIsPhished(true)} 
                        className="text-blue-600 font-bold block mt-1 hover:underline text-left"
                      >
                        {scenario.linkTrigger}
                      </button>
                    </>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* TikTok Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 flex items-center gap-3 bg-white">
            <div className="flex-1 bg-[#F1F1F2] px-4 py-2.5 rounded-lg text-left">
              <input 
                type="text"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..." 
                className="bg-transparent text-[14px] outline-none w-full text-black font-medium" 
              />
            </div>
            <button 
              type="submit" 
              disabled={!input.trim()}
              className={`text-2xl transition-all ${input.trim() ? 'text-[#FE2C55] scale-110' : 'text-gray-300 scale-100'}`}
            >
              ➤
            </button>
          </form>
        </div>

        {/* --- ORIGINAL STYLE TIP BOX --- */}
        <div className="mt-12 p-6 bg-red-50 rounded-2xl border-l-8 border-[#FE2C55] text-left">
          <h3 className="font-black text-xs uppercase italic mb-2 tracking-widest text-[#FE2C55] flex items-center gap-2">
            <span>🛡️</span> Vigiloo Security Insight
          </h3>
          <p className="text-[14px] text-gray-700 leading-relaxed font-bold">
            {scenario.tip} Look for a lack of official verification badges on the profile before trusting links in DMs.
          </p>
        </div>
      </main>
    </div>
  );
}