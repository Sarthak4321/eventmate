"use client";

import Link from "next/link";

/* ------------------ DATA ------------------ */
const services = [
  {
    id: "venues",
    title: "Wedding Venues",
    desc: "Indoor & outdoor venues across India",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400",
  },
  {
    id: "photography",
    title: "Photography",
    desc: "Candid, traditional & cinematic",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1400",
  },
  {
    id: "catering",
    title: "Catering",
    desc: "Curated menus for every taste",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1400",
  },
  {
    id: "decor",
    title: "Decor & Styling",
    desc: "Themes, florals & setups",
    image:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1400",
  },
  {
    id: "makeup",
    title: "Makeup Artists",
    desc: "Bridal & party makeup",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    desc: "Music, DJs & performers",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400",
  },
];

/* ------------------ PAGE ------------------ */
export default function ServicesPage() {
  return (
    <main className="bg-[#F7F7FB] text-gray-900">

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            EventMate
          </Link>

          <nav className="hidden md:flex gap-8 text-sm">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link
            href="/auth/signup"
            className="px-5 py-2 rounded-full bg-black text-white text-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-[65vh] min-h-[560px] flex items-end">
        <img
          src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?w=1800"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 pb-24 text-white">
          <h1 className="text-4xl md:text-5xl font-semibold max-w-2xl">
            Every service you need to plan an unforgettable event
          </h1>
          <p className="mt-5 text-white/80 max-w-xl">
            Discover trusted professionals for weddings, celebrations,
            and corporate events — all curated for quality and reliability.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-semibold mb-16">
          Explore our services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition"
            >
              <div className="relative h-64">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-8">
                <h3 className="text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {service.desc}
                </p>

                <span className="inline-block mt-6 text-sm text-[#6D5DF6]">
                  View vendors →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-4xl font-semibold text-[#6D5DF6]">1,200+</p>
            <p className="mt-2 text-gray-600">Verified Vendors</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-[#6D5DF6]">50,000+</p>
            <p className="mt-2 text-gray-600">Events Planned</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-[#6D5DF6]">0%</p>
            <p className="mt-2 text-gray-600">Platform Commission</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-semibold text-lg">EventMate</h3>
            <p className="mt-4 text-gray-400">
              India’s trusted platform for discovering
              verified event professionals.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/become-a-vendor">Become a Vendor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EventMate. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
