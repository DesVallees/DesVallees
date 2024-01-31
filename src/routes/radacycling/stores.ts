import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";





// Base Routes

export const baseImageRoute = '/images/radacycling';
export const baseRoute = '/radacycling';


// Language Management

export type Language = 'es' | 'en';

export function isLanguage(value: any): value is Language {
    return (
        value === 'es' ||
        value === 'en'
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

// export const language: Writable<Language> = writable(storedLanguage || navigatorLanguage || 'en');
export const language: Writable<Language> = writable('en');

if (browser) {
    language.subscribe((value) => {
        document.documentElement.lang = value || 'en';
        setCookie('lang', value, 1000);
    })
}

export const dictionary = derived(language, (language) => translator[language]);



// Theme Management

export type Theme = 'dark' | 'light';

function isTheme(value: any) {
    return (
        value === 'dark' ||
        value === 'light'
    );
}

let storedTheme: Theme | undefined;
if (browser) {
    const themeCookie = getCookie('theme')
    if (isTheme(themeCookie)) {
        storedTheme = themeCookie as Theme;
    }
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        storedTheme = 'dark';
    }
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        storedTheme = 'light';
    }
}

export const theme: Writable<Theme> = writable('dark');

if (browser) {
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches }) => {
            if (matches) {
                theme.set('dark')
            } else {
                theme.set('light')
            }
        })

    theme.subscribe((value) => {
        document.documentElement.setAttribute("data-theme", value);
        setCookie('theme', value, 1000);
    })
}