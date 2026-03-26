"use client";

import Image from 'next/image';

export default function Logo({ isWhite = false }: { isWhite?: boolean }) {
  return (
    <div className="flex items-center space-x-3">
      {/* universal logo tingz. 
      */}
      <div className="flex items-center justify-center">
        <Image 
          src="/vigilooLogosmall.png" 
          alt="Vigiloo Logo" 
          width={40}  
          height={40} 
          className="object-contain"
          priority // Ensures the logo loads immediately
        />
      </div>

      <span className={`text-2xl font-black tracking-tight ${isWhite ? 'text-white' : 'text-[#7042F4]'}`}>
        Vigiloo
      </span>
    </div>
  );
}