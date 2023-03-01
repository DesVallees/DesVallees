import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";

type Game = 'waiting for input' | 'in progress' | 'game over'
export type Language = 'français' | 'español' | 'italiano' | 'english' | 'Русский'

export const initialSeconds = writable(30);
export const seconds = writable(30);
export const bestWPM = writable(0);

export const game: Writable<Game> = writable('waiting for input')

let storedLanguage;
if (browser){
    storedLanguage = localStorage.language
}

export const language:Writable<Language> = writable(storedLanguage || 'english');

if (browser){
    language.subscribe((value) => localStorage.language = value)
}

export const dictionary = derived(language, (language) => translator[language]);