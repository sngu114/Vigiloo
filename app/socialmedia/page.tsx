"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const PHISHING_LINK = "verification-tiktok.net/apply";

export default function TikTokPractice() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Congratulations! Your account is eligible for the blue verification badge.", sender: "system" },
    { id: 2, text: "Apply now to secure your status and prevent account suspension: verification-tiktok.net/apply", sender: "system" }
  ]);
  const [isPhished, setIsPhished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const renderMessageText = (text: string) => {
    if (!text.includes(PHISHING_LINK)) return text;
    const [before, after] = text.split(PHISHING_LINK);
    return (
      <>
        {before}
        <button
          onClick={() => setIsPhished(true)}
          className="text-blue-400 underline cursor-pointer hover:text-blue-300 font-bold"
        >
          {PHISHING_LINK}
        </button>
        {after}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans antialiased">
      {/* pt-28 ensures it sits below the universal navbar without overlapping */}
      <main className="max-w-4xl mx-auto pt-28 px-6 text-center pb-20">
        <h1 className="text-4xl font-black text-[#0F172A] mb-4">
          TikTok Safety Simulator
        </h1>
        <p className="text-gray-500 mb-12 font-medium">
          Practice identifying phishing links in a safe, controlled environment.
        </p>

        {/* Phone Container */}
        <div className="relative mx-auto w-full max-w-[400px] aspect-[9/16] bg-white rounded-[40px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col">
          
          {/* PHISHED OVERLAY */}
          {isPhished && (
            <div className="absolute inset-0 z-50 bg-[#E11D48] flex flex-col items-center justify-center p-8 text-white text-center">
              <span className="text-6xl mb-6">🚫</span>
              <h2 className="text-3xl font-black mb-4">You've Been Phished!</h2>
              <p className="text-sm font-medium mb-8 leading-relaxed">
                TikTok will never DM you to verify your account. Official verification is only handled through 
                <strong>{"Settings > Account > Verification"}</strong>
              </p>
              <button
                onClick={() => setIsPhished(false)}
                className="bg-white text-[#E11D48] px-8 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* TikTok Header */}
          <div className="bg-black p-4 flex items-center justify-center border-b border-gray-800">
            <div className="text-center">
              <p className="font-black text-sm text-white tracking-widest uppercase">TikTok Verification</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">
                @verification_center_bot
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#121212] scroll-smooth"
          >
            {messages.map((msg) => (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] font-medium shadow-sm bg-[#262626] text-white rounded-tl-none border-l-4 border-[#FE2C55]">
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
          </div>

          {/* Fake Input (Non-functional for this specific scam) */}
          <div className="p-4 bg-black border-t border-gray-800 flex gap-2">
            <div className="flex-1 bg-[#262626] rounded-full px-5 py-3 text-sm text-gray-400 font-semibold">
              Messages are disabled...
            </div>
          </div>
        </div>

        {/* Security Tip Footer */}
        <div className="mt-12 p-6 bg-[#F0EBFF] rounded-3xl border border-[#7042F4]/10 text-left">
          <h3 className="font-bold text-[#7042F4] mb-2 flex items-center gap-2">
            <span>💡</span> Security Tip
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Scammers often pose as "Verification Bots" or "Support Teams." 
            Notice the URL <strong>{PHISHING_LINK}</strong>—TikTok's official domain is <strong>tiktok.com</strong>. 
            Any other variation is a red flag!
          </p>
        </div>
      </main>
    </div>
  );
}