// app/dashboard/[id]/components/TabPanels/Loans.tsx
"use client";

import React from "react";

export default function LoansTab({ loans = [] }: { loans?: any[] }) {
  if (!loans.length) return <div className="bg-white rounded-md p-6">No loans found</div>;

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <ul className="space-y-4">
        {loans.map((l) => (
          <li key={l.id} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-[#545F7D]">Loan Type</p>
              <p className="font-semibold text-[#213F7D]">{l.type}</p>
            </div>
            <div>
              <p className="text-xs text-[#545F7D]">Amount</p>
              <p className="font-semibold text-[#213F7D]">₦{l.amount}</p>
            </div>
            <div>
              <p className="text-xs text-[#545F7D]">Status</p>
              <p className="font-semibold">{l.status}</p>
            </div>
            <div>
              <p className="text-xs text-[#545F7D]">Repayment</p>
              <p className="font-semibold">₦{l.repayment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
