// app/dashboard/[id]/components/TabPanels/Documents.tsx
"use client";

import React from "react";

export default function DocumentsTab({ docs = [] }: { docs?: any[] }) {
  if (!docs.length) {
    return (
      <div className="bg-white rounded-md p-6 shadow-sm">
        <p className="text-sm text-[#545F7D]">No documents uploaded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <ul className="space-y-3">
        {docs.map((d) => (
          <li key={d.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#213F7D]">{d.name}</p>
              <p className="text-xs text-[#6B7280]">{d.type}</p>
            </div>
            <a
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#39CDCC] underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
