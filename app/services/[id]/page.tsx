"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    id: "venues",
    title: "🔥 Wedding Venues",
    vibe: "Big energy. Bigger memories.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600",
  },
  {
    id: "photography",
    title: "📸 Photography",
    vibe: "Pics or it didn’t happen.",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600",
  },
  {
    id: "catering",
    title: "🍽️ Catering",
    vibe: "Guests still talking about it.",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600",
  },
  {
    id: "decor",
    title: "✨ Decor",
    vibe: "Main-character aesthetics.",
    img: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1600",
  },
  {
    id: "entertainment",
    title: "🎶 Entertainment",
    vibe: "No boring moments allowed.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="min-h-screen flex items-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-black to-indigo-600" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6"
        >
          <h1 className="text-[14vw] md:text-[7vw] font-black leading-[0.9]">
            SERVICES
            <br />
            THAT HIT
          </h1>

          <p className="mt-6 text-xl text-white/80 max-w-xl">
            Weddings, parties, chaos —  
            pick your vibe and make it iconic.
          </p>

          <Link
            href="#list"
            className="inline-block mt-10 px-8 py-4 bg-white text-black rounded-full font-bold"
          >
            Show me 🔥
          </Link>
        </motion.div>
      </section>

      {/* SCROLL TEXT */}
      <div className="border-y border-white/10 py-6 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap text-2xl font-black"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>
              NO COMMISSION · VERIFIED VENDORS · REAL EVENTS 🔥
            </span>
          ))}
        </motion.div>
      </div>

      {/* SERVICES SLIDER */}
      <section id="list" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-16">
            Pick your vibe 👇
          </h2>

          <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6">
            {services.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.06, rotate: -1 }}
                className="min-w-[340px] snap-start rounded-3xl bg-white text-black overflow-hidden"
              >
                <img src={s.img} className="h-64 w-full object-cover" />

                <div className="p-6">
                  <h3 className="text-2xl font-black">{s.title}</h3>
                  <p className="mt-2 text-gray-600">{s.vibe}</p>

                  <Link
                    href={`/services/${s.id}`}
                    className="inline-block mt-6 font-bold text-fuchsia-600"
                  >
                    Explore →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-gradient-to-r from-fuchsia-600 to-indigo-600">
        <h2 className="text-5xl font-black">
          Don’t overthink it.
        </h2>
        <p className="mt-4 text-xl">
          Tell us the vibe — we’ll handle the rest.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-10 px-10 py-5 bg-black text-white rounded-full font-bold"
        >
          Help me plan 🚀
        </Link>
      </section>

    </main>
  );
}
