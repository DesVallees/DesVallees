import { AUTHORITY, CLIENTID, CLIENTSECRET, REDIRECTURI } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
    return {
        msalConfig: {
            auth: {
                clientId: CLIENTID as string,
                authority: AUTHORITY as string,
                redirectUri: REDIRECTURI as string,
                clientSecret: CLIENTSECRET as string
            },
            cache: {
                cacheLocation: "localStorage",
                storeAuthStateInCookie: false,
            },
        }
    };
}