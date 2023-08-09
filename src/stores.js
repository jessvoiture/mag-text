import { writable } from "svelte/store";

export const currentStep = writable(0);
export const nowShowing = writable("original");
