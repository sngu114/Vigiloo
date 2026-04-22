"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';

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

  useEffect(() => {
    setMessages(scenario.initialMessages);
    setIsPhished(false);
  }, [currentType, scenario.initialMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const [isTyping, setIsTyping] = useState(false);

const handleSendMessage = async (e: FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isTyping) return;

  const userMsg: Message = { id: Date.now(), text: input, sender: "me" };
  const updatedMessages = [...messages, userMsg];
  setMessages(updatedMessages);
  setInput("");
  setIsTyping(true);

  try {
    const response = await fetch("/api/sync/tiktok-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: updatedMessages.map((m) => ({
          role: m.sender === "me" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
        scenarioType: currentType,
      }),
    });

    const data = await response.json();
    setMessages((prev) => [...prev, {
      id: Date.now() + 1,
      text: data.reply,
      sender: "bot",
    }]);
  } catch {
    setMessages((prev) => [...prev, {
      id: Date.now() + 1,
      text: scenario.botReply,
      sender: "bot",
    }]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased">
      <main className="max-w-4xl mx-auto pt-28 px-6 text-center pb-20 relative z-10">
        <h1 className="text-4xl font-black mb-4 uppercase italic tracking-tighter text-[#0F172A] dark:text-white">TikTok Safety Simulator</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium italic">Practice identifying phishing links in a safe, controlled environment.</p>

        {/* Scenario Toggles */}
        <div className="flex justify-center gap-3 mb-12">
          {Object.keys(TIKTOK_SCENARIOS).map((key) => (
            <button 
              key={key}
              onClick={() => setCurrentType(key as keyof typeof TIKTOK_SCENARIOS)}
              className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${currentType === key ? 'bg-[#FE2C55] text-white shadow-lg scale-105' : 'bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 hover:border-[#FE2C55]'}`}
            >
              {key === 'VERIFICATION' ? 'Verification Scam' : 'Giveaway Scam'}
            </button>
          ))}
        </div>

        {/* TikTok Phone UI */}
        <div className="relative mx-auto w-full max-w-[340px] aspect-[9/19] rounded-[3rem] shadow-2xl border-[10px] border-black overflow-hidden flex flex-col backdrop-blur-md bg-white dark:bg-black/80">
          
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
          <div className="px-4 py-4 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
            <span className="text-xl font-bold text-black dark:text-white">⟨</span>
            <div className="flex flex-col items-center">
              <p className="text-[13px] font-bold leading-none text-black dark:text-white">{scenario.name}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-1 tracking-wide">@{scenario.handle}</p>
            </div>
            <span className="text-xl font-bold text-black dark:text-white">⋯</span>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col bg-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <img src={scenario.avatar} alt="bot" className="w-8 h-8 rounded-full mr-2 self-end mb-1 border border-gray-100 dark:border-white/10" />
                )}
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug font-semibold ${
                  msg.sender === 'me' 
                    ? 'bg-[#FE2C55] text-white rounded-br-none' 
                    : 'bg-[#F1F1F2] dark:bg-white/10 text-black dark:text-white rounded-bl-none'
                }`}>
                  {msg.text.includes(scenario.linkTrigger) ? (
                    <>
                      {msg.text.split(scenario.linkTrigger)[0]}
                      <button 
                        onClick={() => setIsPhished(true)} 
                        className="text-blue-600 dark:text-blue-400 font-bold block mt-1 hover:underline text-left"
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
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-3">
            <div className="flex-1 bg-[#F1F1F2] dark:bg-white/5 px-4 py-2.5 rounded-lg text-left">
              <input 
                type="text"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..." 
                className="bg-transparent text-[14px] outline-none w-full text-black dark:text-white font-medium" 
              />
            </div>
            <button 
              type="submit" 
              disabled={!input.trim()}
              className={`text-2xl transition-all ${input.trim() ? 'text-[#FE2C55] scale-110' : 'text-gray-300 dark:text-gray-600 scale-100'}`}
            >
              ➤
            </button>
          </form>
        </div>

        {/* Security Tip Box */}
        <div className="mt-12 p-6 backdrop-blur-xl bg-red-50/10 dark:bg-red-950/20 rounded-2xl border-l-8 border-[#FE2C55] text-left">
          <h3 className="font-black text-xs uppercase italic mb-2 tracking-widest text-[#FE2C55] flex items-center gap-2">
            <span>🛡️</span> Vigiloo Security Insight
          </h3>
          <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed font-bold">
            {scenario.tip} Look for a lack of official verification badges on the profile before trusting links in DMs.
          </p>
        </div>
      </main>
    </div>
  );
}