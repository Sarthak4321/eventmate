"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

const vendors = [
  {
    id: 1,
    name: "Studio Aura",
    city: "Delhi",
    price: 50000,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
  },
  {
    id: 2,
    name: "Golden Frame",
    city: "Mumbai",
    price: 65000,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  },
  {
    id: 3,
    name: "Pixel Stories",
    city: "Bangalore",
    price: 45000,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  },
];

export default function ServiceDetailPage() {
  const { id } = useParams(); // ✅ CORRECT
  const serviceId = String(id).replace("-", " ");

  /* ---------------- STATE ---------------- */
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
    <main className="bg-[#0B0B0B] text-white min-h-screen">

      {/* HERO */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-fuchsia-600/40 via-black to-indigo-600/40">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-black capitalize">
            {serviceId}
          </h1>
          <p className="mt-4 text-white/80 max-w-xl">
            Compare verified vendors, pricing & availability. Book directly.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-24 z-20 bg-black/90 backdrop-blur border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 overflow-x-auto">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
          >
            <option>All</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
          </select>

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
          >
            <option value="All">All Budgets</option>
            <option value="<50k">Below ₹50k</option>
            <option value="50k+">₹50k+</option>
          </select>
        </div>
      </section>

      {/* VENDOR LIST */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {filteredVendors.map((v) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white text-black rounded-3xl overflow-hidden shadow-xl"
            >
              <img src={v.img} className="h-64 w-full object-cover" />

              <div className="p-6">
                <h3 className="text-xl font-black">{v.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{v.city}</p>

                <p className="mt-3 font-semibold">
                  Starting at ₹{v.price.toLocaleString()}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    href="/booking"
                    className="flex-1 text-center px-5 py-3 rounded-full bg-black text-white font-semibold"
                  >
                    Book Now
                  </Link>
                  <button className="px-5 py-3 rounded-full border border-black text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
