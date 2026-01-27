"use client";

import Link from "next/link";

export default function BecomeVendor() {
  return (
    <main className="pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-semibold">
            Grow your event business with EvntMet
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Get discovered by real customers. No commissions. No middlemen.
          </p>

          <ul className="mt-8 space-y-4 text-gray-600">
            <li>✔ Direct customer bookings</li>
            <li>✔ Showcase your work</li>
            <li>✔ Zero commission model</li>
          </ul>

          <Link
            href="/auth/signup"
            className="inline-block mt-10 px-8 py-4 rounded-full bg-black text-white"
          >
            Join as Vendor
          </Link>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl h-[420px]" />
      </div>
    </main>
  );
}
