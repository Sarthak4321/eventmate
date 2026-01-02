"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LogOut, User, Settings, Bell } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function DashboardNavbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("eventmate_role");
    // Sign out from NextAuth
    import("next-auth/react").then((mod) => mod.signOut({ callbackUrl: "/" }));
  }

  // Determine avatar based on gender - using distinct seeds for clear differentiation
  const gender = session?.user?.gender?.toLowerCase();
  // Using more distinct seeds as requested
  const avatarSeed = gender === "female" ? "Sophia" : "Alexander";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;

  // Fetch real notifications
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/user/notifications")
        .then(res => res.json())
        .then(data => {
          if (data.notifications) {
            setNotifications(data.notifications);
          }
        })
        .catch(err => console.error("Failed to fetch notifications", err));
    }
  }, [session]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
          <Logo size="md" />
        </Link>

        {/* DASHBOARD LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="/dashboard" className="hover:text-black transition-colors">
            Dashboard
          </Link>
          <Link href="/services" className="hover:text-black transition-colors">
            Explore Services
          </Link>
          <Link href="/booking" className="hover:text-black transition-colors">
            New Booking
          </Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS DROPDOWN */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors relative focus:outline-none"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-900">Notifications</p>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Mark all read</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${!notif.isRead ? 'bg-indigo-50/30' : ''}`}>
                      <p className="text-sm text-gray-700 leading-snug">{notif.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium">
                        {new Date(notif.createdAt).toLocaleDateString('en-IN', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">No new notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-white shadow-sm overflow-hidden">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* DROPDOWN MENU */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="text-sm font-semibold text-gray-900 truncate">{session?.user?.name || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{session?.user?.email || ""}</p>
                </div>

                <div className="py-2">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </div>

                <div className="border-t border-gray-50 pt-2 pb-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
