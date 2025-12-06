// app/dashboard/[id]/components/TabPanels/BankDetails.tsx
"use client";

import React from "react";

export default function BankDetails({ bank }: { bank?: any }) {
  if (!bank) {
    return <div className="bg-white rounded-md p-6 shadow-sm">No bank details.</div>;
  }

  return (
    <div className="bg-white rounded-md p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[#545F7D]">Bank</p>
          <p className="font-semibold text-[#213F7D]">{bank.bank_name}</p>
        </div>

        <div>
          <p className="text-xs text-[#545F7D]">Account Number</p>
          <p className="font-semibold text-[#213F7D]">{bank.account_number}</p>
        </div>

        <div>
          <p className="text-xs text-[#545F7D]">Account Name</p>
          <p className="font-semibold text-[#213F7D]">{bank.account_name}</p>
        </div>

        <div>
          <p className="text-xs text-[#545F7D]">BVN</p>
          <p className="font-semibold text-[#213F7D]">{bank.bvn}</p>
        </div>
      </div>
    </div>
  );
}
