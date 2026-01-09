import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, phone } = await req.json();

        if (!email && !phone) {
            return NextResponse.json({ message: "Email or Phone required" }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email || undefined },
                    { phone: phone || undefined },
                ],
            },
            select: { id: true, role: true, email: true, phone: true }
        });

        if (user) {
            return NextResponse.json({ exists: true, user });
        }

        return NextResponse.json({ exists: false });
    } catch (error) {
        console.error("Check User Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
