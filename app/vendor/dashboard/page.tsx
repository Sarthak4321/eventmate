"use client";

import Link from "next/link";
import VendorNavbar from "@/components/VendorNavbar";


export default function VendorDashboard() {
  return (
    <main className="min-h-screen bg-[#F7F7FB] pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6">

        <VendorNavbar />

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold">Vendor Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Track performance, manage services, and respond to bookings.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/vendor/services"
              className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:opacity-90"
            >
              + Add Service
            </Link>
            <Link
              href="/vendor/profile"
              className="px-6 py-3 rounded-full border border-black/10 text-sm hover:bg-black/5"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Views", value: "12,480" },
            { label: "Bookings", value: "128" },
            { label: "Active Services", value: "6" },
            { label: "Earnings", value: "₹4.8L" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">

          {/* LEFT: BOOKINGS */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Booking Requests</h2>
              <Link
                href="/vendor/bookings"
                className="text-sm text-indigo-600 hover:underline"
              >
                View all
              </Link>
            </div>

            {/* Empty state */}
            <div className="text-center py-16 border border-dashed rounded-2xl">
              <p className="text-gray-500">
                No new booking requests yet
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Optimize your profile to get discovered faster.
              </p>
            </div>
          </div>

          {/* RIGHT: PROFILE STATUS */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Profile Completion
            </h2>

            {/* Progress */}
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="w-[65%] h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Your profile is <strong>65% complete</strong>
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li>• Add portfolio images</li>
              <li>• Add pricing details</li>
              <li>• Verify contact info</li>
            </ul>

            <Link
              href="/vendor/profile"
              className="inline-block mt-6 text-sm text-indigo-600 font-medium"
            >
              Complete profile →
            </Link>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="mt-14 bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4 text-sm text-gray-600">
            <p>• Your profile was viewed 24 times today</p>
            <p>• One customer bookmarked your service</p>
            <p>• You appeared in 3 search results</p>
          </div>
        </div>

      </div>
    </main>
  );
}
