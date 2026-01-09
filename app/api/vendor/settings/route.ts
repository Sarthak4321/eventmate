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
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { vendorProfile: true }
        });

        if (!user || !user.vendorProfile) {
            return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
        }

        const data = {
            businessName: user.vendorProfile.businessName,
            ownerName: user.fullName || "",
            email: user.email || "",
            // Prefer vendor phone if set, else user phone
            phone: user.vendorProfile.phone || user.phone || "",
            category: user.vendorProfile.category,
            location: user.vendorProfile.city,
            about: user.vendorProfile.about || ""
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error("GET Settings Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "vendor") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const body = await req.json();
        console.log("Processing vendor profile update for:", userId, body);

        // Transaction to update both User and VendorProfile
        await prisma.$transaction(async (tx) => {
            // Update User (Owner Name)
            if (body.ownerName) {
                await tx.user.update({
                    where: { id: userId },
                    data: { fullName: body.ownerName }
                });
            }

            // Update Vendor Profile
            await tx.vendorProfile.update({
                where: { userId },
                data: {
                    businessName: body.businessName,
                    category: body.category,
                    city: body.location, // Mapping location to city
                    phone: body.phone,
                    about: body.about
                }
            });
        });

        return NextResponse.json({ message: "Profile updated successfully" });

    } catch (error) {
        console.error("UPDATE Settings Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
