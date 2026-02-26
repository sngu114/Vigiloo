"use client";

import Image from 'next/image';

// We added ({ isWhite }) here so you can toggle the color
export default function Logo({ isWhite = false }: { isWhite?: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon Container */}
      <div className="bg-[#7042F4] p-1.5 rounded-lg flex items-center justify-center shadow-sm">
        <Image 
          src="/logo-icon.png" 
          alt="Vigiloo Logo" 
          width={24} 
          height={24} 
          className="object-contain"
        />
      </div>

      {/* Logic: If isWhite is true, use text-white. Otherwise, use text-[#7042F4] */}
      <span className={`text-xl font-bold tracking-tight ${isWhite ? 'text-white' : 'text-[#7042F4]'}`}>
        Vigiloo
      </span>
    </div>
  );
}