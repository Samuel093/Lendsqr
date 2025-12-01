// app/components/dashboard/UserTable.tsx
"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { User } from "@/lib/types";
import StatusBadge from "@/app/components/StatusBadge";
import UserFilters from "@/app/components/dashboard/UserFilters";
import styles from "@/app/dashboard/dashboard.module.scss";

import {
  Building2,
  User as UserIcon,
  Mail,
  Phone,
  CalendarDays,
  BadgeCheck,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";

type Props = { users: User[] };

const PAGE_SIZES = [10, 25, 50, 100];

export default function UserTable({ users }: Props) {
  const safeUsers = users ?? [];

  /* table state */
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<"organization" | "username" | "created_at">(
    "organization"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filters, setFilters] = useState<Record<string, string>>({});

  /* filter popover state (taken directly from Version A) */
  const [openFilters, setOpenFilters] = useState(false);
  const [isMobileFilter, setIsMobileFilter] = useState(false);
  const tableCardRef = useRef<HTMLDivElement | null>(null);
  const [anchorLeft, setAnchorLeft] = useState<number | null>(null);

  /* reset to page 1 when filters or settings change */
  useEffect(() => {
    setPage(1);
  }, [pageSize, statusFilter, sortKey, sortDir, JSON.stringify(filters)]);

  /* helper */
  const safe = (val: any, fallback = "N/A") =>
    val === null || val === undefined || val === "" ? fallback : val;

  const normalizeStatus = (s?: string) => {
    if (!s) return "Inactive";
    const lower = s.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  /* filtering + sorting */
  const filteredSorted = useMemo(() => {
    let list = [...safeUsers];

    /* filtering */
    if (filters.organization) {
      const n = filters.organization.toLowerCase();
      list = list.filter((u) =>
        (u.profile?.organization ?? "").toLowerCase().includes(n)
      );
    }

    if (filters.username) {
      const n = filters.username.toLowerCase();
      list = list.filter((u) =>
        (u.profile?.username ?? "").toLowerCase().includes(n)
      );
    }

    if (filters.email) {
      const n = filters.email.toLowerCase();
      list = list.filter((u) => (u.email ?? "").toLowerCase().includes(n));
    }

    if (filters.phone) {
      const n = filters.phone.toLowerCase();
      list = list.filter((u) => (u.phone ?? "").toLowerCase().includes(n));
    }

    if (filters.date) {
      list = list.filter((u) => (u.created_at ?? "").slice(0, 10) === filters.date);
    }

    if (filters.status) {
      const n = filters.status.toLowerCase();
      list = list.filter(
        (u) => normalizeStatus(u.status).toLowerCase() === n
      );
    }

    if (statusFilter !== "all") {
      const n = statusFilter.toLowerCase();
      list = list.filter(
        (u) => normalizeStatus(u.status).toLowerCase() === n
      );
    }

    /* sorting */
    const getKey = (u: User) =>
      sortKey === "organization"
        ? u.profile?.organization ?? ""
        : sortKey === "username"
        ? u.profile?.username ?? ""
        : u.created_at ?? "";

    list.sort((a, b) => {
      const aK = String(getKey(a));
      const bK = String(getKey(b));

      return sortDir === "asc"
        ? aK.localeCompare(bK, undefined, { numeric: true })
        : bK.localeCompare(aK, undefined, { numeric: true });
    });

    return list;
  }, [safeUsers, filters, statusFilter, sortKey, sortDir]);

  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = filteredSorted.slice((page - 1) * pageSize, page * pageSize);

  const prettyDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "N/A";

  /* -----------------------------
     FILTER POP-UP (Version A)
  ------------------------------*/
  const openFilterPanel = () => {
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    setIsMobileFilter(mobile);

    if (!mobile && tableCardRef.current) {
      const rect = tableCardRef.current.getBoundingClientRect();
      setAnchorLeft(rect.left + 24);
    } else {
      setAnchorLeft(null);
    }

    setOpenFilters(true);
  };

  const handleApply = (data: any) => {
    setFilters(data || {});
    setOpenFilters(false);
  };

  const handleReset = () => {
    setFilters({});
    setOpenFilters(false);
  };

  return (
    <div className="relative" ref={tableCardRef}>
      {/* FILTER POPUP (Version A) */}
      {openFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpenFilters(false)}
          />

          {!isMobileFilter ? (
            <div
              className="absolute z-50 shadow-lg bg-white rounded-lg p-4"
              style={{
                left: anchorLeft ?? 48,
                top: 64,
                width: 380,
              }}
            >
              <UserFilters
                open
                onClose={() => setOpenFilters(false)}
                onApply={handleApply}
                onReset={handleReset}
              />
            </div>
          ) : (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md">
                <UserFilters
                  open
                  onClose={() => setOpenFilters(false)}
                  onApply={handleApply}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* MAIN CARD */}
      <div className={styles.tableCard}>
        {/* Header controls */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-[#545F7D]">Show</label>

            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {PAGE_SIZES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <label className="text-sm text-[#545F7D] hidden md:inline-block ml-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-2 py-1 text-sm hidden md:inline-block"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
          </div>

          <button
            onClick={openFilterPanel}
            className="flex items-center gap-2 px-4 py-2 bg-[#39CDCC] text-white rounded-md text-sm shadow-sm"
          >
            <ChevronDown size={16} />
            Filter
          </button>
        </div>

        {/* TABLE */}
        <div className={styles.tableResponsive}>
          <table className="hidden sm:table w-full text-left">
            <thead className="bg-[#F9FAFC] text-xs text-[#545F7D] uppercase">
              <tr>
                <Th label="Organization" icon={<Building2 size={14} />} />
                <Th label="Username" icon={<UserIcon size={14} />} />
                <Th label="Email" icon={<Mail size={14} />} />
                <Th label="Phone" icon={<Phone size={14} />} />
                <Th label="Date Joined" icon={<CalendarDays size={14} />} />
                <Th label="Status" icon={<BadgeCheck size={14} />} />
              </tr>
            </thead>

            <tbody className="text-[#545F7D]">
              {pageData.map((u) => (
                <tr key={u.id} className="border-t hover:bg-[#FBFCFF]">
                  <Td>{safe(u.profile?.organization)}</Td>
                  <Td>{safe(u.profile?.username)}</Td>
                  <Td>{safe(u.email)}</Td>
                  <Td>{safe(u.phone)}</Td>
                  <Td>{prettyDate(u.created_at)}</Td>
                  <Td>
                    <StatusBadge status={normalizeStatus(u.status)} />
                  </Td>
                </tr>
              ))}

              {pageData.length === 0 && (
                <tr>
                  <td className="text-center py-6" colSpan={6}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* MOBILE CARDS */}
          <div className="sm:hidden space-y-3">
            {filteredSorted.map((u) => (
              <div key={u.id} className="bg-white rounded-md p-4 border">
                <div className="text-sm">{safe(u.profile?.organization)}</div>
                <div className="text-base font-semibold">
                  {safe(u.profile?.username)}
                </div>
                <div className="text-sm mt-2">{safe(u.email)}</div>
                <div className="text-sm">{safe(u.phone)}</div>
                <div className="text-xs mt-1">{prettyDate(u.created_at)}</div>

                <div className="mt-3 flex justify-between items-center">
                  <StatusBadge status={normalizeStatus(u.status)} />
                  <button className="px-3 py-1 border rounded text-sm">
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className={styles.tableFooter}>
          <div className="text-sm text-[#545F7D]">
            Showing <strong>{total === 0 ? 0 : (page - 1) * pageSize + 1}</strong> -
            <strong>{Math.min(page * pageSize, total)}</strong> of{" "}
            <strong>{total}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1 border rounded text-sm">
              First
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded text-sm"
            >
              Prev
            </button>

            <span className="px-3 py-1 border rounded bg-white text-sm">
              {page}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded text-sm"
            >
              Next
            </button>

            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded text-sm"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* subcomponents */
const Th = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
  <th className="px-6 py-4">
    <div className="flex items-center gap-2">
      <span>{label}</span>
      {icon}
      <ArrowUpDown size={12} className="opacity-40" />
    </div>
  </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-5 max-w-[240px] truncate">{children}</td>
);












