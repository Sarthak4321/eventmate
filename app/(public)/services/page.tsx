"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Filter, Star, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Categories extracted from the services list for filtering
  const categories = ["All", ...SERVICES.map(s => s.title)];

  const filteredServices = SERVICES.filter(service => {
    const matchesCategory = activeCategory === "All" || service.title === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HERO HEADER ================= */}
      <section className="bg-white border-b border-gray-100 pt-28 pb-12 md:pt-36 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
              Trusted Vendors
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Find the perfect team <br className="hidden md:block" /> for your big day.
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-xl">
              Browse thousands of verified vendors, read reviews, and book directly with 0% commission.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 max-w-4xl p-2 bg-white rounded-2xl md:border md:shadow-sm">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 md:bg-transparent rounded-xl">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent w-full focus:outline-none text-gray-900 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 md:bg-transparent rounded-xl border-l-0 md:border-l border-gray-100">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location (e.g. Delhi)"
                className="bg-transparent w-full focus:outline-none text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <button className="px-8 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-200">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ================= SIDEBAR FILTERS (Desktop) ================= */}
          <aside className="hidden lg:block w-64 space-y-8 sticky top-32 h-fit">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                    <input
                      type="radio"
                      name="category"
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    <span className={`text-sm ${activeCategory === cat ? 'font-medium text-black' : 'text-gray-600'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 text-xs">MIN</span>
                  <input type="number" className="w-full pt-6 pb-2 px-3 bg-white border rounded-lg text-sm focus:outline-none focus:border-black" placeholder="₹0" />
                </div>
                <span className="text-gray-300">-</span>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 text-xs">MAX</span>
                  <input type="number" className="w-full pt-6 pb-2 px-3 bg-white border rounded-lg text-sm focus:outline-none focus:border-black" placeholder="Any" />
                </div>
              </div>
            </div>
          </aside>

          {/* ================= RESULTS GRID ================= */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {activeCategory === "All" ? "All Services" : activeCategory}
                <span className="text-gray-400 font-normal text-base ml-2">({filteredServices.length})</span>
              </h2>

              {/* Mobile Filter Toggle matches desktop sidebar style broadly */}
              <select
                className="lg:hidden bg-white border border-gray-200 text-sm rounded-lg p-2"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">
                          {service.title.split(' ')[0]} {/* Simple category guess */}
                        </p>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {service.desc} · Top rated vendors available
                    </p>
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-400">Starting from ₹25k</span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">
                        View <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                <p className="text-gray-500">No services found matching your criteria.</p>
                <button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

    </main>
  );
}
