// components/UserTable.tsx
"use client";

import React from "react";
import { User } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import styles from "../dashboard/dashboard.module.scss";

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  return (
    <div className={styles.tableCard}>
      {/* optional header area */}
      <div className={`${styles.cardHeader || "cardHeader"}`}>
        {/* left: title or filters can go here */}
      </div>

      {/* responsive scroll inside the card */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[820px] w-full text-left">
          <thead className="bg-[#F9FAFC] text-[#545F7D] text-xs uppercase tracking-wide">
            <tr>
              {["Organization", "Username", "Email", "Phone Number", "Date Joined", "Status"].map((title) => (
                <th key={title} className="px-6 py-5 font-medium">{title}</th>
              ))}
            </tr>
          </thead>

          <tbody className="text-[#545F7D] text-sm">
            {users.slice(0, 10).map((u, index) => (
              <tr
                key={u.id}
                className={`border-t border-[#E0E3EB] ${index % 2 === 0 ? "bg-white" : "bg-[#FCFCFF]"}`}
              >
                <td className="px-6 py-5 max-w-[220px] truncate">{u.profile.organization}</td>
                <td className="px-6 py-5 max-w-[200px] truncate">{u.profile.username}</td>
                <td className="px-6 py-5 max-w-[260px] truncate">{u.email}</td>
                <td className="px-6 py-5 max-w-[160px] truncate">{u.phone}</td>
                <td className="px-6 py-5">
                  {new Date(u.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={u.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination area (styled via dashboard.module.scss .tableFooter) */}
      <div className={styles.tableFooter ? styles.tableFooter : "tableFooter"}>
        <div className="flex items-center gap-2">
          Showing
          <select className="border rounded px-2 py-1 text-sm">
            <option>100</option>
          </select>
          out of {users.length}
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded text-sm">1</button>
          <span>2</span>
          <span>3</span>
          <span>…</span>
          <span>16</span>
        </div>
      </div>
    </div>
  );
}


