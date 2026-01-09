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

        const vendor = await prisma.vendorProfile.findUnique({
            where: { userId },
        });

        if (!vendor) {
            return NextResponse.json({ message: "Vendor profile not found" }, { status: 404 });
        }

        const leads = await prisma.booking.findMany({
            where: {
                vendorId: vendor.id,
                // filters can be applied here if needed
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        email: true,
                        phone: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Map bookings to Lead interface structure for frontend
        const formattedLeads = leads.map(lead => ({
            id: lead.id,
            name: lead.user.fullName || "Client",
            eventType: lead.eventType || "Event",
            date: lead.date.toISOString(),
            guests: 0, // Not in schema currently, defaulting
            budget: lead.price || "TBD", // Using price as budget/quote placeholder
            location: lead.location || "TBD",
            status: mapStatusToLeadStatus(lead.status),
            recievedAt: lead.createdAt.toISOString(),
            phone: lead.user.phone || "N/A",
            email: lead.user.email || "N/A"
        }));

        return NextResponse.json(formattedLeads);

    } catch (error) {
        console.error("Fetch Leads Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Helper to map DB status to Frontend LeadStatus
function mapStatusToLeadStatus(dbStatus: string) {
    // DB: pending, confirmed, completed, cancelled, contacted, quoted
    // Frontend: New, Contacted, Quoted, Won, Lost
    switch (dbStatus.toLowerCase()) {
        case 'pending': return 'New';
        case 'contacted': return 'Contacted';
        case 'quoted': return 'Quoted';
        case 'confirmed': return 'Won';
        case 'completed': return 'Won';
        case 'cancelled': return 'Lost';
        default: return 'New';
    }
}
