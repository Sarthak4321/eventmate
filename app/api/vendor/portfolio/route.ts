
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
            select: { id: true, category: true }
        });

        if (!vendor) {
            return NextResponse.json({ message: "Vendor profile not found" }, { status: 404 });
        }

        const items = await prisma.portfolioItem.findMany({
            where: { vendorId: vendor.id },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ items, vendorCategory: vendor.category });
    } catch (error) {
        console.error("GET Portfolio Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "vendor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { type, url, category } = body;

        if (!url || !type) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const userId = session.user.id;
        const vendor = await prisma.vendorProfile.findUnique({
            where: { userId },
            select: { id: true }
        });

        if (!vendor) {
            return NextResponse.json({ message: "Vendor profile not found" }, { status: 404 });
        }

        const newItem = await prisma.portfolioItem.create({
            data: {
                vendorId: vendor.id,
                type,
                url,
                category: category || "All"
            }
        });

        return NextResponse.json(newItem);

    } catch (error) {
        console.error("POST Portfolio Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
