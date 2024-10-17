// import { prisma } from "$lib/server/prisma";
// import type { PageServerLoad } from "./$types";


// export const load: PageServerLoad = async () => {
//     return {
//         posts: await prisma.post.findMany({
//             where: {
//                 parentPostID: null,
//             },
//             orderBy: {
//                 date: 'desc'
//             }
//         }),

//         profiles: await prisma.profile.findMany(),
//     }
// };