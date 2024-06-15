import { derived, get, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";
import { db } from '$lib/firebase/journee';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { myPosts, type Post } from './database';

// Database
export const dataReady: Writable<boolean> = writable(false);
export const user: Writable<User | undefined> = writable(undefined);

user.subscribe(async (user) => {
    if (user) {
        dataReady.set(false)

        let userData: any;
        const userDocumentReference = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocumentReference);

        if (!docSnap.exists()) {
            const newUserData = {};

            await setDoc(userDocumentReference, newUserData, { merge: true });
            userData = newUserData;
        } else {
            userData = docSnap.data();
        }

        // Fetch all posts for the user
        const postsCollectionReference = collection(db, 'users', user.uid, 'posts');
        const postsSnapshot = await getDocs(postsCollectionReference);
        const postsData = postsSnapshot.docs.map(doc => ({ ...doc.data() as Post }));

        // Update the myPosts store with the fetched posts
        myPosts.set(postsData);

        dataReady.set(true)
    }
})

let previousPosts: Post[] = [];

myPosts.subscribe(async (currentPosts) => {
    const userInfo: User | undefined = get(user);

    if (userInfo) {
        // Handle deletions
        const deletedPosts = previousPosts.filter(
            previousPost => !currentPosts.some(currentPost => currentPost.id === previousPost.id)
        );

        for (const post of deletedPosts) {
            const userPostReference = doc(db, 'users', userInfo.uid, 'posts', post.id.toString());
            try {
                await deleteDoc(userPostReference);
            } catch (error) {
                console.error("Error while deleting post: ", error);
            }
        }

        // Handle additions/updates
        for (const post of currentPosts) {
            const userPostReference = doc(db, 'users', userInfo.uid, 'posts', post.id.toString());
            try {
                await setDoc(
                    userPostReference,
                    { ...post },
                    { merge: true }
                );
            } catch (error) {
                console.error("Error while saving post: ", error);
            }
        }

        // Update previousPosts to the current state
        previousPosts = [...currentPosts];
    }
});

// Base Routes
export const baseImageRoute = '/images/journee';
export const baseRoute = '/journee';


// Language Management

export type Language = 'fr' | 'es' | 'it' | 'en' | 'ru' | 'de';

export function isLanguage(value: any): value is Language {
    return (
        value === 'fr' ||
        value === 'es' ||
        value === 'it' ||
        value === 'en' ||
        value === 'ru' ||
        value === 'de'
    );
}

function setCookie(name: string, value: string, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/; SameSite=Lax";
    document.cookie = name + "=" + cookieValue;
}

function getCookie(name: string): string | null {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (const cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }

    return null;
}

let navigatorLanguage;
let storedLanguage;
if (browser) {
    const languageCookie = getCookie('lang')
    if (isLanguage(languageCookie)) {
        storedLanguage = languageCookie;
    }

    const navigatorLanguageCode = navigator.language.split('-')[0].toLowerCase();
    if (isLanguage(navigatorLanguageCode)) {
        navigatorLanguage = navigatorLanguageCode;
    }
}

export const language: Writable<Language> = writable(storedLanguage || navigatorLanguage || 'en');

if (browser) {
    language.subscribe((value) => {
        document.documentElement.lang = value || 'en';
        setCookie('lang', value, 1000);
    })
}

export const dictionary = derived(language, (language) => translator[language]);