import type { RequestHandler } from './$types';
import { prisma } from "$lib/server/prisma";
import { json } from '@sveltejs/kit';

type Nature = 'increment' | 'decrement'

export const POST: RequestHandler = (async ({ url }) => {
    const id: number = parseInt(url.searchParams.get('id') as string)
    const nature: Nature = url.searchParams.get('nature') as Nature

    try {
        if (nature === 'increment') {
            await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    likes: { increment: 1 }
                }
            })
        }
        else if (nature === 'decrement') {
            await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    likes: { decrement: 1 }
                }
            })
        }
    }
    catch (error) {
        console.error(error)
        return json({ message: 'failure' }, { status: 500 });
    }

    return json({ message: 'success' }, { status: 200 });

});