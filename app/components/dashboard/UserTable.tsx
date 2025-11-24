"use client";

import React, { useMemo, useState } from "react";
import { User } from "@/lib/types";
import StatusBadge
import styles from "@/app/dashboard/dashboard.module.scss";

/**
 * Features:
 * - Client-side sorting (by organization, username, date)
 * - Filter by status (dropdown)
 * - Page-size control & pagination
 * - Mobile accordion view (no horizontal scroll)
 * - Defensive rendering for missing values
 */

type Props = {
  users: User[];
};

const PAGE_SIZES = [10, 25, 50, 100];

export default function UserTable({ users }: Props) {
  const [sortKey, setSortKey] = useState<"organization" | "username" | "created_at">("organization");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  // Filtered & sorted users
  const filtered = useMemo(() => {
    let list = users ?? [];
    if (statusFilter !== "all") {
      list = list.filter((u) => (u.status ?? "").toLowerCase() === statusFilter.toLowerCase());
    }

    const sorted = [...list].sort((a, b) => {
      const aKey =
        sortKey === "organization"
          ? a?.profile?.organization ?? ""
          : sortKey === "username"
          ? a?.profile?.username ?? ""
          : a?.created_at ?? "";
      const bKey =
        sortKey === "organization"
          ? b?.profile?.organization ?? ""
          : sortKey === "username"
          ? b?.profile?.username ?? ""
          : b?.created_at ?? "";

      if (sortDir === "asc") return String(aKey).localeCompare(String(bKey), undefined, { numeric: true });
      return String(bKey).localeCompare(String(aKey), undefined, { numeric: true });
    });

    return sorted;
  }, [users, sortKey, sortDir, statusFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // helpers for responsive/mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className={styles.tableCard}>
      {/* header controls */}
      <div className={styles.cardHeader}>
        <div className="flex items-center gap-3">
          <label className="text-sm text-[#545F7D]">Show</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label className="text-sm text-[#545F7D]">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-[#545F7D]">Sort</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="organization">Organization</option>
            <option value="username">Username</option>
            <option value="created_at">Date Joined</option>
          </select>

          <button
            onClick={() => setSortDir((s) => (s === "asc" ? "desc" : "asc"))}
            className="px-3 py-1 border rounded text-sm"
            aria-label="Toggle sort direction"
          >
            {sortDir === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      {/* table / mobile accordion */}
      <div className={styles.tableResponsive}>
        {/* Desktop/Tablet: real table */}
        <table className="w-full text-left hidden sm:table">
          <thead className="bg-[#F9FAFC] text-[#545F7D] text-xs uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Date Joined</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="text-[#545F7D]">
            {pageData.map((u) => (
              <tr key={u.id} className="border-t border-[#E0E3EB]">
                <td className="px-6 py-5 max-w-[220px] truncate">{u?.profile?.organization ?? "N/A"}</td>
                <td className="px-6 py-5 max-w-[200px] truncate">{u?.profile?.username ?? "N/A"}</td>
                <td className="px-6 py-5 max-w-[260px] truncate">{u?.email ?? "N/A"}</td>
                <td className="px-6 py-5 max-w-[160px] truncate">{u?.phone ?? "N/A"}</td>
                <td className="px-6 py-5">
                  {u?.created_at ? new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={(u?.status as any) ?? "inactive"} />
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td className="px-6 py-6 text-center" colSpan={6}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile accordion view */}
        <div className="sm:hidden space-y-3">
          {pageData.map((u) => (
            <div key={u.id} className="bg-white rounded-md border border-[#E0E3EB] px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#545F7D] truncate">{u?.profile?.organization ?? "N/A"}</div>
                  <div className="text-base text-[#213F7D] font-semibold truncate">{u?.profile?.username ?? "N/A"}</div>
                  <div className="mt-2 text-sm text-[#545F7D] truncate">{u?.email ?? "N/A"}</div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm">{u?.phone ?? "N/A"}</div>
                  <StatusBadge status={(u?.status as any) ?? "inactive"} />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[#6B7280]">
                <div>{u?.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A"}</div>
                <div className="flex items-center gap-2">
                  <button className="text-sm px-2 py-1 border rounded">View</button>
                  <button className="text-sm px-2 py-1 border rounded">Blacklist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pagination footer */}
      <div className={styles.tableFooter}>
        <div className="flex items-center gap-2 text-sm text-[#545F7D]">
          Showing
          <strong>{(page - 1) * pageSize + 1}</strong>
          -
          <strong>{Math.min(page * pageSize, total)}</strong>
          of <strong>{total}</strong>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1 border rounded text-sm bg-white">{page}</span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}




                                 