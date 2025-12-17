"use client";

import Link from "next/link";

export default function UserDashboard() {
  return (
    <main className="pt-28 pb-32 bg-[#F7F7FB] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold">
              Welcome back 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your events, bookings, and vendor conversations.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white font-medium hover:opacity-90"
          >
            Explore Services →
          </Link>
        </div>

        {/* ================= QUICK STATS ================= */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {[
            { label: "Active Requests", value: "2" },
            { label: "Confirmed Bookings", value: "1" },
            { label: "Vendor Replies", value: "5" },
            { label: "Saved Vendors", value: "3" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ================= ACTIVE BOOKINGS ================= */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Your bookings
            </h2>
            <Link
              href="/booking"
              className="text-sm font-medium text-black hover:underline"
            >
              New booking
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* BOOKING CARD */}
            <div className="bg-white rounded-3xl p-8 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    Wedding Photography
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Event Date: 12 Dec 2025 · Delhi
                  </p>
                </div>

                <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                  Pending
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-5 py-3 rounded-full bg-black text-white text-sm font-medium">
                  View Details
                </button>
                <button className="px-5 py-3 rounded-full border text-sm">
                  Message Vendor
                </button>
              </div>
            </div>

            {/* EMPTY STATE */}
            <div className="bg-white rounded-3xl p-8 shadow flex flex-col justify-center items-center text-center">
              <p className="text-gray-500">
                No confirmed bookings yet
              </p>
              <Link
                href="/services"
                className="mt-4 text-sm font-medium text-black underline"
              >
                Browse vendors
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SAVED VENDORS ================= */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold mb-6">
            Saved vendors
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {["Studio Aura", "Golden Frame", "Pixel Stories"].map((name) => (
              <div
                key={name}
                className="bg-white rounded-3xl p-6 shadow"
              >
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Photography · ⭐ 4.8
                </p>

                <div className="mt-4 flex gap-3">
                  <button className="text-sm font-medium underline">
                    View Profile
                  </button>
                  <button className="text-sm text-gray-500">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= HELP CTA ================= */}
        <section className="mt-32">
          <div className="bg-gradient-to-br from-[#f5f3ff] to-white rounded-3xl p-12 text-center shadow">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Need help deciding?
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Tell us your event details and we’ll suggest the best vendors
              based on your needs and budget.
            </p>

            <Link
              href="/contact"
              className="inline-flex mt-8 px-8 py-4 rounded-full bg-black text-white font-medium"
            >
              Get recommendations →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
