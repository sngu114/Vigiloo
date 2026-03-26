"use client";

import Link from 'next/link';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-12 py-5 bg-white border-b border-gray-100 sticky top-0 z-50 font-sans antialiased">
      
      <Link href="/home" className="transition-transform active:scale-95 cursor-pointer">
        <Logo />
      </Link>

      <div className="hidden lg:flex items-center space-x-10 text-sm font-semibold text-gray-600">
        <Link 
          href="/quiz" 
          className={`${pathname === '/quiz' ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          Daily Quiz
        </Link>

        <Link 
          href="/scams/elderly" /* path way is sus, scams then to elderly?, its standalone. fix later */
          className={`${pathname === '/scams/elderly' ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          Elderly Scams
        </Link>

        <Link 
          href="/scams/youth" /* its standalone. fix later */
          className={`${pathname === '/scams/youth' ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          Youth Scams
        </Link>

        <Link 
          href="/socialmedia" 
          className={`${pathname?.includes('/socialmedia') ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          Social Media Practice
        </Link>

        <Link 
          href="/news" 
          className={`${pathname === '/news' ? 'text-[#7042F4]' : 'hover:text-[#7042F4]'} transition-colors cursor-pointer tracking-tight`}
        >
          News

        </Link>

      </div>

      <Link href="/emergency">
        <button className="bg-[#E11D48] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#BE123C] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
          Emergency Help
        </button>
      </Link>
    </nav>
  );
}