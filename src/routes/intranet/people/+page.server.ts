import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        profiles: await prisma.profile.findMany({
            orderBy: {
                fullName: 'asc'
            }
        }),
    }
};