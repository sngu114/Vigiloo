"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);
  const [activeTab, setActiveTab] = useState('Account');
  
  const [user, setUser] = useState({
    name: "Mooyah Burger",
    email: "TaiChen@example.com",
    joinedDate: "March 2026",
    bio: "I was born on my birthday.",
    password: "",
    recoveryEmail: "recovery@example.com",
    trackMe: false,
    locationData: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCheckbox = (name: string) => {
    if (!isEditingPrivacy) return;
    setUser((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  const menuItems = [
    { name: 'Account' },
    { name: 'Privacy & Security' },
    { name: 'Settings' },
    { name: 'Help' },
    { name: 'Logout' },
  ];

  const faqs = [
    { q: "How do I change my profile picture?", a: "Hover over your current avatar in the Account tab and click 'Change' to upload a new image." },
    { q: "Is my data encrypted?", a: "Yes, Vigiloo uses industry-standard end-to-end encryption for all stored user data." },
    { q: "How do I delete my account?", a: "Account deletion can be requested via the Settings tab under 'Danger Zone'." },
    { q: "Who can see my bio?", a: "Your bio is currently set to private and is only visible to you and authorized Team 4 moderators." }
  ];

  const handleNavigation = (name: string) => {
    if (name === 'Logout') {
      router.push('/');
    } else {
      setActiveTab(name);
      setIsEditing(false);
      setIsEditingPrivacy(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased">
      <div className="max-w-6xl mx-auto py-12 px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* LEFT SIDE: Sidebar Navigation */}
          <aside className="w-full md:w-64 space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 px-4 mb-4">Dashboard</h2>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ease-in-out cursor-pointer ${
                  activeTab === item.name 
                    ? 'bg-[#7042F4] text-white shadow-lg shadow-[#7042F4]/20 scale-[1.02]' 
                    : 'text-[#7042F4] hover:bg-[#7042F4]/5' 
                }`}
              >
                {item.name}
              </button>
            ))}
          </aside>

          {/* RIGHT SIDE: Main Content */}
          <main className="flex-grow">
            <div className="backdrop-blur-md bg-white/5 dark:bg-gray-900/40 border border-gray-200/60 dark:border-white/10 rounded-[32px] p-8 md:p-12 shadow-sm transition-all duration-500">
              
              {/* ACCOUNT TAB */}
              {activeTab === 'Account' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <header className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-gray-100 dark:border-white/10">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full border-2 border-[#7042F4] p-0.5 overflow-hidden bg-white dark:bg-gray-800">
                        <Image src="/profileplaceholder.png" alt="Profile" width={128} height={128} className="rounded-full object-cover" />
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

                  <div className="mt-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                        <input name="name" value={user.name} onChange={handleChange} disabled={!isEditing} className={`w-full p-4 bg-gray-50/50 dark:bg-black/20 border rounded-xl font-semibold outline-none transition-all ${isEditing ? 'border-[#7042F4] ring-2 ring-[#7042F4]/10' : 'border-gray-100 dark:border-white/10 cursor-not-allowed'}`} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                        <input name="email" value={user.email} onChange={handleChange} disabled={!isEditing} className={`w-full p-4 bg-gray-50/50 dark:bg-black/20 border rounded-xl font-semibold outline-none transition-all ${isEditing ? 'border-[#7042F4] ring-2 ring-[#7042F4]/10' : 'border-gray-100 dark:border-white/10 cursor-not-allowed'}`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400">Bio</label>
                      <textarea name="bio" value={user.bio} onChange={handleChange} disabled={!isEditing} rows={3} className={`w-full p-4 bg-gray-50/50 dark:bg-black/20 border rounded-xl font-medium outline-none transition-all resize-none ${isEditing ? 'border-[#7042F4] ring-2 ring-[#7042F4]/10' : 'border-gray-100 dark:border-white/10 cursor-not-allowed'}`} />
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button onClick={() => setIsEditing(true)} className="bg-white dark:bg-white/10 text-[#7042F4] border border-[#7042F4] px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#7042F4]/5 transition-all cursor-pointer">Edit Account Info</button>
                      <button disabled={!isEditing} onClick={() => setIsEditing(false)} className={`px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${isEditing ? 'bg-[#7042F4] text-white hover:bg-[#5B34E5] transform hover:-translate-y-0.5' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}>Save Changes</button>
                    </div>
                  </div>
                </div>
              )}

              {/* PRIVACY & SECURITY TAB */}
              {activeTab === 'Privacy & Security' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <div>
                    <h2 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Privacy & Security</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Protect your account and manage how your data is used.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">New Password</label>
                        <input 
                          type="password" 
                          name="password" 
                          placeholder="••••••••"
                          value={user.password} 
                          onChange={handleChange}
                          disabled={!isEditingPrivacy} 
                          className={`w-full p-4 bg-gray-50/50 dark:bg-black/20 border rounded-xl font-semibold outline-none transition-all ${isEditingPrivacy ? 'border-[#7042F4] ring-2 ring-[#7042F4]/10' : 'border-gray-100 dark:border-white/10 cursor-not-allowed'}`} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Recovery Email</label>
                        <input 
                          type="email" 
                          name="recoveryEmail" 
                          value={user.recoveryEmail} 
                          onChange={handleChange}
                          disabled={!isEditingPrivacy} 
                          className={`w-full p-4 bg-gray-50/50 dark:bg-black/20 border rounded-xl font-semibold outline-none transition-all ${isEditingPrivacy ? 'border-[#7042F4] ring-2 ring-[#7042F4]/10' : 'border-gray-100 dark:border-white/10 cursor-not-allowed'}`} 
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/10">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400">Data & Tracking</label>
                      
                      <div className="space-y-3">
                        <div 
                          onClick={() => toggleCheckbox('trackMe')}
                          className={`flex items-center gap-3 cursor-pointer transition-opacity ${!isEditingPrivacy && 'opacity-60 cursor-not-allowed'}`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${user.trackMe ? 'bg-[#7042F4] border-[#7042F4]' : 'border-gray-300 dark:border-white/20'}`}>
                            {user.trackMe && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Allow Vigiloo to track usage patterns</span>
                        </div>

                        <div 
                          onClick={() => toggleCheckbox('locationData')}
                          className={`flex items-center gap-3 cursor-pointer transition-opacity ${!isEditingPrivacy && 'opacity-60 cursor-not-allowed'}`}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${user.locationData ? 'bg-[#7042F4] border-[#7042F4]' : 'border-gray-300 dark:border-white/20'}`}>
                            {user.locationData && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Share location data for localized features</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button onClick={() => setIsEditingPrivacy(true)} className="bg-white dark:bg-white/10 text-[#7042F4] border border-[#7042F4] px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#7042F4]/5 transition-all cursor-pointer">Update Privacy Settings</button>
                    <button disabled={!isEditingPrivacy} onClick={() => setIsEditingPrivacy(false)} className={`px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${isEditingPrivacy ? 'bg-[#7042F4] text-white hover:bg-[#5B34E5] transform hover:-translate-y-0.5' : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}>Save Changes</button>
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'Settings' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <h2 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Settings</h2>
                  <div className="p-6 bg-gray-50/50 dark:bg-black/20 border border-gray-100 dark:border-white/10 rounded-2xl">
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Notification and theme settings are coming soon for Vigiloo.</p>
                  </div>
                </div>
              )}

              {/* HELP TAB */}
              {activeTab === 'Help' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <div>
                    <h2 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">Help & Support</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Find answers to common questions about your account.</p>
                  </div>
                  
                  <div className="grid gap-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-6 bg-gray-50/50 dark:bg-black/20 border border-gray-100 dark:border-white/10 rounded-2xl space-y-2">
                        <h3 className="font-bold text-[#7042F4] text-sm uppercase tracking-wide">{faq.q}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">{faq.a}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100 dark:border-white/10">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest text-center">Still need help? Contact Team 4 Support.</p>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}