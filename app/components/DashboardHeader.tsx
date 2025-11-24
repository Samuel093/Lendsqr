// components/DashboardHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";

interface Props {
  onToggleSidebar: () => void;
}

export default function DashboardHeader({ onToggleSidebar }: Props) {
  return (
    <header className="w-full fixed top-0 left-0 bg-white z-[90] border-b border-[#E5E8EE]">
      <div className="h-[90px] flex items-center justify-between px-4 md:px-8 lg:px-10">
        {/* Left: mobile hamburger + logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md border border-[#E5E8EE] hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-[#213F7D]" />
          </button>

          <Image src="/images/logo.png" alt="Lendsqr Logo" width={120} height={40} priority />
        </div>

        {/* Center search (desktop) */}
        <div className="hidden md:flex w-[40%] lg:w-[45%]">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a href="#" className="hidden md:block text-[#213F7D] font-medium text-sm hover:underline">Docs</a>
          <NotificationBell />
          <div className="hidden md:block w-px h-10 bg-[#E5E8EE]" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/images/avatar.png" alt="Profile" width={40} height={40} className="rounded-full" />
            <span className="hidden md:block text-[#213F7D] font-semibold">Samuel Areo</span>
            <ChevronDown size={18} className="text-[#213F7D]" />
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}




