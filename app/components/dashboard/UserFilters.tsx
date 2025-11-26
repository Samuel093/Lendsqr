"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (data: any) => void;
  onReset: () => void;
};

export default function UserFilters({
  open,
  onClose,
  onApply,
  onReset,
}: Props) {
  const [form, setForm] = useState({
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  });

  const update = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-xl z-50 p-6 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#213F7D] text-xl font-semibold">
                Filter Users
              </h2>
              <button onClick={onClose}>
                <X size={22} className="text-[#545F7D]" />
              </button>
            </div>

            <div className="space-y-4">
              {/* ORG */}
              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">
                  Organization
                </label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="Organization"
                />
              </div>

              {/* Username */}
              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">
                  Username
                </label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                  placeholder="User"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">
                  Email
                </label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Email"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">
                  Phone Number
                </label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-xs text-[#545F7D] mb-1 block">
                  Status
                </label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="blacklisted">Blacklisted</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                className="flex-1 border border-[#545F7D] text-[#545F7D] py-2 rounded"
                onClick={() => {
                  setForm({
                    organization: "",
                    username: "",
                    email: "",
                    phone: "",
                    date: "",
                    status: "",
                  });
                  onReset();
                }}
              >
                Reset
              </button>

              <button
                className="flex-1 bg-[#39CDCC] text-white py-2 rounded"
                onClick={() => onApply(form)}
              >
                Filter
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

