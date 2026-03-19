"use client";

import Logo from '@/components/Logo';
import Link from 'next/link';
import { useState } from 'react';

export default function EmergencyPage() {
  const [situation, setSituation] = useState('I gave my credit card info');

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans antialiased text-gray-900">
      {/* Navigation - Synced with Home */}
      <nav className="flex items-center justify-between px-12 py-5 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Logo /> 
        <div className="hidden lg:flex items-center space-x-10 text-sm font-semibold text-gray-600">
          <Link href="/home" className="hover:text-[#7042F4] transition-colors cursor-pointer">Home</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Daily Quiz</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Elderly Scams</Link>
          <Link href="#" className="hover:text-[#7042F4] transition-colors cursor-pointer">Youth Scams</Link>
          
          {/* Added Social Media Practice Link to match Home Navbar */}
          <Link href="/socialmedia" className="hover:text-[#7042F4] transition-colors cursor-pointer">
            Social Media Practice
          </Link>
        </div>
        
        {/* Active Emergency Button - Kept red for urgency visibility */}
        <button className="bg-[#E11D48] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md cursor-default">
          Emergency Help
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-red-100">
            <span className="mr-2">✦</span> Immediate Crisis Support
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] leading-tight mb-4">
            If You've Been Scammed: <span className="text-[#7042F4]">Take Action Now</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            The faster you act, the more you can protect. Follow these steps immediately to freeze accounts and minimize financial loss.
          </p>
        </div>

        {/* Section 1: Official Hotline */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-md bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
            <div className="text-2xl mb-2">📞</div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Official Scam Hotline</p>
            <h2 className="text-3xl font-black text-[#7042F4] mb-2">1-800-SCAM-HLP</h2>
            <p className="text-xs text-gray-400 font-medium">24/7 Professional guidance for victims</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* 1. Identify Situation */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F0EBFF] text-[#7042F4] font-bold text-sm">1</span>
              <h3 className="text-xl font-bold text-[#0F172A]">Identify the Situation</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">What Happened?</label>
              <select 
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#7042F4]/20 cursor-pointer"
              >
                <option>I gave my credit card info</option>
                <option>I shared my social security number</option>
                <option>I downloaded a suspicious file</option>
                <option>I sent money via wire/gift card</option>
              </select>
            </div>
          </div>

          {/* 2. Required Immediate Actions */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F0EBFF] text-[#7042F4] font-bold text-sm">2</span>
              <h3 className="text-xl font-bold text-[#0F172A]">Required Immediate Actions</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: "Freeze your credit card immediately", desc: "Use your banking app or website to toggle the 'Freeze/Lock' feature. This stops any pending or future unauthorized transactions." },
                { title: "Call your bank's fraud department", desc: "Explain that your credit card information has been compromised. Ask them to cancel the card and issue a new one with a different number." },
                { title: "Monitor statements for 48 hours", desc: "Even after freezing, keep an eye on 'Pending' transactions. Report any suspicious line item to your bank immediately." }
              ].map((item, i) => (
                <div key={i} className="flex items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-[#7042F4] focus:ring-[#7042F4] cursor-pointer" />
                  <div className="ml-4">
                    <h4 className="font-bold text-[#0F172A]">{item.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Report Incident */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F0EBFF] text-[#7042F4] font-bold text-sm">3</span>
              <h3 className="text-xl font-bold text-[#0F172A]">Report the Incident to Authorities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer" className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#7042F4]/30 transition-all cursor-pointer">
                <div className="font-bold text-[#0F172A] mb-1">FBI (IC3)</div>
                <p className="text-xs text-gray-500 mb-4">Internet Crime Complaint Center</p>
                <span className="text-[#7042F4] text-xs font-bold underline">Report to IC3 →</span>
              </a>
              <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener noreferrer" className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#7042F4]/30 transition-all cursor-pointer">
                <div className="font-bold text-[#0F172A] mb-1">FTC PORTAL</div>
                <p className="text-xs text-gray-500 mb-4">Federal Trade Commission</p>
                <span className="text-[#7042F4] text-xs font-bold underline">Report to FTC →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Support Box */}
        <div className="mt-20 p-10 rounded-[40px] bg-[#F0EBFF] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold text-[#0F172A] mb-2">Remember: You are not alone.</h4>
            <p className="text-sm text-[#7042F4] font-medium max-w-md">Scammers use sophisticated psychological tactics. Focus on the steps above, and take them one at a time.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all cursor-pointer">Recovery Resources</button>
             <button className="bg-[#7042F4] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#5B34E5] transition-all cursor-pointer">Chat with an Agent</button>
          </div>
        </div>
      </main>
    </div>
  );
}