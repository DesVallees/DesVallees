import { get, writable, type Writable } from "svelte/store"
import { baseRoute, dictionary } from "./stores";
import { goto } from "$app/navigation";
import toast from "svelte-french-toast";

export const game: Writable<Game> = writable()

export interface Game {
    players?: Player[]
    chameleon?: Player
    category?: Category
    word?: string
    playedWords?: string[]
}

interface Player {
    name: string
    score: number
}

interface Category {
    words: string[]
}