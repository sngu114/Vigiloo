"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import Link from 'next/link';

// 1. Define Types for TypeScript
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

// 2. Define our Scam Scenarios
const SCENARIOS: Record<string, Scenario> = {
  COPYRIGHT: {
    name: "Meta Support",
    handle: "official_help_center",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=support",
    initialMessages: [
      { id: 1, text: "Your account will be disabled in 24 hours due to copyright infringement.", sender: "bot" },
      { id: 2, text: "Please appeal immediately via our secure form.", sender: "bot" }
    ],
    botReply: "Click here to verify your identity and cancel the deletion: bit.ly/ig-appeal-center",
    linkTrigger: "bit.ly/ig-appeal-center",
    tip: "Instagram/Meta will NEVER DM you about copyright. They use official account notifications or email."
  },
  SURPRISE: {
    name: "Old Friend?",
    handle: "user_9921",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    initialMessages: [
      { id: 1, text: "Omg I can't believe you're in this video!! 😱", sender: "bot" },
      { id: 2, text: "Everyone is talking about it in the group chat.", sender: "bot" }
    ],
    botReply: "Did you see it yet? check-this-video.com/watch?v=user",
    linkTrigger: "check-this-video.com/watch?v=user",
    tip: "The 'Look who died' or 'Look who is in this video' scam uses shock to make you click without thinking."
  }
};

export default function InstagramPractice() {
  const [currentType, setCurrentType] = useState<keyof typeof SCENARIOS>("COPYRIGHT");
  const scenario = SCENARIOS[currentType];
  
  const [messages, setMessages] = useState<Message[]>(scenario.initialMessages);
  const [input, setInput] = useState("");
  const [isPhished, setIsPhished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset chat when scenario changes
  useEffect(() => {
    setMessages(scenario.initialMessages);
    setIsPhished(false);
  }, [currentType, scenario.initialMessages]);

  // Auto-scroll to bottom
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
      const reply: Message = { 
        id: Date.now() + 1, 
        text: scenario.botReply, 
        sender: "bot" 
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="font-bold text-xl tracking-tighter">Vigiloo</div>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentType("COPYRIGHT")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${currentType === 'COPYRIGHT' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            Copyright Scam
          </button>
          <button 
            onClick={() => setCurrentType("SURPRISE")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${currentType === 'SURPRISE' ? 'bg-black text-white' : 'bg-gray-100'}`}
          >
            "Shock" Scam
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto pt-10 px-6 pb-20">
        <h1 className="text-3xl font-bold text-center mb-2">Instagram DM Simulator</h1>
        <p className="text-gray-500 text-center mb-8 text-sm">Can you spot the fake link?</p>

        {/* Instagram Phone UI */}
        <div className="relative mx-auto w-full max-w-[360px] aspect-[9/18.5] bg-white rounded-[3rem] shadow-2xl border-[8px] border-black overflow-hidden flex flex-col">
          
          {/* Phished Overlay */}
          {isPhished && (
            <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-8 text-white animate-in fade-in duration-300">
              <span className="text-5xl mb-4">🚨</span>
              <h2 className="text-xl font-bold mb-2">Account Compromised!</h2>
              <p className="text-xs text-gray-400 text-center mb-6 leading-relaxed">
                By clicking that link, you would have been taken to a fake login page. 
                Scammers use these to steal your password and 2FA codes.
              </p>
              <button 
                onClick={() => setIsPhished(false)} 
                className="bg-white text-black px-8 py-2.5 rounded-full font-bold text-xs active:scale-95 transition-transform"
              >
                Try Again
              </button>
            </div>
          )}

          {/* IG Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white">
            <span className="text-xl">←</span>
            <img src={scenario.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
            <div className="text-left flex-1">
              <p className="text-sm font-bold leading-tight">{scenario.name}</p>
              <p className="text-[10px] text-gray-500 font-medium">Active now</p>
            </div>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-2 flex flex-col bg-white">
            {/* Profile Info Header */}
            <div className="py-8 flex flex-col items-center border-b border-gray-50 mb-4">
              <img src={scenario.avatar} alt="Large Avatar" className="w-20 h-20 rounded-full mb-3 shadow-sm" />
              <p className="font-bold text-lg">{scenario.name}</p>
              <p className="text-xs text-gray-500 mb-4">@{scenario.handle} • Instagram</p>
              <button className="bg-gray-100 px-4 py-1 rounded-lg text-xs font-bold">View Profile</button>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-[22px] text-[13px] leading-snug ${
                  msg.sender === 'me' 
                    ? 'bg-[#3797EF] text-white self-end' 
                    : 'bg-[#EFEFEF] text-black self-start'
                }`}>
                  {msg.text.includes(scenario.linkTrigger) ? (
                    <>
                      {msg.text.split(scenario.linkTrigger)[0]}
                      <button 
                        onClick={() => setIsPhished(true)} 
                        className="text-[#00376B] font-bold underline decoration-1 underline-offset-2"
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

          {/* IG Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white">
            <div className="border border-gray-300 rounded-full px-4 py-2.5 flex items-center gap-3">
              <input 
                type="text"
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..." 
                className="flex-1 text-sm outline-none bg-transparent" 
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className={`font-bold text-sm ${input.trim() ? 'text-[#3797EF]' : 'text-blue-200'}`}
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Educational Tip Box */}
        <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100 text-left">
          <h3 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
            <span>🛡️</span> Security Insight
          </h3>
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            {scenario.tip} Look for the <strong>Verified Blue Checkmark</strong> on official accounts, and check if the link actually goes to <em>instagram.com</em>.
          </p>
        </div>
      </main>
    </div>
  );
}