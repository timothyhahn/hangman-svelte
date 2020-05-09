import { writable } from 'svelte/store';

export const lives = writable(0);
export const state = writable([]);
export const guessedLetters = writable([]);
