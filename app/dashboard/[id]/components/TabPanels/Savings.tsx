// app/dashboard/[id]/components/TabPanels/Savings.tsx
"use client";

import React from "react";

export default function SavingsTab({ savings = [] }: { savings?: any[] }) {
  if (!savings.length) return <div className="bg-white rounded-md p-6">No savings accounts</div>;

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <ul className="space-y-3">
        {savings.map((s) => (
          <li key={s.id} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{s.product}</p>
              <p className="text-xs text-[#6B7280]">{s.account_number}</p>
            </div>
            <p className="font-semibold">₦{s.balance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
