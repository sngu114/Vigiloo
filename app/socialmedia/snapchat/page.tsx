"use client";

import { useState, useRef, useEffect } from "react";

const PHISHING_LINK = "bit.ly/free-snaps-gift";

export default function SnapchatPractice() {
  const [messages, setMessages] = useState([
    { id: 1, text: "heyyyy did you see that link I sent you?", sender: "friend" },
    { id: 2, text: "it's for the free gift card giveaway ", sender: "friend" }
  ]);
  const [input, setInput] = useState("");
  const [isPhished, setIsPhished] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { id: Date.now(), text: input, sender: "me" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/sync/snapchat-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [...messages, userMessage].map((m) => ({
            role: m.sender === "me" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: data.reply, sender: "friend" }]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: "...", sender: "friend" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessageText = (text: string) => {
    if (!text.includes(PHISHING_LINK)) return text;
    const [before, after] = text.split(PHISHING_LINK);
    return (
      <>
        {before}
        <button onClick={() => setIsPhished(true)} className="text-blue-600 underline cursor-pointer hover:text-blue-800">
          {PHISHING_LINK}
        </button>
        {after}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased" style={{ color: 'var(--foreground)' }}>
      <main className="max-w-4xl mx-auto pt-24 px-6 text-center pb-20 relative z-10">
        <h1 className="text-4xl font-black mb-4" style={{ color: 'var(--foreground)' }}>Snapchat Safety Simulator</h1>
        <p className="mb-12 font-medium" style={{ color: 'var(--muted)' }}>Practice identifying phishing links in a safe, controlled environment.</p>

        <div className="relative mx-auto w-full max-w-[400px] aspect-[9/16] rounded-[40px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col backdrop-blur-md bg-white dark:bg-black/80">
          {isPhished && (
            <div className="absolute inset-0 z-50 bg-[#E11D48] flex flex-col items-center justify-center p-8 text-white">
              <span className="text-6xl mb-6">🚫</span>
              <h2 className="text-3xl font-black mb-4">You've Been Phished!</h2>
              <p className="text-sm font-medium mb-8 text-center leading-relaxed">By clicking that link, you would have been sent to a fake login page.</p>
              <button onClick={() => setIsPhished(false)} className="bg-white text-[#E11D48] px-8 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform">Try Again</button>
            </div>
          )}

          <div className="bg-[#FFFC00] p-4 flex items-center gap-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
            <div className="text-left">
              <p className="font-black text-sm text-black">Alex Thompson</p>
              <p className="text-[10px] text-black/60 font-bold uppercase tracking-widest leading-none">Snapchat • Friend</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-white dark:bg-black/20 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] font-bold shadow-sm ${
                  msg.sender === "me" ? "bg-[#00BFFF] text-white rounded-tr-none" : "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-tl-none border-l-4 border-[#FFFC00]"
                }`}>
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-white/10 px-4 py-2.5 rounded-2xl border-l-4 border-[#FFFC00] shadow-sm flex gap-1 items-center h-4">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-black/40 border-t border-gray-100 dark:border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a chat"
              disabled={isTyping}
              className="flex-1 bg-gray-100 dark:bg-white/5 rounded-full px-5 py-3 text-sm text-black dark:text-white font-semibold outline-none focus:ring-2 focus:ring-[#FFFC00] disabled:opacity-50"
            />
            <button type="submit" disabled={isTyping} className="w-12 h-12 bg-[#FFFC00] rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform disabled:opacity-50">
              <span className="text-black text-xl">➔</span>
            </button>
          </form>
        </div>

        <div className="mt-12 p-6 rounded-3xl border backdrop-blur-xl bg-[#7042F4]/10 border-[#7042F4]/20 text-left">
          <h3 className="font-bold text-[#7042F4] mb-2 flex items-center gap-2"><span>💡</span> Security Tip</h3>
          <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--muted)' }}>
            In Snapchat, scammers often use "Sense of Urgency". Shortened links like <strong>bit.ly/free-snaps-gift</strong> hide the real destination.
          </p>
        </div>
      </main>
    </div>
  );
}