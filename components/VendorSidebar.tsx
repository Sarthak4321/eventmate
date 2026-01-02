"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import {
    LayoutDashboard,
    MessageSquare,
    CalendarDays,
    FileText,
    Tag,
    Image as ImageIcon,
    Settings,
    LogOut,
    Briefcase
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { label: "Lead Inbox", href: "/vendor/leads", icon: MessageSquare },
    { label: "Calendar", href: "/vendor/calendar", icon: CalendarDays },
    { label: "Quotes", href: "/vendor/quotes", icon: FileText },
    { label: "Offers", href: "/vendor/offers", icon: Tag },
    { label: "Portfolio", href: "/vendor/portfolio", icon: ImageIcon },
    { label: "Services", href: "/vendor/services", icon: Briefcase },
    { label: "Settings", href: "/vendor/settings", icon: Settings },
];

export default function VendorSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 flex flex-col z-40">
            <div className="p-6 border-b flex items-center gap-3">
                <Logo size="md" />
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-indigo-600" : "text-gray-400")} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
