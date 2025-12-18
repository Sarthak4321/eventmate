"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ---------------- MOCK DATA (replace later) ---------------- */
const vendors = [
  {
    id: 1,
    name: "Studio Aura",
    city: "Delhi",
    price: 50000,
    rating: 4.8,
    reviews: 124,
    verified: true,
    img: "/hero/photography.jpg",
  },
  {
    id: 2,
    name: "Golden Frame",
    city: "Mumbai",
    price: 65000,
    rating: 4.9,
    reviews: 210,
    verified: true,
    img: "/hero/wedding-venue.jpg",
  },
  {
    id: 3,
    name: "Pixel Stories",
    city: "Bangalore",
    price: 45000,
    rating: 4.7,
    reviews: 98,
    verified: false,
    img: "/hero/decor.jpg",
  },
];

export default function ServiceDetailPage() {
  const { id } = useParams();
  const serviceName = String(id).replace(/-/g, " ");

  /* ---------------- FILTER STATE ---------------- */
  const [city, setCity] = useState("All");
  const [budget, setBudget] = useState("All");

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      if (city !== "All" && v.city !== city) return false;
      if (budget === "<50k" && v.price >= 50000) return false;
      if (budget === "50k+" && v.price < 50000) return false;
      return true;
    });
  }, [city, budget]);

  return (
    <main className="bg-[#FAFAFB] text-gray-900 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-100 via-white to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold capitalize">
            {serviceName}
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl">
            Compare verified vendors, pricing & availability.
            Book directly — no commission.
          </p>
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      {/* ================= FILTER BAR ================= */}
      <section className="sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="
      mt-6 mb-10
      flex flex-wrap items-center gap-3
      bg-white/90 backdrop-blur-xl
      border border-gray-200
      rounded-2xl
      px-4 py-3
      shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]
    ">

            {/* LOCATION */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 mr-1">
                Location
              </span>

              {["All", "Delhi", "Mumbai", "Bangalore"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`
              px-4 py-1.5 rounded-full text-sm font-medium
              transition-all
              ${city === c
                      ? "bg-black text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="hidden sm:block h-6 w-px bg-gray-200 mx-2" />

            {/* BUDGET */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 mr-1">
                Budget
              </span>

              {[
                { label: "All", value: "All" },
                { label: "Below ₹50k", value: "<50k" },
                { label: "₹50k+", value: "50k+" },
              ].map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBudget(b.value)}
                  className={`
              px-4 py-1.5 rounded-full text-sm font-medium
              transition-all
              ${budget === b.value
                      ? "bg-black text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
                >
                  {b.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ================= VENDOR GRID ================= */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {filteredVendors.map((v) => (
            <motion.div
              key={v.id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={v.img}
                  alt={v.name}
                  className="absolute inset-0 w-full h-full object-cover
                             transition-transform duration-700
                             group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t
                                from-black/40 via-black/10 to-transparent" />

                {v.verified && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-black/80 text-white">
                    ✓ Verified
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 md:p-6">
                <h3 className="text-xl font-semibold">{v.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{v.city}</p>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-yellow-500">★ {v.rating}</span>
                  <span className="text-gray-400">
                    ({v.reviews} reviews)
                  </span>
                </div>

                {v.rating >= 4.8 && (
                  <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Top Rated
                  </span>
                )}

                <p className="mt-4 font-semibold">
                  Starting at ₹{v.price.toLocaleString()}
                </p>

                {/* CTA */}
                <div className="mt-6 flex gap-3">
                  <Link
                    href="/booking"
                    className="flex-1 text-center px-5 py-3 rounded-full bg-black text-white font-medium hover:opacity-90"
                  >
                    Check Availability →
                  </Link>
                  <button className="px-5 py-3 rounded-full border text-sm hover:bg-gray-50">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredVendors.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-20">
              No vendors match your filters.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
