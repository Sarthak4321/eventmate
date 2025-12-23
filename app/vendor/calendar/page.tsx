"use client";

import { useState, useEffect } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    getDay,
    parseISO
} from "date-fns";
import { ChevronLeft, ChevronRight, Lock, Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import { useVendorStore, CalendarEvent } from "@/lib/store";

export default function CalendarPage() {
    const { leads, calendarEvents, addCalendarEvent } = useVendorStore();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // DERIVE ALL EVENTS
    // 1. Leads that are "Won" -> Booked
    // 2. Leads that are "New" or "Contacted" or "Quoted" -> Inquiry
    // 3. Manual CalendarEvents -> Blocked or manual

    const derivedEvents: CalendarEvent[] = [
        // Lead events
        ...leads.filter(l => l.status !== "Lost").map(l => ({
            id: `lead-${l.id}`,
            date: l.date,
            title: l.status === "Won" ? `Booking: ${l.name}` : `Inquiry: ${l.name}`,
            type: l.status === "Won" ? "booked" : "inquiry" as const,
            time: "All Day", // simplifiction
        })),
        // Manual events
        ...calendarEvents
    ];

    const days = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const startDay = getDay(days[0]); // 0 = Sunday
    const emptyDays = Array(startDay).fill(null);

    const getEventsForDay = (date: Date) => {
        return derivedEvents.filter(e => isSameDay(parseISO(e.date), date));
    };

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const handleBlockDate = () => {
        const todayStr = new Date().toISOString();
        addCalendarEvent({
            id: crypto.randomUUID(),
            date: todayStr,
            title: "Unavailable",
            type: "blocked"
        });
        toast.success("Date blocked (Today for demo)");
    };

    return (
        <div className="p-8 h-screen flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Availability & Bookings</h1>
                    <p className="text-gray-500 mt-1">Manage your schedule to avoid conflicts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 text-sm font-medium">
                        Sync Google Calendar
                    </button>
                    <button
                        onClick={handleBlockDate}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
                    >
                        <Lock className="w-4 h-4" /> Block Today
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white border rounded-2xl shadow-sm flex flex-col overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
                    <div className="flex items-center gap-2">
                        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
                        <button onClick={() => setCurrentDate(new Date())} className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-md">Today</button>
                        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 border-b bg-gray-50">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="py-3 text-center text-sm font-semibold text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                    {emptyDays.map((_, i) => (
                        <div key={`empty-${i}`} className="border-b border-r bg-gray-50/30" />
                    ))}
                    {days.map((day) => {
                        const events = getEventsForDay(day);
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div
                                key={day.toString()}
                                className={clsx(
                                    "border-b border-r p-2 min-h-[100px] flex flex-col gap-1 transition-colors hover:bg-gray-50",
                                    isToday && "bg-indigo-50/30"
                                )}
                                onClick={() => toast.info(`Manage ${format(day, "MMM d")}`)}
                            >
                                <div className={clsx(
                                    "self-end w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium",
                                    isToday ? "bg-indigo-600 text-white" : "text-gray-700"
                                )}>
                                    {format(day, "d")}
                                </div>

                                {/* Events list */}
                                {events.map((ev, i) => (
                                    <div
                                        key={i}
                                        className={clsx(
                                            "text-xs p-1.5 rounded border truncate font-medium",
                                            ev.type === "booked" ? "bg-green-100 text-green-700 border-green-200" :
                                                ev.type === "inquiry" ? "bg-amber-100 text-amber-700 border-amber-200" :
                                                    "bg-gray-100 text-gray-600 border-gray-200"
                                        )}
                                        title={ev.title}
                                    >
                                        {ev.time && <span className="mr-1 opacity-75 hidden xl:inline">{ev.time}</span>}
                                        {ev.title}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
