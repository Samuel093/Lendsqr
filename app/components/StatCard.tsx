// components/StatCard.tsx
"use client";

import Image from "next/image";
import React from "react";
import styles from "../dashboard/dashboard.module.scss";

interface Props {
  icon: string;
  label: string;
  value: string;
}

export default function StatCard({ icon, label, value }: Props) {
  return (
    <div className={styles.statCard}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* image wrapper prevents overflow by fixing size */}
          <div style={{ width: 40, height: 40, flex: "0 0 40px" }}>
            <Image src={icon} alt={`${label} icon`} width={40} height={40} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-[#545F7D] text-[14px] font-medium">{label}</p>
        <h2 className="text-[#213F7D] font-bold text-[28px] mt-1">{value}</h2>
      </div>
    </div>
  );
}

