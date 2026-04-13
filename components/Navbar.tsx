"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname === '/') {
    return null;
  }

  const navLinks = [
    { name: 'Daily Quiz', href: '/quiz' },
    { name: 'Lessons', href: '/lessons' },
    { name: 'Practice', href: '/socialmedia' },
    { name: 'News', href: '/news' },
  ];

  return (
    <>
      <nav className="relative bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-[9999] font-sans antialiased">
        <div className="flex items-center justify-between px-6 lg:px-12 py-5">
          
          <div className="w-10 lg:hidden"></div>

          <Link href="/home" className="transition-transform active:scale-95 cursor-pointer lg:relative">
            <Logo />
          </Link>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10 text-sm font-semibold text-gray-600 dark:text-gray-300">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`${pathname?.includes(link.href) ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/emergency">
              <button className="bg-[#E11D48] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#BE123C] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                Emergency Help
              </button>
            </Link>
            <Link href="/profile" className="relative group">
              <div className="w-10 h-10 rounded-full border-2 border-[#7042F4] p-0.5 overflow-hidden bg-gray-50">
                <Image 
                  src="/profileplaceholder.png"
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
            </Link>
          </div>

          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[10000] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsMenuOpen(false)} 
          />
          
          <div className="absolute top-0 right-0 h-full w-[300px] bg-white dark:bg-gray-900 shadow-2xl p-8 animate-in slide-in-from-right duration-300 flex flex-col">
            
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Action Box: Profile (Theme Toggle Removed) */}
            <div className="flex items-center justify-around bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl mt-12 mb-4 border border-gray-100 dark:border-gray-800">
              <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                <div className="w-11 h-11 rounded-full border-2 border-[#7042F4] p-0.5 overflow-hidden bg-white">
                  <Image src="/profileplaceholder.png" alt="User Profile" width={44} height={44} className="rounded-full object-cover" />
                </div>
              </Link>
            </div>

            {/* Emergency Button moved under the box */}
            <Link href="/emergency" onClick={() => setIsMenuOpen(false)} className="mb-10">
              <button className="w-full bg-[#E11D48] text-white py-4 rounded-2xl font-bold text-sm shadow-md active:scale-95 transition-transform">
                EMERGENCY HELP
              </button>
            </Link>

            {/* Nav Links */}
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-bold tracking-tight ${pathname?.includes(link.href) ? 'text-[#7042F4]' : 'text-gray-900 dark:text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}