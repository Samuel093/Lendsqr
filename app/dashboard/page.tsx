import React from "react";
import DashboardPageClient from "@/app/components/dashboard/DashboardPageClient";
import { fetchUsersLocal } from "@/lib/api";
import { User } from "@/lib/types";

export default async function DashboardServerPage() {
  const users: User[] = await fetchUsersLocal();
  return <DashboardPageClient initialUsers={users} />;
}















