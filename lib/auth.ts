import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                phone: { label: "Phone", type: "text" },
                code: { label: "OTP", type: "text" },
                googleLogin: { label: "Google Login", type: "text" },
                firebaseToken: { label: "Firebase Token", type: "text" },
            },
            async authorize(credentials) {
                // --- GOOGLE LOGIN (Trusted Client) ---
                if (credentials?.googleLogin === "true" && credentials?.email) {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    })
                    if (user) {
                        return {
                            id: user.id + "",
                            email: user.email,
                            name: user.fullName || user.email,
                            role: user.role,
                            gender: user.gender,
                            phone: user.phone,
                        }
                    }
                    return null;
                }

                // --- FIREBASE PHONE LOGIN (Trusted Client) ---
                if (credentials?.phone && credentials?.firebaseToken) {
                    let user = await prisma.user.findUnique({
                        where: { phone: credentials.phone },
                    })

                    if (!user) {
                        // Optional: Auto-create user if they passed verification but aren't in DB?
                        // For now, return null to enforce signup flow logic or just return existing users.
                        // User not found, create new user (Auto-Signup)
                        user = await prisma.user.create({
                            data: {
                                phone: credentials.phone,
                                role: "user",
                            }
                        })
                    }

                    return {
                        id: user.id + "",
                        email: user.email,
                        name: user.fullName || user.phone,
                        role: user.role,
                        gender: user.gender,
                        phone: user.phone,
                    }
                }

                // --- LEGACY PHONE + OTP LOGIN (DB based) ---
                if (credentials?.phone && credentials?.code) {
                    const otpRecord = await prisma.otp.findUnique({
                        where: { phone: credentials.phone },
                    })

                    if (!otpRecord || otpRecord.code !== credentials.code) {
                        return null
                    }

                    if (new Date() > otpRecord.expiresAt) {
                        return null
                    }

                    // Delete OTP after usage for security
                    await prisma.otp.delete({ where: { phone: credentials.phone } })

                    let user = await prisma.user.findUnique({
                        where: { phone: credentials.phone },
                    })

                    if (!user) {
                        // User not found, create new user (Auto-Signup)
                        user = await prisma.user.create({
                            data: {
                                phone: credentials.phone,
                                role: "user",
                            }
                        })
                    }

                    return {
                        id: user.id + "",
                        email: user.email,
                        name: user.fullName || user.phone,
                        role: user.role,
                        gender: user.gender,
                        phone: user.phone,
                    }
                }

                // --- EMAIL + PASSWORD LOGIN ---
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user || !user.password) {
                    return null
                }

                const isPasswordValid = await compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    return null
                }

                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.fullName || user.email,
                    role: user.role,
                    gender: user.gender,
                    phone: user.phone,
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            console.log("Session Callback - Token:", JSON.stringify(token, null, 2));
            if (token) {
                session.user.id = (token.id as string) || (token.sub as string);
                session.user.role = token.role as string;
                session.user.gender = token.gender as string | null | undefined;
                session.user.phone = token.phone as string | null | undefined;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            console.log("JWT Callback - User:", user ? "Present" : "Absent");
            console.log("JWT Callback - Trigger:", trigger);

            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.gender = user.gender;
                token.phone = user.phone;
            }
            if (trigger === "update" && session) {
                return { ...token, ...session.user }
            }
            return token
        },
    },
}
