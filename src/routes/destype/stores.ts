import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";

type Game = 'waiting for input' | 'in progress' | 'game over'
export type Language = 'français' | 'español' | 'italiano' | 'english' | 'Русский'

function isLanguage(value: any): value is Language {
    return (
        value === 'français' ||
        value === 'español' ||
        value === 'italiano' ||
        value === 'english' ||
        value === 'Русский'
    );
}

function mapNavigatorLanguage(navigatorLanguage: string): Language | undefined {
    const languageMappings: Record<string, Language> = {
        'fr': 'français',
        'es': 'español',
        'it': 'italiano',
        'en': 'english',
        'ru': 'Русский',
    };

    const simplifiedLanguage = navigatorLanguage.split('-')[0].toLowerCase();
    return languageMappings[simplifiedLanguage];
}

export const initialSeconds = writable(30);
export const seconds = writable(30);
export const bestWPM = writable(0);

export const game: Writable<Game> = writable('waiting for input')

let navigatorLanguage;
let storedLanguage;
if (browser){
    if (isLanguage(localStorage.language)) {
        storedLanguage = localStorage.language  
    }
    navigatorLanguage = mapNavigatorLanguage(navigator.language)
}

export const language:Writable<Language> = writable(storedLanguage || navigatorLanguage || 'english');

if (browser){
    language.subscribe((value) => localStorage.language = value)
}

export const dictionary = derived(language, (language) => translator[language]);