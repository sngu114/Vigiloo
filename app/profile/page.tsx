"use client";

import Image from 'next/image';
import { useState } from 'react';

// Sub-components to keep the main return clean and less "AI-nested"
const DetailBox = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
    <div className="p-4 bg-gray-50/50 dark:bg-black/20 border border-gray-100 dark:border-white/10 rounded-xl font-semibold text-gray-700 dark:text-gray-300">
      {value}
    </div>
  </div>
);

export default function ProfilePage() {
  const [user] = useState({
    name: "Mooyah Burger",
    email: "TaiChen@example.com",
    joinedDate: "March 2026",
    bio: "I was born on my birthday."
  });

  const menuItems = [
    { name: 'Account', active: true },
    { name: 'Privacy & Security', active: false },
    { name: 'Settings', active: false },
    { name: 'Help', active: false },
    { name: 'Logout', active: false },
  ];

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased">
      <div className="max-w-6xl mx-auto py-12 px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* LEFT SIDE: Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 px-4 mb-4">
              Dashboard
            </h2>
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  item.active 
                    ? 'bg-[#7042F4] text-white shadow-lg shadow-[#7042F4]/20' 
                    : 'text-[#7042F4] hover:bg-[#7042F4]/5' 
                }`}
              >
                {item.name}
              </button>
            ))}
          </aside>

          {/* RIGHT SIDE: Main Content */}
          <main className="flex-grow">
            {/* Transparent Box with Glassmorphism */}
            <div className="backdrop-blur-md bg-white/5 dark:bg-gray-900/40 border border-gray-200/60 dark:border-white/10 rounded-[32px] p-8 md:p-12 shadow-sm">
              
              {/* Profile Header Section */}
              <header className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-gray-100 dark:border-white/10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-2 border-[#7042F4] p-0.5 overflow-hidden bg-white dark:bg-gray-800">
                    <Image 
                      src="/profileplaceholder.png" 
                      alt="Profile Picture"
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                      onError={(e) => {
                        (e.target as any).src = "https://ui-avatars.com/api/?name=User&background=7042F4&color=fff";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Change</span>
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <h1 className="text-3xl font-black text-[#0F172A] dark:text-white">{user.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">{user.email}</p>
                  <div className="inline-block mt-2 px-3 py-1 bg-[#F0EBFF] dark:bg-[#7042F4]/20 text-[#7042F4] text-xs font-bold rounded-full uppercase tracking-tighter">
                    Member since {user.joinedDate}
                  </div>
                </div>
              </header>

              {/* Account Details Form */}
              <div className="mt-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DetailBox label="Full Name" value={user.name} />
                  <DetailBox label="Email Address" value={user.email} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Bio</label>
                  <div className="p-4 bg-gray-50/50 dark:bg-black/20 border border-gray-100 dark:border-white/10 rounded-xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                    {user.bio}
                  </div>
                </div>

                <button className="bg-[#7042F4] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#5B34E5] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                  Edit Account Info
                </button>
              </div>

            </div>
          </main>

        </div>
      </div>
    </div>
  );
}