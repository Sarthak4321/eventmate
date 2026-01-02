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
            },
            async authorize(credentials) {
                // --- PHONE + OTP LOGIN ---
                if (credentials?.phone && credentials?.code) {
                    const otpRecord = await prisma.otp.findUnique({
                        where: { phone: credentials.phone },
                    })

                    if (!otpRecord || otpRecord.code !== credentials.code) {
                        throw new Error("Invalid OTP")
                    }

                    if (new Date() > otpRecord.expiresAt) {
                        throw new Error("OTP expired")
                    }

                    // Delete OTP after usage for security
                    await prisma.otp.delete({ where: { phone: credentials.phone } })

                    const user = await prisma.user.findUnique({
                        where: { phone: credentials.phone },
                    })

                    if (!user) {
                        return null // User not found, should register
                    }

                    return {
                        id: user.id + "",
                        email: user.email, // might be null
                        name: user.fullName || user.phone, // fallback to phone if no name
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
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    gender: token.gender,
                    phone: token.phone as string | null,
                },
            }
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                    gender: user.gender,
                    phone: user.phone,
                }
            }
            if (trigger === "update" && session) {
                return { ...token, ...session.user }
            }
            return token
        },
    },
}
