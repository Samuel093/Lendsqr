"use client";

import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for anything"
        className="w-full px-4 py-2 pl-10 border rounded-md text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
      <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
    </div>
  );
};

export default SearchBar;
