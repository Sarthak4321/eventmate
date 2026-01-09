import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "vendor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const vendor = await prisma.vendorProfile.findUnique({ where: { userId } });

        if (!vendor) return NextResponse.json({ message: "Vendor not found" }, { status: 404 });

        // Verify ownership
        const quote = await prisma.quoteTemplate.findUnique({ where: { id } });
        if (!quote || quote.vendorId !== vendor.id) {
            return NextResponse.json({ message: "Quote not found or unauthorized" }, { status: 404 });
        }

        await prisma.quoteTemplate.delete({ where: { id } });

        return NextResponse.json({ message: "Deleted successfully" });

    } catch (error) {
        console.error("DELETE Quote Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
