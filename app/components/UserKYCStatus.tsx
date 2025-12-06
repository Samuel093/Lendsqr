"use client";

import React from "react";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface KYCStatusProps {
  bvnStatus: "verified" | "pending" | "failed";
  ninStatus: "verified" | "pending" | "failed";
  addressStatus: "verified" | "pending" | "failed";
}

const statusMap = {
  verified: {
    icon: <CheckCircle className="text-green-600" size={18} />,
    text: "Verified",
    class: "text-green-700 bg-green-100"
  },
  pending: {
    icon: <AlertCircle className="text-yellow-600" size={18} />,
    text: "Pending",
    class: "text-yellow-700 bg-yellow-100"
  },
  failed: {
    icon: <XCircle className="text-red-600" size={18} />,
    text: "Failed",
    class: "text-red-700 bg-red-100"
  }
};

const UserKYCStatus: React.FC<KYCStatusProps> = ({
  bvnStatus,
  ninStatus,
  addressStatus
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4">KYC Verification Status</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* BVN */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">BVN Status</span>
          <span
            className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium ${statusMap[bvnStatus].class}`}
          >
            {statusMap[bvnStatus].icon}
            {statusMap[bvnStatus].text}
          </span>
        </div>

        {/* NIN */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">NIN Status</span>
          <span
            className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium ${statusMap[ninStatus].class}`}
          >
            {statusMap[ninStatus].icon}
            {statusMap[ninStatus].text}
          </span>
        </div>

        {/* Address Verification */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Address Verification</span>
          <span
            className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium ${statusMap[addressStatus].class}`}
          >
            {statusMap[addressStatus].icon}
            {statusMap[addressStatus].text}
          </span>
        </div>

      </div>
    </div>
  );
};

export default UserKYCStatus;
