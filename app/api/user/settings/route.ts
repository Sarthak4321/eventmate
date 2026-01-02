import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { settings: true }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!user.settings) {
            // Create default settings if not exist
            const newSettings = await prisma.userSettings.create({
                data: {
                    userId: user.id,
                }
            });
            return NextResponse.json(newSettings);
        }

        return NextResponse.json(user.settings);

    } catch (error: any) {
        console.error("Settings GET Error:", error);
        return NextResponse.json({ message: error.message || "Internal Server Error", error: error.toString() }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        // Allow partial updates
        const { emailNotif, pushNotif, marketingNotif, darkMode } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { settings: true }
        });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const updatedSettings = await prisma.userSettings.upsert({
            where: { userId: user.id },
            update: {
                emailNotif: emailNotif !== undefined ? emailNotif : undefined,
                pushNotif: pushNotif !== undefined ? pushNotif : undefined,
                marketingNotif: marketingNotif !== undefined ? marketingNotif : undefined,
                darkMode: darkMode !== undefined ? darkMode : undefined,
            },
            create: {
                userId: user.id,
                emailNotif: emailNotif ?? true,
                pushNotif: pushNotif ?? false,
                marketingNotif: marketingNotif ?? false,
                darkMode: darkMode ?? false,
            }
        });

        return NextResponse.json(updatedSettings);

    } catch (error: any) {
        console.error("Settings PATCH Error:", error);
        return NextResponse.json({ message: error.message || "Internal Server Error", error: error.toString() }, { status: 500 });
    }
}
