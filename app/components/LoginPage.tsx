"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // simulate submit
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT - Illustration + logo */}
      <section className="hidden md:flex flex-col justify-between bg-white p-8">
        <header className="w-full max-w-xs">
          {/* Replace /logo.svg with your brand logo placed in /public */}
          <Image src="/images/logo.png" alt="logo" width={140} height={40} priority />
        </header>

        <div className="flex-1 flex items-center justify-center">
          {/* Replace /login-illustration.png with the provided artwork in /public */}
          <div className="w-full max-w-md px-4">
            <Image
              src="/images/illustration.png"
              alt="illustration"
              width={900}
              height={600}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>

        <footer className="h-10" />
      </section>

      {/* RIGHT - Form */}
      <section className="flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Welcome!</h1>
          <p className="mt-3 text-slate-500">Enter details to login.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
                aria-label="Email"
              />
            </label>

            <label className="block relative">
              <span className="sr-only">Password</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
                aria-label="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-teal-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </label>

            <div className="flex items-center justify-between">
              <a href="#" className="text-xs font-medium text-teal-500 hover:underline">FORGOT PASSWORD?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-teal-400 px-6 py-3 text-white font-medium shadow-md disabled:opacity-60"
            >
              {loading ? 'LOGGING IN...' : 'LOG IN'}
            </button>
          </form>

          {/* Small screen alternative: show illustration below form */}
          <div className="mt-10 md:hidden">
            <Image src="/login-illustration.png" alt="illustration" width={900} height={600} style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage;

