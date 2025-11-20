"use client";

import React from "react";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menu = [
    {
      title: "CUSTOMERS",
      items: [
        { label: "Users", href: "/dashboard", icon: "/icons/user.svg" },
        { label: "Guarantors", href: "#", icon: "/icons/guarantor.svg" },
        { label: "Loans", href: "#", icon: "/icons/loan.svg" },
        { label: "Decision Models", href: "#", icon: "/icons/decision.svg" },
        { label: "Savings", href: "#", icon: "/icons/savings.svg" },
        { label: "Loan Requests", href: "#", icon: "/icons/request.svg" },
        { label: "Whitelist", href: "#", icon: "/icons/whitelist.svg" },
        { label: "Karma", href: "#", icon: "/icons/karma.svg" },
      ],
    },

    {
      title: "BUSINESSES",
      items: [
        { label: "Organization", href: "#", icon: "/icons/organization.svg" },
        { label: "Loan Products", href: "#", icon: "/icons/request.svg" },
        { label: "Savings Products", href: "#", icon: "/icons/product.svg" },
        { label: "Fees and Charges", href: "#", icon: "/icons/fee.svg" },
        { label: "Transactions", href: "#", icon: "/icons/transaction.svg" },
        { label: "Services", href: "#", icon: "/icons/services.svg" },
        { label: "Service Account", href: "#", icon: "/icons/account.svg" },
        { label: "Settlements", href: "#", icon: "/icons/settlement.svg" },
        { label: "Reports", href: "#", icon: "/icons/report.svg" },
      ],
    },

    {
      title: "SETTINGS",
      items: [
        { label: "Preferences", href: "#", icon: "/icons/preferences.svg" },
        { label: "Fees and Pricing", href: "#", icon: "/icons/fee_price.svg" },
        { label: "Audit Logs", href: "#", icon: "/icons/audit.svg" },
      ],
    },
  ];

  return (
    <>
      {/* OVERLAY (mobile only) */}
      {open && <div className={styles.overlay} onClick={onClose} />}

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        {/* CLOSE BUTTON (mobile only) */}
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={28} />
        </button>

        <div className={styles.inner}>
          {/* LOGO + BRAND NAME */}
         

          {/* SWITCH ORGANIZATION */}
          <div className={styles.switchOrg}>
            <Image
              src="/icons/switch_icon.svg"
              width={18}
              height={18}
              alt="switch"
            />
            <span>Switch Organization</span>
            <Image
              src="/icons/dropdown.svg"
              width={14}
              height={14}
              alt="dropdown"
            />
          </div>

          {/* DASHBOARD MAIN LINK */}
          <Link
            href="/dashboard"
            className={`${styles.dashboardLink} ${
              pathname === "/dashboard" ? styles.active : ""
            }`}
          >
            <Image
              src="/icons/dashboard_icon.svg"
              width={18}
              height={18}
              alt="Dashboard"
            />
            <span>Dashboard</span>
          </Link>

          {/* MENU SECTIONS */}
          {menu.map((section, i) => (
            <div key={i} className={styles.section}>
              <p className={styles.sectionTitle}>{section.title}</p>

              {section.items.map((item, idx) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`${styles.menuItem} ${
                      active ? styles.active : ""
                    }`}
                  >
                    <Image
                      src={item.icon}
                      width={18}
                      height={18}
                      alt={item.label}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}



