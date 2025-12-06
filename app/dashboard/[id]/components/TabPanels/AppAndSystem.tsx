// app/dashboard/[id]/components/TabPanels/AppAndSystem.tsx
"use client";

import React from "react";

export default function AppAndSystem({ meta }: { meta?: any }) {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <p className="text-xs text-[#545F7D]">Last Active</p>
      <p className="font-semibold">{meta?.last_active ?? "N/A"}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[#545F7D]">Device</p>
          <p className="font-semibold">{meta?.device ?? "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-[#545F7D]">IP Address</p>
          <p className="font-semibold">{meta?.ip ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
