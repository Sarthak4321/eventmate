import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!user.password) {
            return NextResponse.json({ message: "User does not have a password set. Please sign in with your provider." }, { status: 400 });
        }

        const isValid = await compare(currentPassword, user.password);

        if (!isValid) {
            return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
        }

        const hashedPassword = await hash(newPassword, 12);

        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ message: "Password updated successfully" });

    } catch (error) {
        console.error("Change Password Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
