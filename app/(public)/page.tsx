"use client";

import Link from "next/link";
import Hero3DScene from "@/components/Hero3DScene";

const services = [
  {
    title: "Wedding Venues",
    slug: "wedding-venues",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
  },
  {
    title: "Photography",
    slug: "photography",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200",
  },
  {
    title: "Catering",
    slug: "catering",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200",
  },
  {
    title: "Decor & Styling",
    slug: "decor",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200",
  },
  {
    title: "Makeup Artists",
    slug: "makeup",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200",
  },
  {
    title: "Entertainment",
    slug: "entertainment",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200",
  },
];

export default function HomePage() {
  return (
    <main className="relative text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative pt-24 md:pt-40 pb-20 bg-gradient-to-br from-purple-100 via-white to-pink-100">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs sm:text-sm font-medium">
              ✨ India’s trusted event discovery platform
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-bold leading-tight">
              Turn moments <br className="hidden sm:block" />
              into unforgettable memories.
            </h1>

            {/* MOBILE HERO IMAGE */}
            <div className="mt-6 lg:hidden">
              <img
                src="/hero/bride.jpg"
                alt="Indian bridal wedding"
                className="w-full h-[280px] object-cover rounded-3xl shadow-xl"
              />
            </div>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl">
              Weddings, celebrations, and corporate events — discover verified vendors,
              inspiring ideas, and seamless planning in one place.
            </p>

            {/* SEARCH */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Search venues, photographers, makeup..."
                className="w-full px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:outline-none"
              />
              <button className="px-6 py-3 sm:py-4 rounded-xl bg-purple-600 text-white font-medium">
                Explore
              </button>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-gray-500">
              1,200+ verified vendors · Zero commission · Direct booking
            </p>
          </div>

          {/* DESKTOP HERO */}
          <div className="hidden lg:flex justify-center">
            <Hero3DScene />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-[#F7F7FB] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <h2 className="text-2xl md:text-4xl font-semibold text-center">
            Planning an event should feel exciting — not exhausting.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discover & Compare",
                desc: "Explore verified vendors, real work, and transparent pricing.",
              },
              {
                step: "02",
                title: "Connect Directly",
                desc: "Chat, negotiate, and finalize without commissions.",
              },
              {
                step: "03",
                title: "Celebrate Confidently",
                desc: "Trusted partners and smooth bookings.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]"
              >
                <span className="text-sm text-purple-600 font-medium">
                  {item.step}
                </span>
                <h3 className="mt-3 text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ================= SERVICES ================= */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-semibold mb-12">
            Services curated for every celebration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                title: "Wedding Venues",
                slug: "wedding-venues",
                img: "/hero/wedding-venue.jpg",
              },
              {
                title: "Photography",
                slug: "photography",
                img: "/hero/photography.jpg",
              },
              {
                title: "Makeup Artists",
                slug: "makeup-artists",
                img: "/hero/makeup.jpg",
              },
              {
                title: "Decor & Styling",
                slug: "decor-styling",
                img: "/hero/decor.jpg",
              },
              {
                title: "Catering",
                slug: "catering",
                img: "/hero/catering.jpg",
              },
              {
                title: "Entertainment",
                slug: "entertainment",
                img: "/hero/entertainment.jpg",
              },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group relative h-[260px] rounded-3xl overflow-hidden block"
              >
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-110"
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <p className="text-white text-xl font-semibold">
                    {item.title}
                  </p>

                  {/* Desktop hover text */}
                  <p
                    className="mt-1 text-sm text-white/80
                opacity-100 md:opacity-0 md:translate-y-2
                transition-all duration-500
                md:group-hover:opacity-100 md:group-hover:translate-y-0"
                  >
                    Explore vendors →
                  </p>
                </div>

                {/* HOVER SHADOW */}
                <div
                  className="absolute inset-0 rounded-3xl
              transition-shadow duration-500
              group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* ================= TRUST ================= */}
      <section className="py-20 md:py-32 bg-[#F7F7FB]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Trusted for life’s most important moments
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            From intimate celebrations to large-scale events, EventMate is trusted
            across India.
          </p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { value: "1,200+", label: "Verified Vendors" },
              { value: "50,000+", label: "Events Planned" },
              { value: "0%", label: "Commission Model" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]"
              >
                <p className="text-4xl font-semibold text-purple-600">
                  {stat.value}
                </p>
                <p className="mt-2 text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VENDOR CTA ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-6 text-center bg-white/80 backdrop-blur-xl rounded-3xl py-16 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)]">
          <span className="inline-block mb-3 px-4 py-1 text-xs rounded-full bg-purple-100 text-purple-600 font-medium">
            For Vendors
          </span>

          <h2 className="text-2xl md:text-4xl font-semibold">
            Built for vendors, not commissions.
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Showcase your work, reach genuine customers, and grow without unfair cuts.
          </p>

          <Link
            href="/become-a-vendor"
            className="inline-block mt-8 px-10 py-4 rounded-full bg-black text-white font-medium hover:opacity-90"
          >
            Join as a Vendor →
          </Link>
        </div>
      </section>

    </main>
  );
}
