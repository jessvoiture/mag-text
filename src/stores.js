import { writable, readable, derived } from "svelte/store";

export const hoveredDatapoint = writable(undefined);
export const mouse_x = writable(undefined);
export const mouse_y = writable(undefined);

export const currentStep = writable(0);
export const nowShowing = writable("original");
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
export const magDemoDate = writable(20220501);
export const cumulativeAreaProportion = writable(0);
