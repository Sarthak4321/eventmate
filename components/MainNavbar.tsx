"use client";

import Link from "next/link";

export default function MainNavbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-full bg-white/70 backdrop-blur-xl border shadow-sm px-6 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
            <span className="font-semibold text-lg tracking-tight">
              EventMate
            </span>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm px-4 py-2 rounded-full hover:bg-black/5"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm px-5 py-2 rounded-full bg-black text-white hover:bg-black/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
