"use client";

import { useState } from "react";
import Link from "next/link";

type EventType = "Wedding" | "Birthday" | "Corporate" | "Other";

const EVENT_SERVICES: Record<EventType, any[]> = {
  Wedding: [
    { id: "venues", title: "Wedding Venues", desc: "Indoor & outdoor venues", icon: "🏛️" },
    { id: "photography", title: "Photography", desc: "Candid & cinematic coverage", icon: "📸" },
    { id: "makeup", title: "Makeup Artists", desc: "Bridal & party makeup experts", icon: "💄" },
  ],
  Birthday: [
    { id: "decor", title: "Decor & Styling", desc: "Themes & balloon decor", icon: "🎈" },
    { id: "photography", title: "Photography", desc: "Capture every moment", icon: "📸" },
    { id: "entertainment", title: "Entertainment", desc: "DJs, magicians & games", icon: "🎶" },
  ],
  Corporate: [
    { id: "venues", title: "Corporate Venues", desc: "Conference & banquet spaces", icon: "🏢" },
    { id: "catering", title: "Corporate Catering", desc: "Professional menus & buffets", icon: "🍽️" },
    { id: "photography", title: "Event Photography", desc: "Corporate-grade coverage", icon: "📷" },
  ],
  Other: [
    { id: "decor", title: "Decor & Styling", desc: "Custom event styling", icon: "✨" },
    { id: "entertainment", title: "Entertainment", desc: "Live shows & performers", icon: "🎤" },
  ],
};

export default function ServicesPage() {
  const [event, setEvent] = useState<EventType>("Wedding");

  return (
    <main className="bg-[#F7F7FB] min-h-screen pt-32 pb-40">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-semibold">
          Plan smart. Book better.
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Compare verified vendors, check availability, and book directly — zero commission.
        </p>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-24 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-wrap gap-3 items-center">
            <span className="font-medium text-gray-700 mr-2">
              Event type:
            </span>

            {(["Wedding", "Birthday", "Corporate", "Other"] as EventType[]).map((e) => (
              <button
                key={e}
                onClick={() => setEvent(e)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  event === e
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-semibold">
            Recommended for your {event.toLowerCase()} event
          </h2>
          <span className="text-sm text-gray-500">
            {EVENT_SERVICES[event].length} services available
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {EVENT_SERVICES[event].map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-3xl p-8 shadow hover:shadow-lg transition"
            >
              <div className="text-4xl">{s.icon}</div>

              <h3 className="mt-4 text-xl font-semibold">
                {s.title}
              </h3>

              <p className="mt-2 text-gray-600">
                {s.desc}
              </p>

              <Link
                href={`/services/${s.id}`}
                className="inline-block mt-6 text-sm font-medium text-[#6D5DF6]"
              >
                View top vendors →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
