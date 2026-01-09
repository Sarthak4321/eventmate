import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "vendor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { status, price } = body;
        const { id: bookingId } = await params;

        // Map Frontend status to DB status
        let dbStatus = status;
        if (status === 'New') dbStatus = 'pending';
        if (status === 'Won') dbStatus = 'confirmed';
        if (status === 'Lost') dbStatus = 'cancelled';
        if (status === 'Contacted') dbStatus = 'contacted';
        if (status === 'Quoted') dbStatus = 'quoted';

        const updateData: any = { status: dbStatus };
        if (price) updateData.price = price;

        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: updateData,
        });

        return NextResponse.json(updatedBooking);

    } catch (error) {
        console.error("Update Lead Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
