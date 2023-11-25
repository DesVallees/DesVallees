import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";

export type Language = 'français' | 'español' | 'italiano' | 'english' | 'Русский' | 'deutsch'

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

let storedLanguage;
if (browser){
    if (isLanguage(localStorage.language)) {
        storedLanguage = localStorage.language  
    }
}

export const language:Writable<Language> = writable(storedLanguage || 'english');

if (browser){
    language.subscribe((value) => localStorage.language = value)
}

export const dictionary = derived(language, (language) => translator[language]);

export const chosenGuitarIndex:Writable<number> = writable(0);