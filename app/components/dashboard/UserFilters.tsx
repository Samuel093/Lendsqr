// app/components/dashboard/UserFilters.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (data: any) => void;
  onReset: () => void;
};

export default function UserFilters({ open, onClose, onApply, onReset }: Props) {
  const [form, setForm] = useState({
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    if (!open) {
      // reset local form if closed (optional)
    }
  }, [open]);

  const update = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ type: "spring", damping: 16, stiffness: 220 }}
        >
          <div className="bg-white rounded-xl p-4 shadow-md w-full">
            {/* header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#213F7D] text-lg font-semibold">Filter Users</h3>
              <button onClick={onClose} aria-label="Close filters">
                <X size={20} className="text-[#6B7280]" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">Organization</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Organization" />
              </div>

              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">Username</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={form.username} onChange={(e) => update("username", e.target.value)} placeholder="Username" />
              </div>

              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">Email</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email" />
              </div>

              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">Phone Number</label>
                <input className="w-full border rounded px-3 py-2 text-sm" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone Number" />
              </div>

              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">Date</label>
                <input type="date" className="w-full border rounded px-3 py-2 text-sm" value={form.date} onChange={(e) => update("date", e.target.value)} />
              </div>

              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">Status</label>
                <select className="w-full border rounded px-3 py-2 text-sm" value={form.status} onChange={(e) => update("status", e.target.value)}>
                  <option value="">Select</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="blacklisted">Blacklisted</option>
                </select>
              </div>
            </div>

            {/* footer */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setForm({ organization: "", username: "", email: "", phone: "", date: "", status: "" });
                  onReset();
                }}
                className="flex-1 border border-[#9CA3AF] text-[#374151] py-2 rounded"
              >
                Reset
              </button>

              <button
                onClick={() => onApply(form)}
                className="flex-1 bg-[#39CDCC] text-white py-2 rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



