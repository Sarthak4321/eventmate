import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "vendor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        // Fetch Vendor Profile 
        const vendor = await prisma.vendorProfile.findUnique({
            where: { userId },
            include: {
                bookings: {
                    include: { user: { select: { fullName: true, email: true, phone: true } } }
                }
            }
        });

        if (!vendor) {
            return NextResponse.json({ message: "Vendor profile not found" }, { status: 404 });
        }

        // --- CALCULATE STATS ---

        const allBookings = vendor.bookings;

        // 1. New Leads (Pending Bookings)
        const newLeads = allBookings.filter(b => b.status === "pending");
        const newLeadsCount = newLeads.length;

        // 2. Confirmed Bookings (Won)
        const wonBookings = allBookings.filter(b => b.status === "confirmed" || b.status === "completed");
        const wonBookingsCount = wonBookings.length;

        // 3. Total Revenue
        const totalRevenue = wonBookings.reduce((acc, curr) => {
            // Price is string, handle currency symbols and commas
            const cleanPrice = curr.price ? curr.price.replace(/[^0-9.]/g, '') : "0";
            return acc + (parseFloat(cleanPrice) || 0);
        }, 0);

        // 4. Upcoming Events (Confirmed & Future Date)
        const now = new Date();
        const upcomingEvents = wonBookings
            .filter(b => new Date(b.date) >= now)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map(b => ({
                id: b.id,
                name: b.user.fullName || "Client",
                date: b.date,
                eventType: b.eventType || "Event",
                location: b.location || "TBD",
            }));

        // 5. Recent Leads (Pending, sorted by newest)
        const recentLeads = newLeads
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
            .map(b => ({
                id: b.id,
                name: b.user.fullName || "Client",
                eventType: b.eventType || "Event",
                recievedAt: b.createdAt,
                status: "New", // UI expects "New"
                budget: b.price || "TBD"
            }));

        return NextResponse.json({
            profile: {
                businessName: vendor.businessName,
            },
            stats: {
                revenue: totalRevenue,
                newLeads: newLeadsCount,
                bookings: wonBookingsCount,
            },
            recentLeads,
            upcomingEvents
        });

    } catch (error) {
        console.error("Vendor Dashboard Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
