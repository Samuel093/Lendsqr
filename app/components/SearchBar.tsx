"use client";

import React from "react";
import { Search } from "lucide-react";



const SearchBar = () => {
  return (
    <div className="relative w-full max-w-[760px]">
      <input
        type="text"
        placeholder="Search for anything"
        className="w-full h-12 px-4 rounded-l-md bg-[#F5F5F7] text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39CDCC] border border-transparent"
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-14 bg-[#39CDCC] rounded-r-md flex items-center justify-center cursor-pointer">
        <Search size={18} className="text-white" />
      </div>
    </div>
  );
};

export default SearchBar;





