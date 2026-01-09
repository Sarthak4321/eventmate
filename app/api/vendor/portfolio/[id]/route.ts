
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "vendor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const userId = session.user.id;
        const vendor = await prisma.vendorProfile.findUnique({
            where: { userId },
            select: { id: true }
        });

        if (!vendor) {
            return NextResponse.json({ message: "Vendor profile not found" }, { status: 404 });
        }

        const item = await prisma.portfolioItem.findUnique({
            where: { id }
        });

        if (!item || item.vendorId !== vendor.id) {
            return NextResponse.json({ message: "Not found or unauthorized" }, { status: 404 });
        }

        await prisma.portfolioItem.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Deleted successfully" });

    } catch (error) {
        console.error("DELETE Portfolio Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
