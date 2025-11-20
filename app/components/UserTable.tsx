"use client";

import { User } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  return (
    <div className="bg-white rounded-[8px] border border-[#E0E3EB] shadow-sm overflow-hidden">

      {/* Table */}
      <table className="w-full text-left">
        {/* HEADER */}
        <thead className="bg-[#F9FAFC] text-[#545F7D] text-xs uppercase tracking-wide">
          <tr>
            {["Organization", "Username", "Email", "Phone Number", "Date Joined", "Status"].map((title) => (
              <th key={title} className="px-6 py-5 font-medium">{title}</th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="text-[#545F7D] text-sm">
          {users.slice(0, 10).map((u, index) => (
            <tr
              key={u.id}
              className={`border-t border-[#E0E3EB] ${index % 2 === 0 ? "bg-white" : "bg-[#FCFCFF]"}`}
            >
              <td className="px-6 py-5">{u.profile.organization}</td>
              <td className="px-6 py-5">{u.profile.username}</td>
              <td className="px-6 py-5">{u.email}</td>
              <td className="px-6 py-5">{u.phone}</td>
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

      {/* Pagination (Figma accurate) */}
      <div className="flex items-center justify-between px-6 py-4 text-sm text-[#545F7D]">
        <div className="flex items-center gap-2">
          Showing
          <select className="border rounded px-2 py-1 text-sm">
            <option>100</option>
          </select>
          out of 100
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

