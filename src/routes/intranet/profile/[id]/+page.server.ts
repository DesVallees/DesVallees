import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        profile: await prisma.profile.findUnique({
            where: {
                id: Number(params.id)
            }
        }),
    }
};