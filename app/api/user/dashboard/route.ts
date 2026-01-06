import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Assuming authOptions is exported from here or similar, will check path
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        console.log("Dashboard API Session:", JSON.stringify(session, null, 2));

        if (!session || !session.user?.id) {
            console.log("Dashboard API: No session or user ID");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                bookings: {
                    include: {
                        vendor: true,
                    },
                    orderBy: {
                        date: 'asc',
                    }
                },
                savedVendors: {
                    include: {
                        vendor: true,
                    }
                }
            }
        });

        if (!user) {
            console.log("Dashboard API: User not found in DB for ID:", session.user.id);
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Transform data for frontend
        const bookings = user.bookings.map(b => ({
            id: b.id,
            serviceName: b.vendor.businessName,
            category: b.vendor.category,
            date: b.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            location: b.location || b.vendor.city || "TBD",
            status: b.status,
            price: b.price || b.vendor.startingPrice,
        }));

        const savedVendors = user.savedVendors.map(sv => sv.vendor.businessName);

        return NextResponse.json({
            bookings,
            savedVendors,
            userName: user.fullName || session.user.name
        });

    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
