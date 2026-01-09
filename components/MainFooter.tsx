"use client";

import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="relative mt-40 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] to-black" />
      <div className="relative max-w-7xl mx-auto px-6 py-28 text-white">

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Start planning your event the right way.
          </h2>
          <p className="mt-4 text-gray-400">
            Discover inspiration, connect with trusted vendors,
            and create unforgettable memories.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/services"
              className="px-8 py-4 rounded-full bg-white text-black font-medium"
            >
              Explore Services
            </Link>
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-full border border-white/30"
            >
              Sign Up Free
            </Link>
          </div>
        </div>

        <div className="my-24 border-t border-white/10" />

        <div className="grid md:grid-cols-4 gap-12 text-sm text-gray-400">
          <div>
            <h3 className="text-white font-semibold mb-3">EventMate</h3>
            <p>
              Discover trusted vendors and plan events with confidence.
            </p>
          </div>

          <div>
            <p className="text-white font-medium mb-3">Discover</p>
            <ul className="space-y-2">
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/vendors">Vendors</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-medium mb-3">Company</p>
            <ul className="space-y-2">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-medium mb-3">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} EventMate. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
