"use client";

import React from "react";
import { useParams } from "next/navigation";
import useUser from "@/lib/hooks/useUser";
import SkeletonLoader from "./components/SkeletonLoader";
import GeneralDetails from "./components/TabPanels/GeneralDetails";
import DocumentsTab from "./components/TabPanels/Documents";
import BankDetails from "./components/TabPanels/BankDetails";
import LoansTab from "./components/TabPanels/Loans";
import SavingsTab from "./components/TabPanels/Savings";
import AppAndSystem from "./components/TabPanels/AppAndSystem";

export default function UserDetailsClient() {
  const params = useParams();
  
  // 🔥 FIX for TypeScript error: ensure id is always a string
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const { data, loading } = useUser(id);

  const [tab, setTab] = React.useState("general");

  if (loading) return <div className="p-6"><SkeletonLoader lines={8} /></div>;

  const docs = data?.documents ?? [];
  const bank = data?.bank;
  const loans = data?.loans ?? [];
  const savings = data?.savings ?? [];
  const meta = data?.meta ?? null;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <p className="text-sm text-[#6B7280]">{data?.email}</p>
        </div>
      </div>

      {/* TABS */}
      <div>
        <div className="flex gap-4">
          <button onClick={() => setTab("general")}  className={tab==="general" ? "underline" : ""}>General</button>
          <button onClick={() => setTab("documents")} className={tab==="documents" ? "underline" : ""}>Documents</button>
          <button onClick={() => setTab("bank")}      className={tab==="bank" ? "underline" : ""}>Bank</button>
          <button onClick={() => setTab("loans")}     className={tab==="loans" ? "underline" : ""}>Loans</button>
          <button onClick={() => setTab("savings")}   className={tab==="savings" ? "underline" : ""}>Savings</button>
          <button onClick={() => setTab("system")}    className={tab==="system" ? "underline" : ""}>App & System</button>
        </div>

        {/* TAB PANELS */}
        <div className="mt-6">
          {tab === "general"   && <GeneralDetails />}
          {tab === "documents" && <DocumentsTab docs={docs} />}
          {tab === "bank"      && <BankDetails bank={bank} />}
          {tab === "loans"     && <LoansTab loans={loans} />}
          {tab === "savings"   && <SavingsTab savings={savings} />}
          {tab === "system"    && <AppAndSystem meta={meta} />}
        </div>
      </div>
    </div>
  );
}


