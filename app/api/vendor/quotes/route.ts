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
        const vendor = await prisma.vendorProfile.findUnique({ where: { userId } });

        if (!vendor) return NextResponse.json({ message: "Vendor not found" }, { status: 404 });

        const quotes = await prisma.quoteTemplate.findMany({
            where: { vendorId: vendor.id },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(quotes);
    } catch (error) {
        console.error("GET Quotes Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "vendor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const vendor = await prisma.vendorProfile.findUnique({ where: { userId } });

        if (!vendor) return NextResponse.json({ message: "Vendor not found" }, { status: 404 });

        const body = await req.json();
        const { name, category, price, priceParams, inclusions } = body;

        const newQuote = await prisma.quoteTemplate.create({
            data: {
                vendorId: vendor.id,
                name,
                category,
                price: parseFloat(price),
                priceParams,
                inclusions
            }
        });

        return NextResponse.json(newQuote, { status: 201 });

    } catch (error) {
        console.error("CREATE Quote Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
