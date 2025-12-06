// components/SkeletonLoader.tsx
"use client";

import React from "react";

export default function SkeletonLoader({ lines = 6 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
      ))}
    </div>
  );
}
