import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";


export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Delete user (cascade should handle related records like bookings, profile, etc.)
        await prisma.user.delete({
            where: { id: session.user.id }
        });

        return NextResponse.json({ message: "Account deleted successfully" });

    } catch (error) {
        console.error("Delete Account Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
