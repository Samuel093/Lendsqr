"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { User } from "@/lib/types";
import StatusBadge from "@/app/components/StatusBadge";
import styles from "@/app/dashboard/dashboard.module.scss";
import UserFilters from "@/app/components/dashboard/UserFilters";

import {
  Building2,
  User as UserIcon,
  Mail,
  Phone,
  CalendarDays,
  BadgeCheck,
  ArrowUpDown,
  Filter,
  X,
} from "lucide-react";

type Props = {
  users: User[];
};

const PAGE_SIZES = [10, 25, 50, 100];

export default function UserTable({ users }: Props) {
  const safeUsers = users ?? [];

  const [sortKey, setSortKey] =
    useState<"organization" | "username" | "created_at">("organization");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<any>({});
  const [statusFilter, setStatusFilter] = useState("all");

  const [openFilters, setOpenFilters] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(1);
  }, [pageSize, statusFilter, sortKey, sortDir, filters]);

  const safe = (val: any, fallback = "N/A") =>
    val === null || val === undefined ? fallback : val;

  const normalizeStatus = (s?: string) =>
    s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : "Inactive";

  const filteredSorted = useMemo(() => {
    let list = [...safeUsers];

    if (filters.organization)
      list = list.filter((u) =>
        u.profile?.organization
          ?.toLowerCase()
          .includes(filters.organization.toLowerCase())
      );

    if (filters.username)
      list = list.filter((u) =>
        u.profile?.username
          ?.toLowerCase()
          .includes(filters.username.toLowerCase())
      );

    if (filters.email)
      list = list.filter((u) =>
        u.email?.toLowerCase().includes(filters.email.toLowerCase())
      );

    if (filters.phone)
      list = list.filter((u) =>
        u.phone?.toLowerCase().includes(filters.phone.toLowerCase())
      );

    if (filters.date)
      list = list.filter((u) => u.created_at?.slice(0, 10) === filters.date);

    if (statusFilter !== "all")
      list = list.filter(
        (u) =>
          normalizeStatus(u.status).toLowerCase() ===
          statusFilter.toLowerCase()
      );

    const getKey = (u: User) => {
      if (sortKey === "organization") return u.profile?.organization ?? "";
      if (sortKey === "username") return u.profile?.username ?? "";
      return u.created_at ?? "";
    };

    list.sort((a, b) => {
      const aKey = String(getKey(a));
      const bKey = String(getKey(b));
      return sortDir === "asc"
        ? aKey.localeCompare(bKey)
        : bKey.localeCompare(aKey);
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

  // Outside click to close drawer
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (openFilters && drawerRef.current && !drawerRef.current.contains(e.target as Node))
        setOpenFilters(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openFilters]);

  // ESC to close drawer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFilters(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative">
      {/* Overlay */}
      {openFilters && (
        <div className="fixed inset-0 bg-black/30 z-40" aria-label="dim" />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-[360px] bg-white shadow-xl z-50 transform transition-transform duration-300 
          ${openFilters ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
      >
        <UserFilters
          open={openFilters}
          onClose={() => setOpenFilters(false)}
          onApply={(data) => {
            setFilters(data);
            setOpenFilters(false);
          }}
          onReset={() => setFilters({})}
        />
      </div>

      {/* Card */}
      <div className={styles.tableCard}>
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-4 w-full">
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

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-2 py-1 text-sm hidden md:block"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="blacklisted">Blacklisted</option>
            </select>
          </div>

          <button
            onClick={() => setOpenFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#39CDCC] text-white rounded-md text-sm shadow"
          >
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* TABLE */}
        <div className={styles.tableResponsive}>
          <table className="hidden sm:table w-full text-left">
            <thead className="bg-[#F9FAFC] text-xs text-[#545F7D] uppercase tracking-wide">
              <tr>
                <Th label="Organization" icon={<Building2 size={14} />} />
                <Th label="Username" icon={<UserIcon size={14} />} />
                <Th label="Email" icon={<Mail size={14} />} />
                <Th label="Phone Number" icon={<Phone size={14} />} />
                <Th label="Date Joined" icon={<CalendarDays size={14} />} />
                <Th label="Status" icon={<BadgeCheck size={14} />} />
              </tr>
            </thead>

            <tbody className="text-[#545F7D]">
              {pageData.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-[#E0E3EB] hover:bg-[#FBFCFF] focus:bg-[#F1F5FF]"
                  tabIndex={0}
                >
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
            </tbody>
          </table>

          {/* MOBILE CARDS */}
          <div className="sm:hidden space-y-3">
            {pageData.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-md border border-[#E0E3EB] p-4"
              >
                <div className="text-sm text-[#545F7D]">
                  {safe(u.profile?.organization)}
                </div>

                <div className="text-base font-semibold text-[#213F7D]">
                  {safe(u.profile?.username)}
                </div>

                <div className="text-sm mt-2">{safe(u.email)}</div>
                <div className="text-sm mt-2">{safe(u.phone)}</div>

                <div className="text-xs mt-1 text-[#6B7280]">
                  {prettyDate(u.created_at)}
                </div>

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
            Showing <strong>{(page - 1) * pageSize + 1}</strong> -{" "}
            <strong>{Math.min(page * pageSize, total)}</strong> of{" "}
            <strong>{total}</strong>
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
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-3 py-1 border rounded bg-white text-sm">
              {page}
            </span>

            <button
              onClick={() => setPage(page + 1)}
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
    </div>
  );
}

/* SUBCOMPONENTS */
const Th = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
  <th className="px-6 py-4 select-none">
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
      <ArrowUpDown size={12} className="opacity-60" />
    </div>
  </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-5 max-w-[220px] truncate">{children}</td>
);









