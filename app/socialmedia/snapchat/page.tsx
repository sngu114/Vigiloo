"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/sync/snapchat-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: updatedMessages.map((m) => ({
            role: m.sender === "me" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        }),
      });

      const data = await response.json();
      const botReply = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "friend",
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "...", sender: "friend" },
      ]);
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
        <button
          onClick={() => setIsPhished(true)}
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
        >
          {PHISHING_LINK}
        </button>
        {after}
      </>
    );
  };

  return (
    // Replaced navigation block with a simple container to allow the universal navbar to shine
    <div className="min-h-screen bg-[#FDFDFF] font-sans antialiased">
      
      <main className="max-w-4xl mx-auto pt-16 px-6 text-center pb-20">
        <h1 className="text-4xl font-black text-[#0F172A] mb-4">
          Snapchat Safety Simulator
        </h1>
        <p className="text-gray-500 mb-12 font-medium">
          Practice identifying phishing links in a safe, controlled environment.
        </p>

        <div className="relative mx-auto w-full max-w-[400px] aspect-[9/16] bg-white rounded-[40px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col">
          {/* PHISHED OVERLAY */}
          {isPhished && (
            <div className="absolute inset-0 z-50 bg-[#E11D48] flex flex-col items-center justify-center p-8 text-white">
              <span className="text-6xl mb-6">🚫</span>
              <h2 className="text-3xl font-black mb-4">You've Been Phished!</h2>
              <p className="text-sm font-medium mb-8 leading-relaxed text-center">
                By clicking that link, you would have been sent to a fake login
                page designed to steal your Snapchat account.
              </p>
              <button
                onClick={() => setIsPhished(false)}
                className="bg-white text-[#E11D48] px-8 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Phone Header */}
          <div className="bg-[#FFFC00] p-4 flex items-center gap-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Avatar"
              />
            </div>
            <div className="text-left">
              <p className="font-black text-sm text-black">Alex Thompson</p>
              <p className="text-[10px] text-black/60 font-bold uppercase tracking-widest leading-none">
                Snapchat • Friend
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-white scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] font-bold shadow-sm ${
                    msg.sender === "me"
                      ? "bg-[#00BFFF] text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none border-l-4 border-[#FFFC00]"
                  }`}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-tl-none border-l-4 border-[#FFFC00] px-4 py-2.5 rounded-2xl shadow-sm">
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
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-100 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a chat"
              disabled={isTyping}
              className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 text-sm text-black font-semibold focus:ring-2 focus:ring-[#FFFC00] outline-none transition-all placeholder:text-gray-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="w-12 h-12 bg-[#FFFC00] rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform disabled:opacity-50 cursor-pointer"
            >
              <span className="text-black text-xl">➔</span>
            </button>
          </form>
        </div>

        {/* Security Tip Footer */}
        <div className="mt-12 p-6 bg-[#F0EBFF] rounded-3xl border border-[#7042F4]/10 text-left">
          <h3 className="font-bold text-[#7042F4] mb-2 flex items-center gap-2">
            <span>💡</span> Security Tip
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            In Snapchat, scammers often use "Sense of Urgency" or "Too Good to
            be True" offers. Notice the link{" "}
            <strong>bit.ly/free-snaps-gift</strong> — shortened links are common
            tools used to hide the real destination of a phishing site.
          </p>
        </div>
      </main>
    </div>
  );
}