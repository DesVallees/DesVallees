import { auth } from "$lib/firebase/journee";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { anErrorOccurred } from "./functions";
import { goto } from "$app/navigation";
import { baseRoute } from "./stores";

export const authHandlers = {
    signin: async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                goto(`${baseRoute}`);
            })
            .catch((error) => {
                anErrorOccurred(error.message.replace("Firebase: ", ""))
            });
    },
    login: async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                goto(`${baseRoute}`);
            })
            .catch((error) => {
                anErrorOccurred(error.message.replace("Firebase: ", ""))
            })
    },
    logout: async () => {
        await signOut(auth)
            .then(() => {
                goto(`${baseRoute}`);
            })
            .catch((error) => {
                anErrorOccurred(error.message.replace("Firebase: ", ""))
            })
    }
}