"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Heart,
  MessageSquare,
  Clock,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  MoreHorizontal
} from "lucide-react";

import { BookingCard, BookingProps } from "@/components/dashboard/BookingCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [savedVendors, setSavedVendors] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings([
        {
          id: "1",
          serviceName: "Divine Frame Studio",
          category: "Photography",
          date: "12 Dec 2025",
          location: "The Grand Hyatt, Delhi",
          status: "pending",
          price: "₹1,20,000",
        },
        {
          id: "2",
          serviceName: "Royal Catering Co.",
          category: "Catering",
          date: "12 Dec 2025",
          location: "The Grand Hyatt, Delhi",
          status: "confirmed",
          price: "₹3,50,000",
        },
      ]);
      setSavedVendors(["Studio Aura", "Golden Frame", "Pixel Stories"]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const pendingCount = bookings.filter(b => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* ================= TOP BAR ================= */}

      <div className="max-w-7xl mx-auto px-6 mt-10 space-y-10">

        {/* ================= WELCOME & PRIMARY ================= */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back, Sarthak 👋</h1>
            <p className="text-gray-500 mt-2">Here's what's happening with your event planning today.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/services" className="px-5 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-sm">
              Browse Vendors
            </Link>
            <Link href="/booking" className="px-5 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-200">
              + New Booking
            </Link>
          </div>
        </div>

        {/* ================= STATUS CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* PENDING ACTIONS */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">Action Required</span>
            </div>
            <div>
              <p className="text-3xl font-bold">{pendingCount}</p>
              <p className="text-indigo-100 text-sm mt-1">Pending requests awaiting response</p>
            </div>
          </div>

          {/* STATS */}
          {[
            { label: "Confirmed Bookings", value: bookings.filter(b => b.status === "confirmed").length, icon: Calendar, trend: "+2 this week" },
            { label: "Total Budget", value: "₹4.7L", icon: TrendingUp, trend: "12% of total" },
            { label: "Shortlisted Vendors", value: savedVendors.length, icon: Heart, trend: "3 new" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                  <stat.icon className="w-5 h-5" />
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-300 cursor-pointer" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">{stat.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* LEFT: ACTIVITY FEED */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Bookings & Activity</h2>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-900">View All</button>
            </div>

            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map(b => (
                  <BookingCard key={b.id} booking={b} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No recent activity"
                description="It's quiet here. Start your planning journey!"
                actionLabel="Find Vendors"
                actionHref="/services"
                icon={Clock}
              />
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="space-y-6">

            {/* SAVED VENDORS LIST */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Saved Vendors</h3>
                <Link href="/saved" className="text-xs font-semibold text-indigo-600 hover:underline">See All</Link>
              </div>

              {savedVendors.length > 0 ? (
                <div className="space-y-3">
                  {savedVendors.map((name, i) => (
                    <div key={name} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://source.unsplash.com/random/100x100?portrait&sig=${i}`} className="w-full h-full object-cover" alt={name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                        <p className="text-xs text-gray-500">Photography • Delhi</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-500 group-hover:border-red-100 transition">
                        <Heart className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No saved vendors yet.</p>
              )}
            </div>

            {/* UPSELL / PROMO */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">Pro Tip</p>
                <h3 className="text-lg font-bold mb-2">Need a Planner?</h3>
                <p className="text-gray-400 text-sm mb-4">Get matched with a dedicated wedding planner for end-to-end support.</p>
                <button className="w-full py-2.5 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-100 transition">Find Planners</button>
              </div>
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
