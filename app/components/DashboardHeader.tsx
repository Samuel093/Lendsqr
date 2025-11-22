"use client";

import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import { Menu, ChevronDown } from "lucide-react";

interface Props {
  onToggleSidebar: () => void;
}

export default function DashboardHeader({ onToggleSidebar }: Props) {
  return (
    <header className="dashboard-header fixed top-0 left-0 w-full z-[80] border-b border-[#E5E8EE] bg-white">
      <div className="dashboard-header-inner h-[90px] flex items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md border border-[#E5E8EE] hover:bg-gray-50"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Image src="/images/logo.png" alt="Lendsqr" width={120} height={40} priority />
        </div>

        {/* Search center (desktop) */}
        <div className="hidden md:flex w-[46%] lg:w-[45%]">
          <SearchBar />
        </div>

        {/* Right items */}
        <div className="flex items-center gap-6">
          <a className="hidden md:block text-[#213F7D] font-medium text-sm hover:underline" href="#">Docs</a>
          <NotificationBell />
          <div className="hidden md:block w-px h-8 bg-[#E5E8EE]" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/images/avatar.png" alt="avatar" width={40} height={40} className="rounded-full" />
            <span className="hidden md:block text-[#213F7D] font-semibold">Samuel Areo</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Mobile search under header */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  );
}



