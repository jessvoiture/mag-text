<script>
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";

  import Scatterplot from "./Scatterplot.svelte";

  export let width;
  export let height;
  export let cumulativeData;
  export let showingMeanValues;
  export let yVals;
  export let tweenedY;
  export let screenWidth;
  export let screenHeight;

  cumulativeData.sort((a, b) => a.Date - b.Date);

  let rectHeightMultiplyingFactor;
  let rectHeightAddition;
  let rectTranslation;
  let yTickCount;
  let uniqueYears = new Set();
  let uniqueMonths = new Set();

  cumulativeData.forEach((item) => {
    uniqueYears.add(item.year);
  });

  cumulativeData.forEach((item) => {
    uniqueMonths.add(item.month);
  });

  let uniqueYearsCount = uniqueYears.size;
  let uniqueMonthsCount = uniqueMonths.size;

  let ratioExtent = extent(cumulativeData, (d) => d.ratio);
  let ratioMax = ratioExtent[1];

  let yScale = yScaleNormal;
  const margin = { top: 40, left: 40, right: 40, bottom: 40 };
  let marginUnit = 40;

  $: if (screenWidth <= 860) {
    height = 0.8 * screenHeight;
    width = 0.9 * screenWidth;
  } else {
    height = 0.8 * screenHeight;
    width = 0.8 * screenWidth;
  }

  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;

  $: yExtent = extent($tweenedY);
  $: xExtent = extent(cumulativeData, (d) => d.year);

  $: xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
  $: yScaleNormal = scaleLinear().domain(yExtent).range([innerHeight, 0]);
  $: yScaleReverse = scaleLinear().domain(yExtent).range([0, innerHeight]);

  $: rectWidth = (innerWidth / uniqueYearsCount) * 0.9;
  $: yScaleTranslate = marginUnit;

  // make ticks
  $: xTicks = xScale.ticks(xTickCount);
  $: yTicks = yScale.ticks(yTickCount);

  $: xTickCount = Math.floor(innerWidth / 100);

  $: if (yVals == "month") {
    rectHeightMultiplyingFactor = innerHeight / uniqueMonthsCount;
    rectHeightAddition = 0;
    rectTranslation = innerHeight / uniqueMonthsCount;
    yTickCount = uniqueMonthsCount;
    yScale = yScaleReverse;
  } else if (yVals == "relative") {
    rectHeightMultiplyingFactor = innerHeight / uniqueMonthsCount / ratioMax;
    rectHeightAddition = 0;
    rectTranslation = innerHeight / uniqueMonthsCount;
    yTickCount = uniqueMonthsCount;
    yScale = yScaleReverse;
  } else if (yVals == "ratio") {
    rectHeightMultiplyingFactor = 0;
    rectHeightAddition = 2;
    rectTranslation = 0;
    yTickCount = 5;
    yScale = yScaleNormal;
  }
</script>

<Scatterplot
  {screenWidth}
  {screenHeight}
  {innerHeight}
  {innerWidth}
  {height}
  {width}
  {marginUnit}
  {cumulativeData}
  {showingMeanValues}
  {xScale}
  {yScale}
  {tweenedY}
  {rectWidth}
  {rectHeightMultiplyingFactor}
  {rectHeightAddition}
  {yVals}
  {xTicks}
  {yTicks}
  {yScaleTranslate}
/>
