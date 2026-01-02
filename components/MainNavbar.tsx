"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function MainNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between rounded-full bg-white/70 backdrop-blur-xl border shadow-sm px-5 py-3">

          {/* LOGO */}
          <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
            <Logo size="md" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <Link href="/" className="hover:text-black">Home</Link>
            <Link href="/services" className="hover:text-black">Services</Link>
            <Link href="/about" className="hover:text-black">About</Link>
            <Link href="/contact" className="hover:text-black">Contact</Link>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-full hover:bg-black/5"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t shadow-lg">
          <nav className="flex flex-col px-6 py-6 space-y-4 text-gray-700 text-base">

            <Link onClick={() => setOpen(false)} href="/">Home</Link>
            <Link onClick={() => setOpen(false)} href="/services">Services</Link>
            <Link onClick={() => setOpen(false)} href="/about">About</Link>
            <Link onClick={() => setOpen(false)} href="/contact">Contact</Link>

            <div className="pt-4 border-t flex flex-col gap-3">
              <Link
                onClick={() => setOpen(false)}
                href="/auth/login"
                className="w-full text-center py-2 rounded-full border"
              >
                Login
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/auth/signup"
                className="w-full text-center py-2 rounded-full bg-black text-white"
              >
                Get Started
              </Link>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}
