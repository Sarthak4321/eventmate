"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Filter, ArrowRight, ShieldCheck, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* ---------------- MOCK DATA ---------------- */
// This simulates a database response for vendors in a specific category
const MOCK_VENDORS = [
  {
    id: "v1",
    name: "Royal Orchid Banquets",
    slug: "royal-orchid-banquets",
    category: "venues",
    location: "South Delhi",
    price: 250000,
    priceUnit: "per day",
    rating: 4.9,
    reviews: 124,
    verified: true,
    image: "/hero/wedding-venue.jpg",
    tags: ["500+ Capacity", "In-house Catering", "AC"],
  },
  {
    id: "v2",
    name: "Lens & Lights Studio",
    slug: "lens-lights-studio",
    category: "photography",
    location: "Mumbai",
    price: 85000,
    priceUnit: "per day",
    rating: 4.7,
    reviews: 89,
    verified: true,
    image: "/hero/photography.jpg",
    tags: ["Candid", "Drone", "Cinematic Video"],
  },
  {
    id: "v3",
    name: "Glamour by Sara",
    slug: "glamour-by-sara",
    category: "makeup",
    location: "Bangalore",
    price: 25000,
    priceUnit: "per function",
    rating: 4.8,
    reviews: 215,
    verified: true,
    image: "/hero/makeup.jpg",
    tags: ["HD Makeup", "Airbrush", "Hairstyling"],
  },
  {
    id: "v4",
    name: "Elegant Decors",
    slug: "elegant-decors",
    category: "decor",
    location: "Delhi",
    price: 150000,
    priceUnit: "starting",
    rating: 4.6,
    reviews: 45,
    verified: false,
    image: "/hero/decor.jpg",
    tags: ["Floral", "Themed", "Lighting"],
  },
  {
    id: "v5",
    name: "Elite Catering Co.",
    slug: "elite-catering",
    category: "catering",
    location: "Delhi",
    price: 1200,
    priceUnit: "per plate",
    rating: 4.9,
    reviews: 310,
    verified: true,
    image: "/hero/catering.jpg",
    tags: ["Multi-cuisine", "Live Counters", "Bartending"],
  },
];

export default function ServiceDetailPage() {
  const params = useParams();
  // slug from URL (e.g. "venues", "photography")
  const serviceSlug = String(params?.id || "");

  // Format title: "venues" -> "Venues"
  const serviceTitle = serviceSlug.charAt(0).toUpperCase() + serviceSlug.slice(1).replace(/-/g, " ");

  /* ---------------- FILTER STATE ---------------- */
  const [locationFilter, setLocationFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredVendors = useMemo(() => {
    let data = MOCK_VENDORS;

    // Filter by Service Category (Simulated)
    // In a real app, you'd fetch only vendors for this serviceSlug
    // For demo, we just show all or filter if we had more mock data
    // data = data.filter(v => v.category === serviceSlug); 

    // Filter by Location
    if (locationFilter !== "All") {
      data = data.filter(v => v.location.includes(locationFilter));
    }

    // Sort
    if (sortBy === "Price: Low to High") {
      data = [...data].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      data = [...data].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Rating") {
      data = [...data].sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [locationFilter, sortBy, serviceSlug]);

  return (
    <main className="min-h-screen bg-gray-50 pb-20 font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/services" className="hover:text-black transition-colors">Services</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium capitalize">{serviceTitle}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight capitalize">
                Best {serviceTitle} <span className="text-gray-400 font-normal text-3xl ml-2">({filteredVendors.length})</span>
              </h1>
              <p className="mt-4 text-gray-500 max-w-2xl text-lg">
                Book verified {serviceTitle.toLowerCase()} directly. No commissions, transparent pricing, and trusted reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTERS & LISTING ================= */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 h-fit sticky top-24">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </h3>
                <button
                  onClick={() => setLocationFilter("All")}
                  className="text-xs text-indigo-600 font-semibold hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Location Filter */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900">Location</h4>
                <div className="space-y-2">
                  {["All", "Delhi", "Mumbai", "Bangalore"].map(loc => (
                    <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                      <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        locationFilter === loc ? "bg-black border-black text-white" : "border-gray-300 bg-white"
                      )}>
                        {locationFilter === loc && <div className="w-2.5 h-2.5 bg-current rounded-sm" />}
                      </div>
                      <input
                        type="radio"
                        name="location"
                        value={loc}
                        className="hidden"
                        checked={locationFilter === loc}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                      <span className={cn(
                        "text-sm transition-colors",
                        locationFilter === loc ? "text-black font-medium" : "text-gray-600 group-hover:text-black"
                      )}>
                        {loc}
                        {loc === "All" ? "" : " Region"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RESULTS GRID */}
          <div className="flex-1">

            {/* Mobile Filter & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 lg:mb-8 sticky top-[72px] lg:static z-20 bg-gray-50/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-2 lg:py-0">
              <div className="lg:hidden flex-1">
                <Select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="bg-white border-gray-200"
                >
                  <option value="All">All Locations</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </Select>
              </div>
              <div className="sm:w-64 ml-auto">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border-gray-200"
                >
                  <option value="Recommended">Recommended</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Rating">Top Rated</option>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}

              {filteredVendors.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">No vendors found</h3>
                  <p className="text-gray-500 mt-2">Try changing your filters or search criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setLocationFilter("All")}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function VendorCard({ vendor }: { vendor: typeof MOCK_VENDORS[0] }) {
  // Safe formatting for price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(vendor.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col md:flex-row"
    >
      {/* Image Section */}
      <div className="md:w-72 lg:w-80 h-64 md:h-auto relative overflow-hidden shrink-0">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
          <Heart className="w-5 h-5" />
        </button>
        {vendor.verified && (
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-green-400" /> Verified
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{vendor.category}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {vendor.location}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {vendor.name}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
              <span className="text-sm font-bold text-green-700">{vendor.rating}</span>
              <Star className="w-3.5 h-3.5 text-green-600 fill-green-600" />
            </div>
            <span className="text-xs text-gray-400 mt-1">{vendor.reviews} reviews</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {vendor.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
          <div>
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Starting from</div>
            <div className="text-lg font-bold text-gray-900">
              {formattedPrice} <span className="text-sm font-normal text-gray-400">/ {vendor.priceUnit}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={`/vendor/${vendor.slug}`} className="hidden sm:flex items-center justify-center px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              View Profile
            </Link>
            <Button className="rounded-xl px-6 py-6 font-semibold shadow-lg shadow-indigo-100">
              Request Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
