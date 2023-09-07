import { writable, readable } from "svelte/store";

export const currentStep = writable(0);
export const nowShowing = writable("original");
export const hoveredDatapoint = writable(undefined);
export const mouse_x = writable(undefined);
export const mouse_y = writable(undefined);
export const months = readable([
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]);
