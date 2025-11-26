"use client";

import React from "react";

type Status = "Active" | "Inactive" | "Pending" | "Blacklisted" | string;

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  // Normalize input to TitleCase expected by colors map
  const normalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "Inactive";

  const key = normalize(status);

  const colors: Record<string, string> = {
    Active: "bg-[#DDF7C8] text-[#3C5F23]",
    Inactive: "bg-[#F4F4F6] text-[#545F7D]",
    Pending: "bg-[#FFF6D9] text-[#9A7B2F]",
    Blacklisted: "bg-[#FCDDE0] text-[#8A1E2D]",
  };

  const cls = colors[key] ?? colors["Inactive"];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      {key}
    </span>
  );
}


