"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';

// 1. Define TypeScript Interfaces
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

// 2. TikTok Specific Scenarios
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
    tip: "TikTok will NEVER DM you to offer verification. Official account updates always appear in your 'System Notifications' inside the Inbox tab."
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
    tip: "Scammers use 'Sense of Urgency' (the 30-minute limit) to make you panic and click without checking if the link is real."
  }
};

export default function TikTokPractice() {
  const [currentType, setCurrentType] = useState<keyof typeof TIKTOK_SCENARIOS>("VERIFICATION");
  const scenario = TIKTOK_SCENARIOS[currentType];
  
  const [messages, setMessages] = useState<Message[]>(scenario.initialMessages);
  const [input, setInput] = useState("");
  const [isPhished, setIsPhished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset chat when scenario changes
  useEffect(() => {
    setMessages(scenario.initialMessages);
    setIsPhished(false);
  }, [currentType, scenario.initialMessages]);

  // Auto-scroll logic
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

    // Simulate Bot Reply
    setTimeout(() => {
      const reply: Message = { 
        id: Date.now() + 1, 
        text: scenario.botReply, 
        sender: "bot" 
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Header / Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="font-black text-2xl italic tracking-tighter">Vigiloo</div>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentType("VERIFICATION")}
            className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${currentType === 'VERIFICATION' ? 'bg-[#FE2C55] text-white' : 'bg-gray-100'}`}
          >
            Verification
          </button>
          <button 
            onClick={() => setCurrentType("GIVEAWAY")}
            className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${currentType === 'GIVEAWAY' ? 'bg-[#FE2C55] text-white' : 'bg-gray-100'}`}
          >
            Giveaway
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto pt-8 px-6 pb-20">
        <h1 className="text-2xl font-black text-center mb-8 uppercase italic tracking-tight">TikTok Message Simulator</h1>

        {/* TikTok Phone UI */}
        <div className="relative mx-auto w-full max-w-[340px] aspect-[9/19] bg-white rounded-[3rem] shadow-2xl border-[10px] border-black overflow-hidden flex flex-col">
          
          {/* Phished Overlay */}
          {isPhished && (
            <div className="absolute inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center p-8 text-white animate-in fade-in duration-300">
              <span className="text-6xl mb-6">⚠️</span>
              <h2 className="text-xl font-black mb-2 italic uppercase">Account Warning</h2>
              <p className="text-xs text-gray-400 text-center mb-8 leading-relaxed">
                By clicking that link, you would have been sent to a phishing site designed to hijack your TikTok account and personal data.
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
          <div className="px-4 py-4 border-b border-gray-50 flex items-center justify-between">
            <span className="text-xl cursor-pointer">⟨</span>
            <div className="flex flex-col items-center">
              <p className="text-[13px] font-bold leading-none">{scenario.name}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-1">@{scenario.handle}</p>
            </div>
            <span className="text-xl cursor-pointer">⋯</span>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col bg-white">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <img src={scenario.avatar} alt="bot" className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
                )}
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug font-medium ${
                  msg.sender === 'me' 
                    ? 'bg-[#FE2C55] text-white rounded-br-none' 
                    : 'bg-[#F1F1F2] text-black rounded-bl-none'
                }`}>
                  {msg.text.includes(scenario.linkTrigger) ? (
                    <>
                      {msg.text.split(scenario.linkTrigger)[0]}
                      <button 
                        onClick={() => setIsPhished(true)} 
                        className="text-blue-500 font-bold block mt-1 hover:underline text-left"
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
          <div className="p-4 border-t border-gray-100 flex items-center gap-3 bg-white">
            <div className="flex-1 bg-[#F1F1F2] px-4 py-2.5 rounded-lg">
              <input 
                type="text"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..." 
                className="bg-transparent text-[14px] outline-none w-full text-black" 
                onKeyDown={(e) => { if(e.key === 'Enter') handleSendMessage(e as any); }}
              />
            </div>
            <button 
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className={`text-2xl transition-colors ${input.trim() ? 'text-[#FE2C55]' : 'text-gray-300'}`}
            >
              ➤
            </button>
          </div>
        </div>

        {/* Vigiloo Security Tip */}
        <div className="mt-8 p-6 bg-red-50 rounded-xl border-l-8 border-[#FE2C55]">
          <h3 className="font-black text-xs uppercase italic mb-2 tracking-widest text-[#FE2C55]">
            Vigiloo Security Insight
          </h3>
          <p className="text-[13px] text-gray-700 leading-relaxed font-semibold">
            {scenario.tip}
          </p>
        </div>
      </main>
    </div>
  );
}