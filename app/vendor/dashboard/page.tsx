"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare, IndianRupee, TrendingUp, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import { useVendorStore } from "@/lib/store";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { leads, profile } = useVendorStore();
  const [mounted, setMounted] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (!mounted || status === "loading") {
    return <div className="p-8">Loading dashboard...</div>;
  }

  // --- COMPUTED STATS ---
  const newLeadsCount = leads.filter(l => l.status === "New").length;
  const wonBookings = leads.filter(l => l.status === "Won").length;

  // Fake Revenue calc: Sum of won leads budget
  const totalRevenue = leads
    .filter(l => l.status === "Won")
    .reduce((acc, curr) => {
      // Simple parsing: remove non-digit/dot chars
      const clean = curr.budget.replace(/[^0-9.]/g, '');
      return acc + (parseFloat(clean) || 0);
    }, 0);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(val);

  const upcomingEvents = leads
    .filter(l => l.status === "Won")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.recievedAt).getTime() - new Date(a.recievedAt).getTime())
    .slice(0, 3);

  return (
    <div className="p-8 space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Good afternoon, {profile.businessName}!</p>
        </div>
        <div className="flex gap-3">
          <Link href="/vendor/leads" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200">
            View New Leads ({newLeadsCount})
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue), change: "+12%", icon: IndianRupee },
          { label: "New Leads", value: newLeadsCount.toString(), change: "+5", icon: MessageSquare },
          { label: "Bookings", value: wonBookings.toString(), change: "On track", icon: CheckCircle2 },
          { label: "Profile Views", value: "1.2k", change: "+18%", icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              </div>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs font-medium text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {stat.change} <span className="text-gray-400 font-normal">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT COL: LEADS */}
        <div className="lg:col-span-2 space-y-8">

          {/* Recent Leads */}
          <section className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Recent Inquiries</h2>
              <Link href="/vendor/leads" className="text-sm text-indigo-600 font-medium hover:underline">View All</Link>
            </div>

            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {lead.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">{lead.name}</h4>
                      <p className="text-xs text-gray-500">{lead.eventType} · {formatDistanceToNow(parseISO(lead.recievedAt), { addSuffix: true })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {lead.status === "New" && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">New</span>
                    )}
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600" />
                  </div>
                </div>
              ))}
              {recentLeads.length === 0 && <p className="text-gray-500 text-sm">No recent leads.</p>}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Create Quote", desc: "Send pricing in 30s", href: "/vendor/quotes", color: "bg-blue-50 text-blue-700" },
              { title: "Add Offer", desc: "Boost weekday bookings", href: "/vendor/offers", color: "bg-purple-50 text-purple-700" },
              { title: "Block Dates", desc: "Update availability", href: "/vendor/calendar", color: "bg-amber-50 text-amber-700" },
            ].map((action) => (
              <Link key={action.title} href={action.href} className={clsx("p-5 rounded-2xl border transition hover:shadow-md", action.color)}>
                <h3 className="font-bold">{action.title}</h3>
                <p className="text-xs opacity-75 mt-1">{action.desc}</p>
              </Link>
            ))}
          </section>

        </div>

        {/* RIGHT COL: CALENDAR WIDGET */}
        <div className="space-y-8">
          <section className="bg-white rounded-2xl border shadow-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Upcoming Schedule</h2>
              <Link href="/vendor/calendar" className="p-2 hover:bg-gray-100 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
              </Link>
            </div>

            <div className="space-y-6">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((ev) => (
                  <div key={ev.id} className="flex gap-4">
                    <div className="text-center w-12">
                      <p className="text-xs text-gray-500 uppercase font-bold">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</p>
                      <p className="text-xl font-bold text-gray-900">{new Date(ev.date).getDate()}</p>
                    </div>
                    <div className="flex-1 pb-6 border-l-2 border-indigo-100 pl-4 relative">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white"></div>
                      <h4 className="font-semibold">{ev.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{ev.location}</p>
                      <p className="text-xs text-indigo-600 mt-2 font-medium">{ev.eventType}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">No upcoming bookings.</div>
              )}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
