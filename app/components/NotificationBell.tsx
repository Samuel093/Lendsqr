"use client";

import React from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  return (
    <button className="relative">
      <Bell size={22} className="text-gray-700 hover:text-primary transition" />
      
      {/* red dot */}
      <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
    </button>
  );
};

export default NotificationBell;
