"use client";

import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  type: "Credit" | "Debit";
  amount: number;
  status: "Successful" | "Pending" | "Failed";
  reference: string;
}

interface Props {
  transactions: Transaction[];
}

const statusClasses = {
  Successful: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700"
};

const UserTransactions: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Type</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Reference</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-50 transition-colors text-sm"
              >
                <td className="py-3">{t.date}</td>

                <td className="py-3 flex items-center gap-2">
                  {t.type === "Credit" ? (
                    <ArrowDownLeft size={16} className="text-green-600" />
                  ) : (
                    <ArrowUpRight size={16} className="text-red-600" />
                  )}
                  {t.type}
                </td>

                <td className="py-3 font-medium">₦{t.amount.toLocaleString()}</td>

                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[t.status]}`}
                  >
                    {t.status}
                  </span>
                </td>

                <td className="py-3 text-gray-600">{t.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransactions;
