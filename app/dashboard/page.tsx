// components/DashboardPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "../dashboard/dashboard.module.scss";

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
    fetchUsers().then((data: User[]) => setUsers(data || []));
  }, []);

  return (
    <div className="flex w-full min-h-screen bg-[#FBFBFB]">
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader onToggleSidebar={() => setIsSidebarOpen(true)} />

 <main className={`${styles.dashboard}`}>
  <div className={styles.container}>
    <h1 className="pageTitle">Users</h1>

    <section className={styles.stats}>
      <StatCard icon="/images/user_icon.svg" label="USERS" value="2,453" />
      <StatCard icon="/images/active_user_icon.svg" label="ACTIVE USERS" value="2,453" />
      <StatCard icon="/images/user_with_loan_icon.svg" label="USERS WITH LOANS" value="12,453" />
      <StatCard icon="/images/user_with_savings_icon.svg" label="USERS WITH SAVINGS" value="102,453" />
    </section>

    <section className={styles.tableSection}>
      <UserTable users={users} />
    </section>
  </div>
</main>

      </div>
    </div>
  );
}











