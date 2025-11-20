"use client";

import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.scss";

import Sidebar from "@/app/components/navigation/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";

import StatCard from "@/app/components/StatCard";
import UserTable from "@/app/components/UserTable";

import { fetchUsers } from "@/lib/api";
import { User } from "@/lib/types";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then((data: User[]) => setUsers(data));
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-[#FBFBFB]">

      {/* SIDEBAR */}
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* HEADER */}
        <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(true)} />

        {/* PAGE CONTENT */}
        <main className={`${styles.dashboard} w-full`}>

          {/* PAGE TITLE — perfectly aligned with Figma */}
          <h1 className="text-[24px] md:text-[28px] font-semibold text-[#213F7D] tracking-tight mb-6">
            Users
          </h1>

          {/* STAT CARDS */}
          <section className={styles.stats}>
            <StatCard icon="/images/user_icon.svg" label="USERS" value="2,453" />
            <StatCard icon="/images/active_user_icon.svg" label="ACTIVE USERS" value="2,453" />
            <StatCard icon="/images/user_with_loan_icon.svg" label="USERS WITH LOANS" value="12,453" />
            <StatCard icon="/images/user_with_savings_icon.svg" label="USERS WITH SAVINGS" value="102,453" />
          </section>

          {/* USERS TABLE – aligned exactly with grid */}
          <div className="mt-10">
            <UserTable users={users} />
          </div>
        </main>
      </div>
    </div>
  );
}









