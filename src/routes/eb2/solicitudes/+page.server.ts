import { db } from "$lib/firebase/eb2.server";
import { collection, getDocs } from "firebase/firestore";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const solicitudes = collection(db, "solicitudes");
    const solicitudesSnapshot = await getDocs(solicitudes);
    const solicitudesData: any[] = [];
    solicitudesSnapshot.forEach((doc: { id: any; data: () => any; }) => (
        solicitudesData.push({
            id: doc.id,
            ...doc.data(),
        })
    ));

    return {
        solicitudes: solicitudesData,
    };
};
