import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        comments: await prisma.post.findMany({
            where: {
                parentPostID: Number(params.id),
            },
            orderBy: {
                date: 'desc'
            }
        }),
        originalPost: await prisma.post.findUnique({
            where: {
                id: Number(params.id),
            },
        }),
        profiles: await prisma.profile.findMany(),
    }
};