"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Search,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Bell,
  Menu,
  X,
  MapPin
} from "lucide-react";

import { BookingCard, BookingProps } from "@/components/dashboard/BookingCard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Combine session loading with data mock loading
  const isSessionLoading = status === "loading";
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [savedVendors, setSavedVendors] = useState<string[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/user/dashboard");

        if (res.status === 401 || res.status === 404) {
          // Session is stale or invalid (user not in DB)
          // We can manually redirect or let the effect handle it, but explicit signOut is safer if the cookie persists
          await signOut({ callbackUrl: "/auth/login" });
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setBookings(data.bookings);
        setSavedVendors(data.savedVendors);

        // Calculate total budget
        const budget = data.bookings.reduce((acc: number, b: any) => {
          const price = parseFloat(b.price?.replace(/[^0-9.]/g, '') || "0");
          return acc + price;
        }, 0);
        setTotalBudget(budget);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user) {
      fetchDashboardData();
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [session, status]);

  if (loading || isSessionLoading) return <DashboardSkeleton />;

  const pendingCount = bookings.filter(b => b.status === "pending").length;
  const hasBookings = bookings.length > 0;
  const firstName = session?.user?.name?.split(" ")[0] || "Planner";

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans selection:bg-indigo-100 scroll-smooth">

      {/* ================= MOBILE HEADER (Premium App-Style) ================= */}
      <div className="lg:hidden bg-white/80 px-5 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100/50 backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
        <div className="flex items-center gap-3.5">
          {session?.user?.image ? (
            <img src={session.user.image} alt="Profile" className="w-11 h-11 rounded-full border-2 border-white shadow-sm object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-200 ring-2 ring-white">
              {firstName[0]}
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-extrabold text-slate-900 leading-none tracking-tight">Hi, {firstName}</h1>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase mt-1">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • <span className="text-indigo-600">Plan Mode</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/services" className="p-2.5 rounded-2xl bg-slate-50 text-slate-600 active:bg-slate-100 active:scale-95 transition-all">
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP HEADER (Enhanced) ================= */}
      <div className="hidden lg:block bg-gradient-to-b from-white to-indigo-50/30 border-b border-gray-200/60 py-10 relative overflow-hidden">
        {/* Decorative background blobs for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50/40 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 animate-in slide-in-from-left-2 fade-in duration-500">
                <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border border-amber-200/50">Plan Mode</span>
                <span className="text-slate-400 text-sm font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Good Morning, {firstName}.
              </h1>
              <p className="text-slate-500 mt-2 text-lg max-w-xl">
                Ready to make progress? You have <span className="font-bold text-gray-900 underline decoration-indigo-200 decoration-2 underline-offset-2">{pendingCount} items</span> needing attention.
              </p>
            </div>

            {/* Integrated Action Toolbar */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow duration-300">
              <div className="relative group">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 rounded-xl text-sm w-56 transition-all outline-none"
                />
              </div>
              <div className="w-px h-8 bg-gray-200 mx-1"></div>
              <Link href="/booking" className="px-6 py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-gray-300 hover:-translate-y-0.5 flex items-center gap-2 group">
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Create Event</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-6 lg:mt-10 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* ================= HERO: NEXT ACTION (Psychology: Guidance) ================= */}
        {/* If they have pending items, that is priority #1. Else, inspiration. */}
        {pendingCount > 0 ? (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-6 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Action Required</h3>
                <p className="text-slate-600 text-sm mt-1">You have <span className="font-bold text-gray-900">{pendingCount} pending requests</span>. Vendors are waiting for your response.</p>
              </div>
            </div>
            <Link href="/bookings?status=pending" className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl whitespace-nowrap shadow-lg shadow-orange-200 active:scale-95 transition-all text-center">
              Review Now
            </Link>
          </div>
        ) : (
          <div className="bg-[#1E293B] rounded-3xl p-6 sm:p-10 relative overflow-hidden group shadow-2xl shadow-indigo-200 cursor-pointer">
            <div className="relative z-10 max-w-xl">
              <span className="inline-block px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/20 backdrop-blur-sm">Exclusive</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-100 transition-colors">Find the perfect venue <br className="hidden sm:block" />for your big day.</h2>
              <p className="text-slate-300 mb-8 leading-relaxed max-w-sm">Browse our curated list of 500+ premium venues with verified reviews and virtual tours.</p>
              <Link href="/services?category=Venues" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-indigo-50 transition active:scale-95 hover:shadow-lg hover:shadow-white/10">
                Explore Venues <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Abstract Shapes */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/30 rounded-full blur-[80px] -mr-16 -mt-16 sm:w-96 sm:h-96 animate-pulse duration-3000"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px] translate-y-1/2"></div>
            <div
              className="absolute right-0 bottom-0 w-48 h-48 sm:w-96 sm:h-full opacity-20 sm:opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=600&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: 'linear-gradient(to left, black, transparent)',
                WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
              }}
            />
          </div>
        )}

        {/* ================= STATS (Simplified for Mobile) ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Only show key stats on mobile to reduce clutter */}
          <StatCard label="Bookings" value={bookings.filter(b => b.status === 'confirmed').length} icon={Calendar} color="blue" />
          <StatCard label="Budget" value={totalBudget > 0 ? `₹${(totalBudget / 1000).toFixed(0)}k` : '₹0'} icon={TrendingUp} color="emerald" />
          <StatCard label="Shortlisted" value={savedVendors.length} icon={Heart} color="rose" />
          <Link href="/services" className="bg-indigo-50 rounded-2xl p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-indigo-100 transition-colors border border-indigo-100 group active:scale-95">
            <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 mb-2 group-hover:scale-110 transition-transform">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-indigo-900">Discover More</span>
          </Link>
        </div>

        {/* ================= PLANNING ROADMAP (Gamification) ================= */}
        {/* Horizontal scroll on mobile for steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900">Your Journey</h2>
            <span className="text-sm font-medium text-indigo-600">20% Completed</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-[18px] left-0 w-full h-[3px] bg-slate-100 rounded-full"></div>
              <div className="absolute top-[18px] left-0 w-[20%] h-[3px] bg-indigo-600 rounded-full shadow-sm"></div>

              <div className="flex justify-between relative overflow-x-auto pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[
                  { title: "Inspiration", icon: Sparkles, active: true, completed: true },
                  { title: "Shortlist", icon: Heart, active: true, completed: false },
                  { title: "Bookings", icon: Calendar, active: false, completed: false },
                  { title: "Invites", icon: CheckCircle2, active: false, completed: false },
                  { title: "Execution", icon: TrendingUp, active: false, completed: false },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 min-w-[80px] snap-center cursor-pointer group">
                    <div className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center z-10 bg-white transition-all duration-300 ${step.completed ? 'border-indigo-600 text-indigo-600 bg-indigo-50' :
                      step.active ? 'border-indigo-600 text-indigo-600 shadow-[0_0_0_4px_rgba(79,70,229,0.1)] group-hover:scale-110' :
                        'border-slate-200 text-slate-300 group-hover:border-slate-300'
                      }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-bold ${step.active ? 'text-gray-900' : 'text-slate-400'}`}>{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* ================= EXPLORE CATEGORIES (Premium Cards) ================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
            <Link href="/services" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-full">View All</Link>
          </div>

          {/* Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { name: "Venues", emoji: "🏰", color: "from-blue-100 to-blue-50", text: "text-blue-600", count: "200+" },
              { name: "Photos", emoji: "📸", color: "from-purple-100 to-purple-50", text: "text-purple-600", count: "140+" },
              { name: "Makeup", emoji: "💄", color: "from-rose-100 to-rose-50", text: "text-rose-600", count: "80+" },
              { name: "Decor", emoji: "✨", color: "from-emerald-100 to-emerald-50", text: "text-emerald-600", count: "120+" },
              { name: "Catering", emoji: "🍽️", color: "from-orange-100 to-orange-50", text: "text-orange-600", count: "90+" },
              { name: "Music", emoji: "🎵", color: "from-indigo-100 to-indigo-50", text: "text-indigo-600", count: "50+" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/services?category=${cat.name}`}
                className="flex flex-col min-w-[140px] snap-start group cursor-pointer"
              >
                <div className={`h-40 rounded-3xl bg-gradient-to-br ${cat.color} p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg hover:shadow-${cat.text.split('-')[1]}-200 ml-1`}>

                  {/* Decorative Circle */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative z-10 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </div>

                  <div className="relative z-10">
                    <h3 className={`font-bold text-lg ${cat.text}`}>{cat.name}</h3>
                    <p className="text-xs font-semibold text-gray-500 mt-0.5">{cat.count} Pros</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= MAIN CONTENT SPLIT ================= */}
        <div className="grid lg:grid-cols-3 gap-8 pb-8">

          {/* LEFT: BOOKINGS LIST */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>

            {!hasBookings ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-gray-200 group hover:border-indigo-200 transition-colors">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <Calendar className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No bookings yet</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2 mb-6">Your planning journey is just starting. Any bookings you make will appear here.</p>
                <Link href="/services" className="px-6 py-2.5 bg-indigo-50 text-indigo-600 font-bold rounded-full text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-sm hover:shadow-indigo-200">
                  Start Exploring
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => <BookingCard key={b.id} booking={b} />)}
              </div>
            )}
          </div>

          {/* RIGHT: SAVED & TIPS */}
          <div className="space-y-8">
            {/* Saved Vendors (Horizontal List for Compactness) */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg font-bold text-gray-900">Saved</h2>
                <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-full text-slate-600">{savedVendors.length}</span>
              </div>
              {savedVendors.length > 0 ? (
                <div className="bg-white rounded-3xl p-2 border border-blue-50/50 shadow-sm">
                  {savedVendors.slice(0, 4).map((name, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border-b border-gray-50 last:border-0 group">
                      <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                        <img src={`https://source.unsplash.com/random/100x100?portrait&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin className="w-3 h-3" /> Delhi
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-rose-50 hover:border-rose-200 group/btn transition-all">
                        <Heart className="w-4 h-4 text-slate-300 group-hover/btn:text-rose-500 transition-colors" />
                      </button>
                    </div>
                  ))}
                  <button className="w-full py-3 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl mt-1 transition-colors">View All Collection</button>
                </div>
              ) : (
                <div className="p-6 bg-white rounded-3xl border border-gray-100 text-center">
                  <p className="text-sm text-gray-400">Build your dream team.</p>
                  <Link href="/services" className="text-xs font-bold text-indigo-600 mt-2 block hover:underline">Search Vendors</Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  const colorStyles: any = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    rose: "bg-rose-50 text-rose-600 ring-rose-100",
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-default group">
      <div className={`w-10 h-10 rounded-xl ${colorStyles[color]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">{label}</p>
      </div>
    </div>
  );
}
