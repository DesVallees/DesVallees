import type { RequestHandler } from './$types';
import { prisma } from "$lib/server/prisma";
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = (async ({ request }) => {
    const { profileID, content, img, visibility, parentPostID } = Object.fromEntries(await request.formData()) as {
        profileID: string,
        content: string,
        img: string,
        visibility: string,
        parentPostID: string | undefined
    }

    try {
        await prisma.post.create({
            data: {
                profileId: parseInt(profileID),
                content: content,
                visibility: visibility,
                img: img,
                parentPostID: (parentPostID ? parseInt(parentPostID) : undefined)
            }
        })
    }
    catch (error) {
        console.error(error)
        return json({ message: 'failure' }, { status: 500 });
    }

    if (parentPostID) {
        try {
            await prisma.post.update({
                where: {
                    id: parseInt(parentPostID)
                },
                data: {
                    comments: { increment: 1 }
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    return json({ message: 'success' }, { status: 200 });

});