import { PrismaClient } from "@prisma/client";

// Declare the global object
declare const global: { prisma?: PrismaClient };

// global.prisma to avoid hot reload problems
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma
}

export { prisma };