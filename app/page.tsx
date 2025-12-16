"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative text-gray-900">
      {/* ================= NAVBAR ================= */}
      


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f3ff] via-[#eef2ff] to-white" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-40 w-[400px] h-[400px] bg-pink-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-36 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block mb-5 px-4 py-1 text-xs font-medium rounded-full bg-white/70 backdrop-blur border">
              ✨ India’s trusted event discovery platform
            </span>

            <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
              Turn moments
              <br />
              into unforgettable memories.
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Weddings, celebrations, and corporate events —
              discover trusted vendors, inspiring ideas, and
              seamless planning in one place.
            </p>

            {/* Event Types */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Wedding", "Birthday", "Corporate", "Other"].map((item) => (
                <button
                  key={item}
                  className="px-5 py-2 rounded-full bg-white/70 backdrop-blur border text-sm hover:bg-black hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="mt-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)] p-4 flex items-center gap-3 max-w-xl">
              <input
                type="text"
                placeholder="Search venues, photographers, decorators..."
                className="flex-1 px-5 py-4 text-sm outline-none bg-transparent"
              />
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium">
                Explore
              </button>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              1,200+ verified vendors · Zero commission · Direct booking
            </p>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative hidden md:block">
            <div className="relative w-full h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
                className="absolute top-0 left-24 w-64 h-80 rounded-3xl object-cover shadow-xl"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
                className="absolute top-28 left-0 w-72 h-96 rounded-3xl object-cover shadow-2xl"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800"
                className="absolute bottom-0 left-40 w-64 h-80 rounded-3xl object-cover shadow-xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative bg-[#F7F7FB] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Planning an event should feel exciting — not exhausting.
          </h2>

          <div className="mt-20 grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Discover & Compare",
                desc: "Explore verified vendors, real work, and transparent pricing.",
              },
              {
                step: "02",
                title: "Connect Directly",
                desc: "Chat, negotiate, and finalize without middlemen or commission.",
              },
              {
                step: "03",
                title: "Celebrate Confidently",
                desc: "Trusted partners, secure bookings, unforgettable moments.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.2)]"
              >
                <span className="text-sm text-[#6D5DF6] font-medium">
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
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-16">
            Services curated for every celebration
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Wedding Venues",
              "Photography",
              "Catering",
              "Decor & Styling",
              "Makeup Artists",
              "Entertainment",
            ].map((service) => (
              <div
                key={service}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition"
                  alt=""
                />
                <p className="absolute bottom-6 left-6 text-white text-xl font-semibold">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= TRUST ================= */}
      {/* ================= TRUST ================= */}
      <section className="py-32 bg-[#F7F7FB]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Trusted for life’s most important moments
            </h2>
            <p className="mt-4 text-gray-600">
              From intimate celebrations to large-scale events, EventMate is trusted
              by thousands across India.
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-10">
            {[
              { value: "1,200+", label: "Verified Vendors" },
              { value: "50,000+", label: "Events Planned" },
              { value: "0%", label: "Commission Model" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-10 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]"
              >
                <p className="text-5xl font-semibold text-[#6D5DF6]">
                  {stat.value}
                </p>
                <p className="mt-3 text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* ================= VENDOR CTA ================= */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f3ff] via-white to-[#eef2ff]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center bg-white/80 backdrop-blur-xl rounded-3xl py-20 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)]">
          <span className="inline-block mb-4 px-4 py-1 text-xs rounded-full bg-[#6D5DF6]/10 text-[#6D5DF6] font-medium">
            For Vendors
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold">
            Built for vendors, not commissions.
          </h2>

          <p className="mt-5 text-gray-600 max-w-xl mx-auto">
            Showcase your work, reach genuine customers, and grow your business
            without unfair platform cuts or hidden fees.
          </p>

          <Link
            href="/become-a-vendor"
            className="inline-flex items-center justify-center mt-10 px-10 py-4 rounded-full bg-[#0B0B0B] text-white font-medium hover:opacity-90"
          >
            Join as a Vendor →
          </Link>
        </div>
      </section>



      {/* ================= PREMIUM FOOTER ================= */}
      


    </main>
  );
}
