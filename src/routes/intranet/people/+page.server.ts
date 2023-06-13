import { fail, type Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
    createPost:async ({ request }) => {
        const { profileID, content, img, visibility } = Object.fromEntries(await request.formData()) as { 
            profileID: string, 
            content: string, 
            img: string, 
            visibility: string, 
        }

        try {
            await prisma.post.create({
                data: {
                    profileId: parseInt(profileID),
                    content: content,
                    visibility: visibility,
                    img: img,
                }
            })
        }
        catch (error) {
            console.error(error)
            return fail (500, { message: "Could not publish post" })
        }

        return {
            status: 201
        }
    }
}

export const load: PageServerLoad = async () => {
    return {
        profiles: await prisma.profile.findMany({
            orderBy: {
                fullName: 'asc'
            }
        }),
    }
};