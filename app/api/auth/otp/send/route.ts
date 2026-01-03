import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {
    try {
        const { phone } = await req.json();

        if (!phone) {
            return NextResponse.json(
                { message: "Phone number is required" },
                { status: 400 }
            );
        }

        // Generate 6 digit code
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Save to DB
        await prisma.otp.upsert({
            where: { phone },
            update: {
                code: otp,
                expiresAt,
                createdAt: new Date(),
            },
            create: {
                phone,
                code: otp,
                expiresAt,
            },
        });

        // In production, send SMS here.
        // For local dev, log it.
        console.log(`[OTP] Sent to ${phone}: ${otp}`);

        return NextResponse.json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("OTP Send Error:", error);
        return NextResponse.json(
            { message: "Failed to send OTP" },
            { status: 500 }
        );
    }
}
