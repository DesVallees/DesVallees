import { derived, get, writable, type Writable } from 'svelte/store';
import { translator } from './translator';
import { browser } from "$app/environment";
import { tasks } from './database';

// Base Routes
export const baseImageRoute = '/images/journee';
export const baseRoute = '/journee';


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

function createPersistentStore(key: string, defaultValue: any) {
    let storedValue: string[] | null = null;
    if (browser) {
        let json = localStorage.getItem(key)
        if (json) {
            storedValue = JSON.parse(json);
        }
    }

    const store = writable(storedValue || defaultValue);

    // Subscribe to store changes and update local storage
    store.subscribe(value => {
        if (browser) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    return store;
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

export const language: Writable<Language> = writable(storedLanguage || navigatorLanguage || 'es');

if (browser) {
    language.subscribe((value) => {
        document.documentElement.lang = value || 'en';
        setCookie('lang', value, 1000);
    })
}

export const dictionary = derived(language, (language) => translator[language]);



// Tasks
export const task: Writable<string> = writable('')
export const tasksList = derived(language, (language) => tasks[language]);

// Writable store to track the indexes array
const indexes: Writable<number[]> = writable([]);

// Initialize indexes array, checking local storage first
export function initializeIndexes() {
    let storedIndexes: number[] | null = null;
    if (browser) {
        let json = localStorage.getItem('indexes')
        if (json) {
            storedIndexes = JSON.parse(json);
        }
    }
    if (storedIndexes && Array.isArray(storedIndexes) && storedIndexes.length > 0) {
        indexes.set(storedIndexes);
    } else {
        const tasksLength = get(tasksList).length;
        const newIndexes = Array.from({ length: tasksLength }, (_, i) => i);
        indexes.set(newIndexes);
        localStorage.setItem('indexes', JSON.stringify(newIndexes));
    }
}

// Function to pick a random task index, remove it, and return the corresponding task
export function pickTask() {
    let currentIndexes = get(indexes);

    // Repopulate indexes if empty
    if (currentIndexes.length === 0) {
        initializeIndexes();
        console.log(currentIndexes.length);
        currentIndexes = get(indexes);
    }

    // Pick a random index
    const randomIndex = Math.floor(Math.random() * currentIndexes.length);
    const pickedIndex = currentIndexes[randomIndex];

    // Remove the picked index from the array
    currentIndexes.splice(randomIndex, 1);

    // Update the indexes store and local storage
    indexes.set(currentIndexes);
    localStorage.setItem('indexes', JSON.stringify(currentIndexes));

    // Return the task from `tasksList` at the picked index
    task.set(get(tasksList)[pickedIndex]);
    language.subscribe(() => {
        task.set(get(tasksList)[pickedIndex]);
    })
}




// Settings
export const settingsOpened: Writable<boolean> = writable(false)
export const initialTime: Writable<number> = createPersistentStore('initialTime', 20);

export function openSettings() {
    settingsOpened.set(true)
}
export function closeSettings() {
    settingsOpened.set(false)
}

// Game State
export const state: Writable<'start' | 'playing' | 'paused' | 'blueWins' | 'redWins'> = writable('start');
state.subscribe((value) => {
    if (value === 'playing') startTimers()
    if (value === 'paused') stopTimers()
})

// Internal writable store to manage the main time value
const mainTime = writable(get(initialTime));
initialTime.subscribe((value) => mainTime.set(value));

// Derived store for time
export const time = derived(mainTime, ($mainTime) => $mainTime);

// Derived store for time2
export const time2 = derived([initialTime, mainTime], ([$initialTime, $mainTime]) => {
    return 2 * $initialTime - $mainTime;
});

// Writable store to track the turn
export const turn = writable(0);

// Variable to store the interval ID
let intervalId: string | number | NodeJS.Timeout | undefined;

// Function to update time based on number parity
export function updateTimeBasedOnNumber(number: number) {
    if (number % 2 === 0) {
        // Subtract 1 from time
        mainTime.set(get(mainTime) - 1);
    } else {
        // Subtract 1 from time2
        const initial = get(initialTime);
        const newTime2 = 2 * initial - get(mainTime) - 1;
        mainTime.set(2 * initial - newTime2);
    }

    // Check if either `time` or `time2` has reached 0
    if (get(time) <= 0 || get(time2) <= 0) {
        get(time) <= 0 ? state.set('redWins') : state.set('blueWins')
        stopTimers();

        // The winning team starts the next round
        turn.update(n => n + 1);
    }
}

export function startGame() {
    resetTimers()
    pickTask()
    state.set('playing')
}

// Function to call `updateTimeBasedOnNumber` every second
export function startTimers() {
    intervalId = setInterval(() => {
        updateTimeBasedOnNumber(get(turn));
    }, 1000);
}

// Function to stop the interval
export function stopTimers() {
    clearInterval(intervalId);
}

// Function to reset the values
export function resetTimers() {
    mainTime.set(get(initialTime)); // Reset `mainTime` to `initialTime`
}

// Function to change the turn by adding 1
export function changeTurn() {
    pickTask();
    turn.update(n => n + 1);
}


// Participants
export const blueParticipants = createPersistentStore('blueParticipants', []);
export const redParticipants = createPersistentStore('redParticipants', []);

// Function to add participants from an input string
export function addParticipants(inputString: string, team: 'blue' | 'red') {
    // Clean up and validate the input string
    const names = inputString
        .split(',')
        .map(name => name.trim()) // Remove extra spaces
        .filter(name => name.length > 0); // Filter out empty strings

    if (team === 'blue') {
        blueParticipants.set(names);
    } else if (team === 'red') {
        redParticipants.set(names);
    }
}