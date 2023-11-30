import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";

export type Language = 'français' | 'español' | 'italiano' | 'english' | 'Русский' | 'deutsch';

function isLanguage(value: any): value is Language {
    return (
        value === 'français' ||
        value === 'español' ||
        value === 'italiano' ||
        value === 'english' ||
        value === 'Русский' ||
        value === 'deutsch'
    );
}

function mapNavigatorLanguage(navigatorLanguage: string): Language | undefined {
    const languageMappings: Record<string, Language> = {
        'fr': 'français',
        'es': 'español',
        'it': 'italiano',
        'en': 'english',
        'ru': 'Русский',
        'de': 'deutsch',
    };

    const simplifiedLanguage = navigatorLanguage.split('-')[0].toLowerCase();
    return languageMappings[simplifiedLanguage];
}

let navigatorLanguage;
let storedLanguage;
if (browser) {
    if (isLanguage(localStorage.language)) {
        storedLanguage = localStorage.language;
    }
    navigatorLanguage = mapNavigatorLanguage(navigator.language)
}

export const language: Writable<Language> = writable(storedLanguage || navigatorLanguage || 'english');

if (browser) {
    language.subscribe((value) => localStorage.language = value)
}

export const dictionary = derived(language, (language) => translator[language]);

export const chosenGuitarIndex: Writable<number> = writable(0);