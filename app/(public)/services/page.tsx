"use client";

import { ServiceCards } from "@/components/ServiceCards";
import { useState } from "react";

export default function ServicesPage() {
  const [eventType, setEventType] = useState("Wedding");

  return (
    <main className="bg-[#FAFAFB] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
            ✨ AI-Powered Recommendations
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight max-w-3xl">
            Everything you need to plan an unforgettable event
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl">
            Tell us about your event and EventMate intelligently recommends
            the best services, vendors, and add-ons — saving you days of research.
          </p>

        </div>
      </section>

      {/* ================= AI SUGGESTION BAR ================= */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">Planning an event?</p>
              <h3 className="text-xl font-semibold">
                Get AI-recommended services for
              </h3>
            </div>

            <div className="flex gap-3 flex-wrap">
              {["Wedding", "Birthday", "Corporate", "Other"].map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    eventType === type
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <button className="px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium">
              Get Suggestions →
            </button>

          </div>
        </div>
      </section>

      {/* ================= AI RECOMMENDED SERVICES ================= */}
      <section className="mb-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold">
              Recommended for your {eventType.toLowerCase()} event
            </h2>
            <span className="text-sm text-gray-500">
              Based on 12,000+ similar events
            </span>
          </div>

          <ServiceCards />

        </div>
      </section>

      {/* ================= SMART BUNDLES ================= */}
      <section className="mb-32">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-2xl font-semibold mb-10">
            Smart bundles people love
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Wedding Essentials",
                desc: "Venue + Photography + Makeup",
              },
              {
                title: "Grand Celebration",
                desc: "Decor + Catering + Entertainment",
              },
              {
                title: "All-in-One Premium",
                desc: "Everything you need, managed seamlessly",
              },
            ].map((bundle) => (
              <div
                key={bundle.title}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">
                  {bundle.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {bundle.desc}
                </p>

                <button className="mt-6 text-sm font-medium text-indigo-600">
                  View bundle →
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">

          <div>
            <p className="text-4xl font-semibold">1,200+</p>
            <p className="mt-2 text-gray-600">Verified vendors</p>
          </div>

          <div>
            <p className="text-4xl font-semibold">50,000+</p>
            <p className="mt-2 text-gray-600">Events planned</p>
          </div>

          <div>
            <p className="text-4xl font-semibold">0%</p>
            <p className="mt-2 text-gray-600">Commission model</p>
          </div>

        </div>
      </section>

    </main>
  );
}
