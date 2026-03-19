"use client";

import Logo from '@/components/Logo';
import Link from 'next/link';

export default function SocialMediaHub() {
  const platforms = [
    {
      name: "Instagram",
      imageUrl: "/instagram-preview.png",
      desc: "Practice avoiding common influencer scams and fake giveaway alerts.",
      link: "/socialmedia/instagram",
      color: "bg-pink-50"
    },
    {
      name: "Snapchat",
      imageUrl: "/snapchat-preview.png",
      desc: "Identify vanishing message scams and unauthorized login attempts.",
      link: "/socialmedia/snapchat",
      color: "bg-yellow-50"
    },
    {
      name: "TikTok",
      imageUrl: "/tiktok-preview.png",
      desc: "Identify fake investment schemes and fraudulent brand partnerships.",
      link: "/socialmedia/tiktok",
      color: "bg-blue-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans antialiased text-gray-900">
      {/* FIXED NAVBAR */}
      <nav className="flex items-center justify-between px-12 py-5 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Logo />
        <div className="hidden lg:flex items-center space-x-10 text-sm font-semibold text-gray-600">
          <Link href="/home" className="hover:text-[#7042F4] transition-colors cursor-pointer">Home</Link>
          <Link href="/quiz" className="hover:text-[#7042F4] transition-colors cursor-pointer">Daily Quiz</Link>
          <Link href="/scams/elderly" className="hover:text-[#7042F4] transition-colors cursor-pointer">Elderly Scams</Link>
          <Link href="/scams/youth" className="hover:text-[#7042F4] transition-colors cursor-pointer">Youth Scams</Link>
          <span className="text-[#7042F4] font-bold">Social Media Practice</span>
        </div>
        <Link href="/emergency">
          <button className="bg-[#E11D48] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#BE123C] transition-all cursor-pointer">
            Emergency Help
          </button>
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Breadcrumb style header */}
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Dashboard / <span className="text-[#7042F4]">Practice</span>
        </div>

        <h1 className="text-5xl font-black text-[#0F172A] mb-4">Social Media Practice</h1>
        <p className="text-gray-500 text-lg mb-12 max-w-2xl font-medium">
          Select a platform to practice identifying and avoiding common social media scams in a safe, simulated environment.
        </p>

        {/* The Grid of Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center flex flex-col items-center group hover:shadow-2xl hover:border-[#F0EBFF] transition-all duration-300">
              
              {/* Image Box Replacement */}
              <div 
                className={`w-24 h-24 ${platform.color} rounded-3xl mb-8 overflow-hidden flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300 shadow-inner bg-center bg-cover`}
                style={{
                  backgroundImage: platform.imageUrl ? `url(${platform.imageUrl})` : 'none',
                }}
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
      </main>
    </div>
  );
}