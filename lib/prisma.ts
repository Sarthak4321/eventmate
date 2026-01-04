import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    // 🚨 Build-time guard (THIS fixes the bind error)
    if (process.env.NEXT_PHASE === "phase-production-build") {
        return new PrismaClient();
    }

    // Runtime (Vercel / Node)
    if (process.env.TURSO_AUTH_TOKEN && process.env.DATABASE_URL) {
        const { PrismaLibSql } = require("@prisma/adapter-libsql");
        const { createClient } = require("@libsql/client");

        const libsql = createClient({
            url: process.env.DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        });

        const adapter = new PrismaLibSql(libsql);
        return new PrismaClient({ adapter } as any);
    }

    return new PrismaClient();
}

export const prisma =
    globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
