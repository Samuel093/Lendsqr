"use client";

import { useEffect, useState } from "react";
import LoginPage from "./login/page";
import DashboardPage from "@/app/dashboard/page";


export default function HomePage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setAuthenticated(!!token);
  }, []);

  // Still checking localStorage — avoid flicker
  if (authenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If user has token → dashboard
  if (authenticated) {
    return <DashboardPage />;
  }

  // Otherwise → login page
  return <LoginPage />;
}

