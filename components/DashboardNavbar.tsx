"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("eventmate_role");
    router.push("/auth/login");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
          <span className="font-semibold text-lg">EventMate</span>
        </div>

        {/* DASHBOARD LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>
          <Link href="/services" className="hover:text-black">
            Explore Services
          </Link>
          <Link href="/booking" className="hover:text-black">
            New Booking
          </Link>
        </nav>

        {/* PROFILE */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
