<script>
  import { group } from "d3-array";

  import ScrollWrapper from "./ScrollWrapper.svelte";

  export let data;
  export let screenHeight;
  export let screenWidth;

  const mags = data.magazines;
  const contours = data.contours;

  const groupedMags = group(mags, (d) => d.year);
  const cumulativeData = [];

  const totalContourArea = contours.reduce(
    (acc, curr) => acc + curr.w * curr.h,
    0
  );

  let sortedMagazines = [...mags]
    .sort((a, b) => a.Date - b.Date)
    .filter((d) => d.Date == 20110901);

  let guineaPigMag = sortedMagazines[0];
  let whRatio = guineaPigMag.wh_ratio;
  let cumulativeAreaProportion = 0;

  mags.sort((a, b) => a.Date - b.Date);

  groupedMags.forEach((values) => {
    let cumulativeSum = 0;
    values.forEach((d) => {
      cumulativeSum += d.ratio;
      cumulativeData.push({ ...d, total: cumulativeSum });
    });
  });

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
/>
