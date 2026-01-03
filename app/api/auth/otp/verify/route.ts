import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {
    try {
        const { phone, code } = await req.json();

        if (!phone || !code) {
            return NextResponse.json(
                { message: "Phone number and code are required" },
                { status: 400 }
            );
        }

        const otpRecord = await prisma.otp.findUnique({
            where: { phone },
        });

        if (!otpRecord) {
            return NextResponse.json(
                { message: "Invalid OTP" },
                { status: 400 }
            );
        }

        if (otpRecord.code !== code) {
            return NextResponse.json(
                { message: "Invalid OTP" },
                { status: 400 }
            );
        }

        if (new Date() > otpRecord.expiresAt) {
            return NextResponse.json(
                { message: "OTP expired" },
                { status: 400 }
            );
        }

        // OTP verified
        // We could delete it now, or keep it for a short window to prevent replay (if we handled sessions).
        // For this flow, we'll delete it to prevent reuse.
        await prisma.otp.delete({
            where: { phone },
        });

        return NextResponse.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("OTP Verify Error:", error);
        return NextResponse.json(
            { message: "Failed to verify OTP" },
            { status: 500 }
        );
    }
}
