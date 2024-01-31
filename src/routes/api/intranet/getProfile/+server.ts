import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
    const profileID: string = url.searchParams.get('id') as string

    if (!profileID) {
        return json({ message: 'no id parameter' }, { status: 500 });
    }

    try {

        let dbProfile = await prisma.profile.findUniqueOrThrow({
            where: {
                id: Number(profileID)
            }
        })

        return json(dbProfile);

    } catch (error) {

        console.error(error)
        return json({ message: 'error getting profile' }, { status: 500 });

    }

}