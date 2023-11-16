import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";

export type Language = 'français' | 'español' | 'italiano' | 'english' | 'Русский' | 'deutsch'

let storedLanguage;
if (browser){
    storedLanguage = localStorage.language
}

export const language:Writable<Language> = writable(storedLanguage || 'español');

if (browser){
    language.subscribe((value) => localStorage.language = value)
}

export const dictionary = derived(language, (language) => translator[language]);

export const chosenGuitarIndex:Writable<number> = writable(0);