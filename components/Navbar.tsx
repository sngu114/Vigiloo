"use client";

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="relative flex items-center justify-between px-12 py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 font-sans antialiased">
      
      <Link href="/home" className="transition-transform active:scale-95 cursor-pointer">
        <Logo />
      </Link>

      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10 text-sm font-semibold text-gray-600 dark:text-gray-300">
        <Link 
          href="/quiz" 
          className={`${pathname === '/quiz' ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          Daily Quiz
        </Link>

        <Link 
          href="/lessons" 
          className={`${pathname === '/scams/elderly' ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          Lessons
        </Link>

        <Link 
          href="/socialmedia" 
          className={`${pathname?.includes('/socialmedia') ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          Practice
        </Link>

        <Link 
          href="/news" 
          className={`${pathname?.includes('/news') ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          News
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-6">

        <ThemeToggle />

        <Link href="/emergency">
          <button className="bg-[#E11D48] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#BE123C] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            Emergency Help
          </button>
        </Link>

        {/* PROFILE PICTURE */}
        <Link href="/profile" className="relative group">
          <div className="w-10 h-10 rounded-full border-2 border-[#7042F4] p-0.5 transition-transform group-hover:scale-110 group-active:scale-95 cursor-pointer overflow-hidden bg-gray-50">
            <Image 
              src="/profileplaceholder.png"
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
              onError={(e) => {
                (e.target as any).src = "https://ui-avatars.com/api/?name=User&background=7042F4&color=fff";
              }}
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}