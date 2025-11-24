// components/SearchBar.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for anything"
        className="w-full rounded-md border border-[#EEF3F6] px-4 py-3 text-sm bg-[#F6F7F8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CDEFEA] transition"
      />

      {/* right side colored icon box */}
      <div className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-md bg-[#39C9C8] flex items-center justify-center">
        <Search size={18} className="text-white" />
      </div>
    </div>
  );
}






