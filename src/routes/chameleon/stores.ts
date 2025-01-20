import { derived, writable, type Writable } from 'svelte/store';
import type { Player } from './peer';
import { translator } from './translator';
import { browser } from "$app/environment";

// Player state
export const dataReady = writable(true);

export const players = writable<Player[]>([]);
export const isHost = writable(false);

type GameState = {
    phase: 'lobby' | 'in-progress' | 'voting' | 'results';
    chameleon: string | null;
    word: string | null;
};

export const gameState: Writable<GameState> = writable({
    phase: 'lobby',
    chameleon: null,
    word: null
});

// Base Routes
export const baseImageRoute = '/images/chameleon';
export const baseRoute = '/chameleon';


// Language Management

export type Language = 'fr' | 'es' | 'it' | 'en' | 'ru' | 'de' | 'pt';

export function isLanguage(value: any): value is Language {
    return (
        value === 'fr' ||
        value === 'es' ||
        value === 'it' ||
        value === 'en' ||
        value === 'ru' ||
        value === 'de' ||
        value === 'pt'
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