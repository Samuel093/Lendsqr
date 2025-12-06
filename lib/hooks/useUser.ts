// lib/hooks/useUser.ts
"use client";

import { useState, useEffect } from "react";

export default function useUser(id?: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/users/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message || "Error"))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}
