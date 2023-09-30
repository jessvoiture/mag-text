<script>
  import { group, extent } from "d3-array";

  import ScrollWrapper from "./ScrollWrapper.svelte";
  import { months, magDemoDate } from "../stores";

  export let data;
  export let screenHeight;
  export let screenWidth;

  const mags = data.magazines;

  let sortedMagazines = [...mags]
    .sort((a, b) => a.Date - b.Date)
    .filter((d) => d.Date == $magDemoDate);

  let guineaPigMag = sortedMagazines[0];
  let whRatio = guineaPigMag.wh_ratio;
  let cumulativeAreaProportion = 0;
  let contours = guineaPigMag.contours;

  // mags (for the scatterplot)
  const groupedMags = group(mags, (d) => d.year);
  const cumulativeData = [];

  const totalContourArea = contours.reduce(
    (acc, curr) => acc + curr.w * curr.h,
    0
  );

  mags.sort((a, b) => a.Date - b.Date);

  groupedMags.forEach((values) => {
    let cumulativeSum = 0;
    values.forEach((d) => {
      cumulativeSum += d.ratio;
      cumulativeData.push({ ...d, total: cumulativeSum });
    });
  });

  cumulativeData.sort((a, b) => a.Date - b.Date);

  cumulativeData.forEach((d) => {
    const monthNumber = d.month; // Assuming your data has a "month" property
    d.monthName = $months[monthNumber - 1]; // Adjust for 0-based array index
  });

  $: dateExtent = extent(cumulativeData, (d) => d.year);

  // contours (for the methods demo)
  contours.sort((a, b) => a.y - b.y);

  contours.forEach((item) => {
    item.areaProportion =
      ((item.w * item.h) / totalContourArea) * guineaPigMag.ratio * 100;
    item.cumulativeAreaProportion = cumulativeAreaProportion;
    cumulativeAreaProportion += item.areaProportion;
  });
</script>

<ScrollWrapper
  {contours}
  {cumulativeData}
  {guineaPigMag}
  {whRatio}
  {screenHeight}
  {screenWidth}
  {dateExtent}
/>
