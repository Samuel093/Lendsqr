"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const ProfileMenu = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      <Image
        src="/images/avatar.png"
        alt="User avatar"
        width={35}
        height={35}
        className="rounded-full border"
      />

      <div className="hidden md:flex flex-col leading-tight">
        <span className="font-semibold text-sm">Samuel Areo</span>
        <span className="text-xs text-gray-500">Admin</span>
      </div>

      <ChevronDown size={18} className="text-gray-600" />
    </div>
  );
};

export default ProfileMenu;
