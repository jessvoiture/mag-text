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

// export const guineaPigMagArray = derived(
//   [allMags, magDemoDate], // Array of stores to derive from
//   ([$allMags, $magDemoDate]) =>
//     [...$allMags]
//       .sort((a, b) => a.Date - b.Date)
//       .filter((d) => d.Date == $magDemoDate) // Computation function
// );

// export const guineaPigMag = derived(
//   guineaPigMagArray,
//   ($guineaPigMagArray) => $guineaPigMagArray[0]
// );

// export const whRatio = derived(
//   guineaPigMag,
//   ($guineaPigMag) => $guineaPigMag.whRatio
// );

// export const contours = derived(
//   guineaPigMag,
//   ($guineaPigMag) => $guineaPigMag.contours
// );

// console.log("allmags", $allMags);
// console.log("guineaPigMag", $guineaPigMag);
// console.log("contours", $contours);
