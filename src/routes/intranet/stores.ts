import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";

export type Language = 'español' | 'english'
type Section = 'home' | 'people' | 'general' | 'profile'

type Profile = {
    fullName: string,
    firstName: string,
    id: string,
    jobTitle: string,
    mail: string,
    mobilePhone: string,
    officeLocation: string,
    preferredLanguage: string,
    surname: string,
    userPrincipalName: string,
    businessPhones: string,
    profilePicture: string,
}

export const username: Writable<string> = writable('');


export const profile: Writable<Profile> = writable();


let storedLanguage: Language | undefined;
let storedSection: Section | undefined;
if (browser){
    if (localStorage.language === 'español' || localStorage.language === 'english') {
        storedLanguage = localStorage.language  
    }
    if (sessionStorage.section === 'home' || sessionStorage.section === 'people' || sessionStorage.section === 'general' || sessionStorage.section === 'profile') {
        storedSection = sessionStorage.section  
    }
}
export const language:Writable<Language> = writable(storedLanguage || 'english');
export const section: Writable<Section> = writable(storedSection || 'home');
if (browser){
    language.subscribe((value) => localStorage.language = value)
    section.subscribe((value) => sessionStorage.section = value)
}

export const dictionary = derived(language, (language) => translator[language]);

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
