"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';

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

const INSTA_SCENARIOS: Record<string, Scenario> = {
  COPYRIGHT: {
    name: "Instagram Help Center",
    handle: "meta_support_help",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=instahelp",
    initialMessages: [
      { id: 1, text: "A post on your account has been reported for Copyright Infringement.", sender: "bot" },
      { id: 2, text: "Your account will be disabled within 24 hours unless you appeal.", sender: "bot" }
    ],
    botReply: "Please fill out the appeal form here to verify ownership: help-meta-support.com/appeals",
    linkTrigger: "help-meta-support.com/appeals",
    tip: "Instagram will never send a DM about copyright. Official notices appear in 'Settings > Help > Support Requests'."
  },
  AMBASSADOR: {
    name: "Luxe Jewelry Co.",
    handle: "luxe_ambassador_scout",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=brand",
    initialMessages: [
      { id: 1, text: "Hey! We love your feed and want you to be a brand ambassador! ✨", sender: "bot" },
      { id: 2, text: "We'll send you 3 items for free, you just pay the small shipping fee.", sender: "bot" }
    ],
    botReply: "Pick your items and use our 'Free' portal: luxe-jewelry-ambassador.net/claim",
    linkTrigger: "luxe-jewelry-ambassador.net/claim",
    tip: "The 'Just Pay Shipping' scam is common. They take your credit card info on the 'shipping' page and never send the items."
  }
};

export default function InstagramPractice() {
  const [currentType, setCurrentType] = useState<keyof typeof INSTA_SCENARIOS>("COPYRIGHT");
  const scenario = INSTA_SCENARIOS[currentType];

  const [messages, setMessages] = useState<Message[]>(scenario.initialMessages);
  const [input, setInput] = useState("");
  const [isPhished, setIsPhished] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(scenario.initialMessages);
    setIsPhished(false);
    setIsTyping(false);
  }, [currentType, scenario.initialMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: "me" };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/sync/instagram-bot", {
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
    } catch (err) {
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
    <div className="min-h-screen bg-transparent font-sans antialiased" style={{ color: 'var(--foreground)' }}>
      <main className="max-w-4xl mx-auto pt-28 px-6 text-center pb-20 relative z-10">
        <h1 className="text-4xl font-black mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Instagram Safety Simulator
        </h1>
        <p className="mb-8 font-medium" style={{ color: 'var(--muted)' }}>
          Practice identifying phishing links in a safe, controlled environment.
        </p>

        {/* Scenario Selector */}
        <div className="flex justify-center gap-3 mb-12">
          {Object.keys(INSTA_SCENARIOS).map((key) => (
            <button
              key={key}
              onClick={() => setCurrentType(key as keyof typeof INSTA_SCENARIOS)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                currentType === key
                  ? 'bg-[#E1306C] text-white shadow-md scale-105'
                  : 'bg-white/10 border border-white/10 text-gray-400 hover:border-[#E1306C]'
              }`}
            >
              {key === 'COPYRIGHT' ? 'Copyright Scam' : 'Ambassador Scam'}
            </button>
          ))}
        </div>

        {/* Phone Frame */}
        <div className="relative mx-auto w-full max-w-[340px] aspect-[9/19] rounded-[3rem] shadow-2xl border-[10px] border-[#0F172A] overflow-hidden flex flex-col backdrop-blur-md bg-white dark:bg-black/80">

          {/* Phished Overlay */}
          {isPhished && (
            <div className="absolute inset-0 z-50 bg-[#E1306C] flex flex-col items-center justify-center p-8 text-white">
              <span className="text-6xl mb-6">🔒</span>
              <h2 className="text-2xl font-black mb-4 text-center">Security Warning!</h2>
              <p className="text-xs font-medium text-center mb-8 leading-relaxed">
                That link was designed to steal your Instagram credentials or credit card info.
                Always check the sender's handle and the URL domain.
              </p>
              <button
                onClick={() => setIsPhished(false)}
                className="bg-white text-[#E1306C] px-10 py-3 rounded-full font-black text-xs shadow-xl active:scale-95 transition-transform"
              >
                Try Again
              </button>
            </div>
          )}

          {/* DM Header */}
          <div className="px-4 py-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-xl font-light text-black dark:text-white">←</span>
            <div className="flex flex-col items-center">
              <p className="text-[14px] font-bold leading-none text-black dark:text-white">{scenario.name}</p>
              <p className="text-[11px] text-gray-400 mt-1">@{scenario.handle}</p>
            </div>
            <div className="flex gap-4">
              <span className="text-lg">📞</span>
              <span className="text-lg">📹</span>
            </div>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col bg-white dark:bg-black/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <img src={scenario.avatar} alt="bot" className="w-7 h-7 rounded-full mr-2 self-end mb-1" />
                )}
                <div className={`max-w-[80%] px-4 py-2.5 rounded-[22px] text-[14px] leading-snug ${
                  msg.sender === 'me'
                    ? 'bg-[#3797F0] text-white'
                    : 'bg-[#EFEFEF] dark:bg-white/10 text-black dark:text-white'
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
                  ) : msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <img src={scenario.avatar} alt="bot" className="w-7 h-7 rounded-full mr-2 self-end mb-1" />
                <div className="bg-[#EFEFEF] dark:bg-white/10 px-4 py-2.5 rounded-[22px]">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-50 dark:border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs">📷</div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              disabled={isTyping}
              className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-full text-sm text-black dark:text-white outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="text-blue-500 font-bold text-sm disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>

        {/* Security Tip */}
        <div className="mt-12 p-6 rounded-3xl border backdrop-blur-xl bg-[#7042F4]/10 border-[#7042F4]/20 text-left">
          <h3 className="font-bold text-[#7042F4] mb-2 flex items-center gap-2">
            <span>💡</span> Vigiloo Security Tip
          </h3>
          <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--muted)' }}>
            {scenario.tip} Look for the <strong>Verified Blue Badge</strong> on brand accounts.
          </p>
        </div>
      </main>
    </div>
  );
}