"use client";

import Image from "next/image";

interface Props {
  icon: string;
  label: string;
  value: string;
}

export default function StatCard({ icon, label, value }: Props) {
  return (
    <div className="bg-white p-6 rounded-[8px] border border-[#E3E7EF] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
      <Image src={icon} alt="" width={40} height={40} />

      <p className="text-[#545F7D] text-[14px] font-medium mt-4">
        {label}
      </p>

      <h2 className="text-[#213F7D] font-bold text-[28px] mt-1">
        {value}
      </h2>
    </div>
  );
}
