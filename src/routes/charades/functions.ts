export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function throttle(func: () => void, limit: number): () => void {
    let lastCallTime = 0;
    return function () {
        const now = Date.now();
        if (now - lastCallTime >= limit) {
            func();
            lastCallTime = now;
        }
    }
}

import toast from "svelte-french-toast";
import { dictionary } from "./stores"
import { get } from 'svelte/store';
let storedDictionary = get(dictionary);
export function anErrorOccurred(error: string = storedDictionary.errorOccurred) {
    toast.error(error, { position: 'bottom-center' });
}