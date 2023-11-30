import { derived, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";

export type Language = 'español' | 'english'

function isLanguage(value: any): value is Language {
    return (
        value === 'español' ||
        value === 'english'
    );
}

function mapNavigatorLanguage(navigatorLanguage: string): Language | undefined {
    const languageMappings: Record<string, Language> = {
        'es': 'español',
        'en': 'english',
    };

    const simplifiedLanguage = navigatorLanguage.split('-')[0].toLowerCase();
    return languageMappings[simplifiedLanguage];
}

export type Profile = {
    id: number,
    microsoftId: string,
    fullName: string,
    jobTitle: string,
    department: string,
    mail: string,
    mobilePhone: string,
    officeLocation: string,
    preferredLanguage: string,
    profilePicture: string,
    birthday: string,
}

export type Notification = {
    id: string,
    content: string,
    seen: boolean,
    dismissed: boolean,
    date: string,
}


export const username: Writable<string> = writable('');

export const profile: Writable<Profile> = writable();


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

export const showNotifications:Writable<boolean> = writable(false);
