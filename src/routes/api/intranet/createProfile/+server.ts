import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from "$lib/server/prisma";

export const POST: RequestHandler = (async ({ request }) => {
    const profile = await request.json();

    try {
        
        let dbProfile = await prisma.profile.findFirstOrThrow({
            where: {
                microsoftId: profile.microsoftId
            }
        })

        return json(dbProfile);
        
    } catch (error) {

        try {



            await prisma.profile.create({
                data: {
                    microsoftId: profile.microsoftId,
                    birthday: profile.birthday,
                    department: profile.department,
                    fullName: profile.fullName,
                    jobTitle: profile.jobTitle,
                    mail: profile.mail,
                    mobilePhone: profile.mobilePhone,
                    officeLocation: profile.officeLocation,
                    preferredLanguage: profile.preferredLanguage,
                    profilePicture: profile.profilePicture,
                }
            })

        } catch (error) {
    
            console.error('Error creating profile:', error);
            return json({ message: 'failure' }, { status: 500 });
        
        }
    }

    try {

        let dbProfile = await prisma.profile.findFirstOrThrow({
            where: {
                microsoftId: profile.microsoftId
            }
        })
    
        return json(dbProfile);
        
    } catch (error) {
        
        console.error('Unexpected error:', error);
        return json({ message: 'failure' }, { status: 500 });

    }

        
});