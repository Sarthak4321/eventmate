import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Create a demo user
    const demoEmail = 'user@example.com'
    const existingUser = await prisma.user.findUnique({ where: { email: demoEmail } })

    if (!existingUser) {
        const hashedPassword = await hash('password123', 10)
        await prisma.user.create({
            data: {
                email: demoEmail,
                password: hashedPassword,
                fullName: 'Demo User',
                role: 'user',
                phone: '1234567890',
                gender: 'Other',
            },
        })
        console.log('Created demo user: user@example.com / password123')
    }

    // Create a demo vendor
    const demoVendorEmail = 'vendor@example.com'
    const existingVendor = await prisma.user.findUnique({ where: { email: demoVendorEmail } })

    if (!existingVendor) {
        const hashedPassword = await hash('password123', 10)
        const vendorUser = await prisma.user.create({
            data: {
                email: demoVendorEmail,
                password: hashedPassword,
                role: 'vendor',
                phone: '0987654321', // Different phone
                vendorProfile: {
                    create: {
                        businessName: 'EvntMet Events',
                        category: 'Event Planner',
                        phone: '0987654321',
                        gstin: '22AAAAA0000A1Z5',
                        pan: 'ABCDE1234F',
                        city: 'New York',
                        experience: '5 years',
                        startingPrice: '500',
                        teamSize: '10',
                    },
                },
            },
        })
        console.log('Created demo vendor: vendor@example.com / password123')
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
