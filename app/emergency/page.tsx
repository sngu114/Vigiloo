"use client";

import { useState } from 'react';

// Helper components to keep the main code clean and "un-nested"
const ActionStep = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#7042F4]/10 text-[#7042F4] font-bold text-sm">
        {number}
      </span>
      <h3 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{title}</h3>
    </div>
    {children}
  </div>
);

const ActionCard = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex items-start p-6 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-gray-900/40 transition-all" 
       style={{ borderColor: 'var(--card-border)' }}>
    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-[#7042F4] focus:ring-[#7042F4] cursor-pointer" />
    <div className="ml-4">
      <h4 className="font-bold" style={{ color: 'var(--foreground)' }}>{title}</h4>
      <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{desc}</p>
    </div>
  </div>
);

export default function EmergencyPage() {
  const [situation, setSituation] = useState('I gave my credit card info');

  return (
    <div className="min-h-screen bg-transparent font-sans antialiased" style={{ color: 'var(--foreground)' }}>
      <main className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-red-100 dark:border-red-900/30">
            <span className="mr-2">✦</span> Immediate Crisis Support
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight" style={{ color: 'var(--foreground)' }}>
            If You've Been Scammed: <span className="text-[#7042F4]">Take Action Now</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto font-medium" style={{ color: 'var(--muted)' }}>
            The faster you act, the more you can protect. Follow these steps immediately to freeze accounts and minimize financial loss.
          </p>
        </header>

        {/* Official Hotline */}
        <section className="flex justify-center mb-16">
          <div className="w-full max-w-md p-8 rounded-[32px] border shadow-sm text-center backdrop-blur-md bg-white/5 dark:bg-gray-900/40"
               style={{ borderColor: 'var(--card-border)' }}>
            <div className="text-2xl mb-2">📞</div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>Official Scam Hotline</p>
            <h2 className="text-3xl font-black text-[#7042F4] mb-2">1-800-SCAM-HLP</h2>
            <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>24/7 Professional guidance for victims</p>
          </div>
        </section>

        <div className="space-y-12">
          {/* Step 1 */}
          <ActionStep number="1" title="Identify the Situation">
            <div className="p-6 rounded-2xl border backdrop-blur-md bg-white/5 dark:bg-gray-900/40" style={{ borderColor: 'var(--card-border)' }}>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>What Happened?</label>
              <select 
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full p-4 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#7042F4]/20 cursor-pointer bg-white/10 dark:bg-black/20 border border-white/10"
                style={{ color: 'var(--foreground)' }}
              >
                <option className="bg-gray-900 text-white">I gave my credit card info</option>
                <option className="bg-gray-900 text-white">I shared my social security number</option>
                <option className="bg-gray-900 text-white">I downloaded a suspicious file</option>
                <option className="bg-gray-900 text-white">I sent money via wire/gift card</option>
              </select>
            </div>
          </ActionStep>

          {/* Step 2 */}
          <ActionStep number="2" title="Required Immediate Actions">
            <div className="space-y-4">
              <ActionCard 
                title="Freeze your credit card immediately" 
                desc="Use your banking app or website to toggle the 'Freeze/Lock' feature. This stops any pending or future unauthorized transactions." 
              />
              <ActionCard 
                title="Call your bank's fraud department" 
                desc="Explain that your credit card information has been compromised. Ask them to cancel the card and issue a new one with a different number." 
              />
              <ActionCard 
                title="Monitor statements for 48 hours" 
                desc="Even after freezing, keep an eye on 'Pending' transactions. Report any suspicious line item to your bank immediately." 
              />
            </div>
          </ActionStep>

          {/* Step 3 */}
          <ActionStep number="3" title="Report the Incident to Authorities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl border shadow-sm hover:border-[#7042F4]/30 transition-all backdrop-blur-md bg-white/5 dark:bg-gray-900/40" style={{ borderColor: 'var(--card-border)' }}>
                <div className="font-bold mb-1" style={{ color: 'var(--foreground)' }}>FBI (IC3)</div>
                <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Internet Crime Complaint Center</p>
                <span className="text-[#7042F4] text-xs font-bold underline">Report to IC3 →</span>
              </a>
              <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl border shadow-sm hover:border-[#7042F4]/30 transition-all backdrop-blur-md bg-white/5 dark:bg-gray-900/40" style={{ borderColor: 'var(--card-border)' }}>
                <div className="font-bold mb-1" style={{ color: 'var(--foreground)' }}>FTC PORTAL</div>
                <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Federal Trade Commission</p>
                <span className="text-[#7042F4] text-xs font-bold underline">Report to FTC →</span>
              </a>
            </div>
          </ActionStep>
        </div>

        {/* Support Box */}
        <section className="mt-20 p-10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left backdrop-blur-xl bg-[#7042F4]/10 border border-[#7042F4]/20">
          <div>
            <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Remember: You are not alone.</h4>
            <p className="text-sm text-[#7042F4] dark:text-[#a184ff] font-medium max-w-md">Scammers use sophisticated psychological tactics. Focus on the steps above, and take them one at a time.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white dark:bg-white/10 dark:text-white text-gray-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-all cursor-pointer">Recovery Resources</button>
             <button className="bg-[#7042F4] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#5B34E5] transition-all cursor-pointer">Chat with an Agent</button>
          </div>
        </section>
      </main>
    </div>
  );
}