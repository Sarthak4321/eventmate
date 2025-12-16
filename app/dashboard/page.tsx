"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F1A0F] text-white px-6 py-6">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hello, Sampad 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Plan your next event with ease.</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
          <span className="text-lg">👤</span>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="w-full max-w-2xl mx-auto mt-4 mb-10">
        <div className="flex bg-[#1A2A1A] rounded-full px-4 py-3 border border-white/10">
          <input
            type="text"
            placeholder="Search for services, venues, or vendors..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-300"
          />
          <button className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-full text-sm font-medium transition">
            Search
          </button>
        </div>
      </div>

      {/* SERVICE CATEGORIES */}
      <h2 className="text-xl font-semibold mb-4">Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">

        {[
          { name: "Venue", icon: "🏛️" },
          { name: "Photography", icon: "📸" },
          { name: "Videography", icon: "🎥" },
          { name: "Catering", icon: "🍽️" },
          { name: "Decoration", icon: "🎉" },
          { name: "Music & DJ", icon: "🎵" },
        ].map((cat, index) => (
          <Link
            key={index}
            href={`/services?category=${cat.name.toLowerCase()}`}
            className="bg-[#111F12] border border-white/10 flex flex-col items-center justify-center py-6 rounded-xl hover:border-green-500 transition"
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <p className="text-gray-200 font-medium">{cat.name}</p>
          </Link>
        ))}

      </div>

      {/* UPCOMING EVENTS */}
      <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>

      <div className="space-y-4">

        {[1, 2].map((booking) => (
          <div
            key={booking}
            className="bg-[#111F12] border border-white/10 p-5 rounded-xl hover:border-green-500 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Wedding Photography</h3>
              <span className="text-sm text-green-400">Confirmed</span>
            </div>

            <p className="text-gray-400 text-sm">📅 22 December 2024</p>
            <p className="text-gray-400 text-sm">📍 Bhubaneswar, Odisha</p>

            <Link
              href="/booking"
              className="inline-block mt-3 text-green-400 text-sm hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}

      </div>

      {/* SPACING */}
      <div className="h-20" />

    </div>
  );
}
