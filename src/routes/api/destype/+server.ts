import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import français from "./francais.json";
import english from "./english.json";
import español from "./espanol.json";
import italiano from "./italiano.json";
import Русский from "./Русский.json";
import deutsch from "./deutsch.json";

type Language = 'fr' | 'en' | 'es' | 'it' | 'ru' | 'de'

const languages = {
    'fr': français as any[],
    'es': español as any[],
    'en': english as any[],
    'it': italiano as any[],
    'ru': Русский as any[],
    'de': deutsch as any[],
}

export const GET: RequestHandler = async ({ url }) => {
    const language: string = url.searchParams.get('language') as string
    const limit = Number(url.searchParams.get('limit'))

    const words = selectRandomElements(languages[language as Language], limit)

    return json(words)
}

function selectRandomElements(array: any[], count: number) {
    const selected = [];
    let remaining = shuffleArray(array.slice()); // Make a copy of the array to avoid modifying the original

    while (selected.length < count) {
        if (remaining.length === 0) {
            // If all elements have been selected, shuffle the original array and start over
            remaining = shuffleArray(array.slice());
        }

        const index = Math.floor(Math.random() * remaining.length);
        const element = remaining.splice(index, 1)[0];

        selected.push(element);
    }

    return selected;
}

function shuffleArray(array: any[]) {
    // Implementation of the Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function withoutDuplicates(arr: any[], limit: number) {
    return arr.filter((value, index) => arr.indexOf(value) === index);
}