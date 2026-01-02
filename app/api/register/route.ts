import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, role, phone } = body;

        if (!role || !phone) {
            return NextResponse.json(
                { message: "Role and Phone number are required" },
                { status: 400 }
            );
        }

        // Check if phone exists
        // Cast to any because Prisma Client might need regeneration to recognize 'phone' as a unique field
        const existingUserByPhone = await prisma.user.findUnique({
            where: { phone: phone as string } as any,
        });

        if (existingUserByPhone) {
            return NextResponse.json(
                { message: "User with this phone already exists" },
                { status: 409 }
            );
        }

        // Check if email exists (if provided)
        if (email) {
            const existingUserByEmail = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUserByEmail) {
                return NextResponse.json(
                    { message: "User with this email already exists" },
                    { status: 409 }
                );
            }
        }

        if (!password) {
            return NextResponse.json(
                { message: "Password is required" },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 10);

        if (role === "user") {
            const { fullName, gender } = body;

            await prisma.user.create({
                data: {
                    email: email || undefined,
                    password: hashedPassword,
                    role: "user",
                    fullName,
                    phone,
                    gender,
                },
            });
        } else if (role === "vendor") {
            const { businessName, category, gstin, pan, city, experience, startingPrice, teamSize } = body;

            await prisma.user.create({
                data: {
                    email: email || undefined,
                    password: hashedPassword,
                    role: "vendor",
                    phone,
                    vendorProfile: {
                        create: {
                            businessName,
                            category,
                            phone, // Vendor profile also has phone
                            gstin,
                            pan,
                            city,
                            experience,
                            startingPrice,
                            teamSize,
                        },
                    },
                },
            });
        } else {
            return NextResponse.json({ message: "Invalid role" }, { status: 400 });
        }

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
