"use client";

import Link from "next/link";

export default function VendorDashboard() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 space-y-14">

        {/* ================= HEADER ================= */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold">
              Vendor Dashboard
            </h1>
            <p className="mt-1 text-gray-600">
              Monitor performance, manage services & convert leads.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/vendor/services/new"
              className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium"
            >
              + Create Service
            </Link>
            <Link
              href="/vendor/profile"
              className="px-6 py-3 rounded-full bg-white border text-sm"
            >
              Edit Profile
            </Link>
          </div>
        </section>

        {/* ================= KPI STRIP ================= */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "New Leads", value: "18", meta: "Last 7 days" },
            { label: "Bookings", value: "4", meta: "Confirmed" },
            { label: "Revenue", value: "₹1.2L", meta: "This month" },
            { label: "Profile Views", value: "392", meta: "+18% growth" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="mt-2 text-2xl font-semibold">{kpi.value}</p>
              <p className="mt-1 text-xs text-gray-400">{kpi.meta}</p>
            </div>
          ))}
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Respond to Leads",
              desc: "Reply within 24h to boost ranking",
              link: "/vendor/bookings",
            },
            {
              title: "Add Pricing Packages",
              desc: "Services with pricing convert better",
              link: "/vendor/services",
            },
            {
              title: "Upload Portfolio",
              desc: "Photos & videos attract more clients",
              link: "/vendor/profile",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </Link>
          ))}
        </section>

        {/* ================= LEADS & BOOKINGS ================= */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Leads */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Recent Leads
            </h2>

            <div className="space-y-4">
              {["Wedding Photography", "Decor & Styling"].map((lead) => (
                <div
                  key={lead}
                  className="flex items-center justify-between border rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium">{lead}</p>
                    <p className="text-xs text-gray-500">
                      Event in 2 weeks · Delhi
                    </p>
                  </div>
                  <Link
                    href="/vendor/bookings"
                    className="text-sm text-indigo-600"
                  >
                    Respond →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Upcoming Bookings
            </h2>

            <div className="space-y-4">
              <div className="border rounded-xl p-4">
                <p className="font-medium">Wedding Shoot</p>
                <p className="text-xs text-gray-500">
                  24 March · Mumbai · ₹65,000
                </p>
              </div>

              <p className="text-sm text-gray-400">
                No more upcoming bookings
              </p>
            </div>
          </div>
        </section>

        {/* ================= SERVICES PERFORMANCE ================= */}
        <section className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              Service Performance
            </h2>
            <Link
              href="/vendor/services"
              className="text-sm text-indigo-600"
            >
              Manage services →
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { name: "Wedding Photography", views: 240, leads: 8 },
              { name: "Decor & Styling", views: 152, leads: 4 },
            ].map((service) => (
              <div
                key={service.name}
                className="flex justify-between items-center border rounded-xl p-4"
              >
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-xs text-gray-500">
                    {service.views} views · {service.leads} leads
                  </p>
                </div>
                <Link
                  href="/vendor/services"
                  className="text-sm text-indigo-600"
                >
                  Edit →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ================= GROWTH ================= */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8">
          <h2 className="text-lg font-semibold">
            Profile Optimization
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Complete profiles rank higher and convert 3× better.
          </p>

          <div className="mt-6">
            <div className="w-full bg-white rounded-full h-2">
              <div className="w-[65%] h-2 bg-indigo-600 rounded-full" />
            </div>
            <p className="mt-3 text-sm text-gray-600">
              65% complete
            </p>
          </div>

          <Link
            href="/vendor/profile"
            className="inline-block mt-5 text-sm font-medium text-indigo-600"
          >
            Complete profile →
          </Link>
        </section>

      </div>
    </main>
  );
}
