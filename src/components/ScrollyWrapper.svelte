<script>
  import { group, extent } from "d3-array";
  import { onMount } from "svelte";

  import { months, magDemoDate, cumulativeAreaProportion } from "../stores";
  import ScrollyChart from "./ScrollyChart.svelte";
  import ScrollyMethod from "./ScrollyMethod.svelte";

  export let data;
  export let screenHeight;
  export let screenWidth;

  const mags = data.magazines;

  let sortedMagazines = [];
  let guineaPigMag = null;
  let whRatio = null;
  let contours = [];

  onMount(() => {
    cumulativeAreaProportion.set(0); // important! for when mag changes

    sortedMagazines = [...mags]
      .sort((a, b) => a.Date - b.Date)
      .filter((d) => d.Date == $magDemoDate);

    guineaPigMag = sortedMagazines[0];
    whRatio = guineaPigMag.wh_ratio;

    contours = guineaPigMag.contours;
  });

  $: {
    sortedMagazines = [...mags]
      .sort((a, b) => a.Date - b.Date)
      .filter((d) => d.Date == $magDemoDate);

    guineaPigMag = sortedMagazines[0]; // the demo mag
    whRatio = guineaPigMag.wh_ratio; // width height ratio
    contours = guineaPigMag.contours; // the contours

    // contour calculations
    // determine cumulative area of all the contours
    let totalContourArea = contours.reduce(
      (acc, curr) => acc + curr.w * curr.h,
      0
    );

    // sort by y pos so the animation looks clean
    contours.sort((a, b) => a.y - b.y);

    // calc what percentage each contour is of the entire contour area CUMULATIVELY
    contours.forEach((item) => {
      item.areaProportion =
        ((item.w * item.h) / totalContourArea) * guineaPigMag.ratio * 100;
      item.cumulativeAreaProportion = $cumulativeAreaProportion;
      $cumulativeAreaProportion += item.areaProportion;
    });
  }

  const groupedMags = group(mags, (d) => d.year);
  const cumulativeData = [];

  mags.sort((a, b) => a.Date - b.Date);

  // calc cumulative sum of text ratio grouped by YEAR
  // useful for y pos in chart by month/year
  groupedMags.forEach((values) => {
    let cumulativeSum = 0;
    values.forEach((d) => {
      cumulativeSum += d.ratio;
      cumulativeData.push({ ...d, total: cumulativeSum });
    });
  });

  cumulativeData.sort((a, b) => a.Date - b.Date);

  cumulativeData.forEach((d) => {
    const monthNumber = d.month;
    d.monthName = $months[monthNumber - 1];
  });

  $: dateExtent = extent(cumulativeData, (d) => d.year);
</script>

<ScrollyMethod
  {cumulativeData}
  {contours}
  {whRatio}
  {screenHeight}
  {screenWidth}
  {guineaPigMag}
/>

<div class="body-section">
  <div class="section">
    <div class="body-text">
      The text-to-cover ratio serves as a useful measurement to compare the text
      coverage across magazines. So, let's expand our view to all {cumulativeData.length}
      of the covers.
    </div>
  </div>
</div>

<ScrollyChart {cumulativeData} {screenHeight} {screenWidth} {dateExtent} />
