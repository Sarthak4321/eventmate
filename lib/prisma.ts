import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
    const url = process.env.DATABASE_URL

    if (process.env.TURSO_AUTH_TOKEN) {
        const libsql = createClient({
            url: url || 'file:local.db',
            authToken: process.env.TURSO_AUTH_TOKEN,
        })
        const adapter = new PrismaLibSql(libsql as any)
        return new PrismaClient({ adapter } as any)
    }

    return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
