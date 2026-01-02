"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function VendorNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
          <Logo size="md" />
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/vendor/dashboard" className="hover:text-black">
            Dashboard
          </Link>
          <Link href="/vendor/services" className="hover:text-black">
            My Services
          </Link>
          <Link href="/vendor/bookings" className="hover:text-black">
            Bookings
          </Link>
        </nav>

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-full border px-3 py-2 hover:bg-gray-50"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
              V
            </div>
            <span className="hidden md:block text-sm font-medium">
              Vendor
            </span>
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border overflow-hidden">
              <Link
                href="/vendor/profile"
                className="block px-4 py-3 text-sm hover:bg-gray-50"
              >
                Profile
              </Link>
              <Link
                href="/vendor/settings"
                className="block px-4 py-3 text-sm hover:bg-gray-50"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  // later replace with real logout
                  alert("Logged out");
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
