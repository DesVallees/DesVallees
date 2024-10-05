import { derived, get, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";
import { db } from '$lib/firebase/chameleon';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { game, type Game } from './database';

// Database
export const dataReady: Writable<boolean> = writable(false);
export const code: Writable<string> = writable();

code.subscribe(async (room) => {
    if (code) {
        dataReady.set(false)

        let roomData: Game = {};
        const roomDocumentReference = doc(db, 'rooms', room);
        const docSnap = await getDoc(roomDocumentReference);

        if (!docSnap.exists()) {
            await setDoc(roomDocumentReference, roomData, { merge: true });
        } else {
            roomData = docSnap.data();
        }
    }
})

// Base Routes
export const baseImageRoute = '/images/journee';
export const baseRoute = '/chameleon';


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