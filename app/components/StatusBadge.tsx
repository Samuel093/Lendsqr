"use client";

import React from "react";
import { UserStatus } from "@/lib/types";

type Props = {
  status: UserStatus | string;
};

const COLORS: Record<string, string> = {
  active: "bg-[#DDF7C8] text-[#3C5F23]",
  inactive: "bg-[#F4F4F6] text-[#545F7D]",
  pending: "bg-[#FFF6D9] text-[#9A7B2F]",
  blacklisted: "bg-[#FCDDE0] text-[#8A1E2D]",
};

export default function StatusBadge({ status }: Props) {
  const key = (status ?? "inactive").toLowerCase();
  const classes = COLORS[key] ?? COLORS["inactive"];
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>{String(status)}</span>;
}


