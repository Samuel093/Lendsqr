"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./login.module.scss";
import { login } from "@/lib/auth";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles["login-wrapper"]}>
      {/* LEFT SIDE – illustration + logo */}
      <section className={styles["left-panel"]}>
        <header>
          <Image
            src="/images/logo.png"
            alt="lendsqr logo"
            width={150}
            height={40}
            priority
          />
        </header>

        <div className="flex items-center justify-center">
          <Image
            src="/images/illustration.png"
            alt="login illustration"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        <footer />
      </section>

      {/* RIGHT SIDE – form */}
      <section className={styles["right-panel"]}>
        <div className={styles["form-container"]}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#213F7D]">
            Welcome!
          </h1>

          <p className="mt-2 text-[#545F7D]">Enter details to login.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email input */}
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border border-[#DDE2E9] rounded-lg px-4 py-3 text-sm placeholder-[#A3A3A3]
                  focus:outline-none focus:ring-2 focus:ring-[#39CDCC]"
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border border-[#DDE2E9] rounded-lg px-4 py-3 text-sm placeholder-[#A3A3A3]
                  focus:outline-none focus:ring-2 focus:ring-[#39CDCC]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#39CDCC]"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="text-xs font-semibold text-[#39CDCC]"
              >
                FORGOT PASSWORD?
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#39CDCC] text-white text-sm font-semibold
                transition-all shadow-sm disabled:opacity-60"
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>

          {/* Illustration for mobile users */}
          <div className="mt-10 md:hidden">
            <Image
              src="/images/illustration.png"
              alt="mobile illustration"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
