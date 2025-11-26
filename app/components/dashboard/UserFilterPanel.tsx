"use client";

import React from "react";
import styles from "./UserFilterPanel.module.scss";

type Props = {
  isOpen: boolean;               
  onClose: () => void;           
  onApply: (data: any) => void;  
  onReset: () => void;           
};

export default function UserFilterPanel({
  isOpen,
  onClose,
  onApply,
  onReset,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);

    const filters = {
      organization: form.get("organization") || "",
      status: form.get("status") || "",
      dateRange: form.get("dateRange") || "",
      search: form.get("search") || "",
    };

    onApply(filters);
    onClose();
  };

  return (
    <aside className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
      <header className={styles.header}>
        <h2>Filters</h2>
        <button onClick={onClose} aria-label="Close filter panel">×</button>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Organization</label>
          <input name="organization" type="text" />
        </div>

        <div className={styles.field}>
          <label>Status</label>
          <select name="status">
            <option value="">Any</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Date Range</label>
          <input name="dateRange" type="date" />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.resetBtn} onClick={onReset}>
            Reset
          </button>
          <button type="submit" className={styles.applyBtn}>
            Apply
          </button>
        </div>
      </form>
    </aside>
  );
}
