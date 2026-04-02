"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function SocialMediaHub() {
  // Placeholder data for Flashcards
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const placeholderFlashcards = [
    { term: "Phishing", definition: "A scam where attackers send fake emails or messages to trick you into revealing sensitive info." },
    { term: "2FA", definition: "Two-Factor Authentication: Adding a second layer of security beyond just a password." },
    { term: "Social Engineering", definition: "Manipulating people into giving up confidential information through psychological trickery." },
  ];

  const platforms = [
    {
      name: "Instagram",
      imageUrl: "/instagram.png",
      desc: "Practice avoiding common influencer scams and fake giveaway alerts.",
      link: "/socialmedia/instagram",
      color: "bg-pink-50"
    },
    {
      name: "Snapchat",
      imageUrl: "/snapchat.png",
      desc: "Identify vanishing message scams and unauthorized login attempts.",
      link: "/socialmedia/snapchat",
      color: "bg-yellow-50"
    },
    {
      name: "TikTok",
      imageUrl: "/tiktok.png",
      desc: "Identify fake investment schemes and fraudulent brand partnerships.",
      link: "/socialmedia/tiktok",
      color: "bg-blue-50"
    }
  ];

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % placeholderFlashcards.length);
  };

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Dashboard / <span className="text-[#7042F4]">Practice</span>
        </div>

        <h1 className="text-5xl font-black text-[#0F172A] mb-4">Social Media Practice</h1>
        <p className="text-gray-500 text-lg mb-12 max-w-2xl font-medium">
          Select a platform to practice identifying and avoiding common social media scams in a safe, simulated environment.
        </p>

        {/* The Grid of Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center flex flex-col items-center group hover:shadow-2xl hover:border-[#F0EBFF] transition-all duration-300">
              <div 
                className={`w-24 h-24 ${platform.color} rounded-3xl mb-8 overflow-hidden flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300 shadow-inner bg-center bg-cover`}
                style={{ backgroundImage: platform.imageUrl ? `url(${platform.imageUrl})` : 'none' }}
              >
                {!platform.imageUrl && <span className="text-gray-300 text-xs text-center px-2 font-bold">No Image Found</span>}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">{platform.name}</h3>
              <p className="text-gray-500 leading-relaxed mb-10 flex-grow px-2 font-medium">{platform.desc}</p>
              <Link href={platform.link} className="w-full">
                <button className="w-full bg-[#7042F4] text-white py-4 rounded-2xl font-bold group-hover:bg-[#5B34E5] shadow-lg transition-colors cursor-pointer">
                  Practice →
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* add an api to do random flashcards or make a separate section maybe idk. 
        right now its just hard coded as placeholders - steven */}
        
        {/* NEW SECTION: Flashcards */}
        <section className="border-t border-gray-100 pt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0F172A] mb-4">Master the Terms</h2>
            <p className="text-gray-500 font-medium">Quick-fire flashcards to learn essential cybersecurity jargon.</p>
          </div>

          <div className="flex flex-col items-center">
            {/* Flashcard Display */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-lg h-64 perspective-1000 cursor-pointer group mb-8"
            >
              <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white border-2 border-[#F0EBFF] rounded-[32px] flex items-center justify-center p-8 shadow-sm group-hover:shadow-md transition-shadow">
                  <h3 className="text-3xl font-black text-[#7042F4] tracking-tight">
                    {placeholderFlashcards[currentCard].term}
                  </h3>
                  <span className="absolute bottom-6 text-[10px] font-black text-gray-300 uppercase tracking-widest">Click to Flip</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#7042F4] rounded-[32px] flex items-center justify-center p-8 text-center">
                  <p className="text-white text-lg font-bold leading-relaxed">
                    {placeholderFlashcards[currentCard].definition}
                  </p>
                </div>
              </div>
            </div>

            {/* Flashcard Action Button */}
            <button 
              onClick={nextCard}
              className="bg-[#7042F4] text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#7042F4]/20 hover:bg-[#5B34E5] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-3"
            >
              Next Flashcard
              <span className="text-xl">→</span>
            </button>
          </div>
        </section>
      </main>

      {/* Added CSS for the flip effect */}
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}