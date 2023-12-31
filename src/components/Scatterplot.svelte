<script>
  import { fade } from "svelte/transition";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";
  import { timeFormat } from "d3-time-format";
  import { format } from "d3-format";

  import { hoveredDatapoint } from "../stores";

  import ScatterplotBackgroundCovers from "./ScatterplotBackgroundCovers.svelte";
  import ScatterplotMeans from "./ScatterplotMeans.svelte";
  import ScatterplotRatios from "./ScatterplotRatios.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Tooltip from "./Tooltip.svelte";

  export let width;
  export let height;
  export let cumulativeData;
  export let showingMeanValues;
  export let yVals;
  export let tweenedY;
  export let screenWidth;
  export let screenHeight;
  export let showingMonthRatios;
  export let justAdded;

  cumulativeData.sort((a, b) => a.Date - b.Date);

  let rectHeightMultiplyingFactor;
  let rectHeightAddition;
  let rectTranslation;
  let yTickCount;
  let uniqueYears = new Set();

  cumulativeData.forEach((item) => {
    uniqueYears.add(item.year);
  });

  let uniqueYearsCount = uniqueYears.size;
  let uniqueMonthsCount = 12;

  let ratioExtent = extent(cumulativeData, (d) => d.ratio);
  let ratioMax = ratioExtent[1];

  let yScale = yScaleNormal;
  let marginUnit = 40;

  const margin = { top: 40, left: 40, right: 40, bottom: 40 };

  const formatTick = format(".0f");

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
  $: yMax = yExtent[1] + 0.05;
  $: xExtent = extent(cumulativeData, (d) => d.year);

  $: xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
  $: yScaleNormal = scaleLinear().domain([0, yMax]).range([innerHeight, 0]);
  $: yScaleReverse = scaleLinear().domain(yExtent).range([0, innerHeight]);

  $: rectWidth = (innerWidth / uniqueYearsCount) * 0.9;

  // make ticks
  $: xTickCount = Math.floor(innerWidth / 100);

  $: xTicks = xScale.ticks(xTickCount);
  $: yTicks = yScale.ticks(yTickCount);

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

  let chartDivHeight = width + 25;
  let chartTitle = "";

  $: if ((yVals == "month") | (yVals == "relative")) {
    chartTitle = "Text coverage (%) by month and year";
  } else {
    chartTitle = "Text coverage (%) by year";
  }
</script>

<div class="chart" {width} height={chartDivHeight} transition:fade>
  <div class="chart-title">{chartTitle}</div>

  <svg {width} {height} class="scatterplot-svg">
    <g
      width={innerWidth}
      height={innerHeight}
      transform={`translate(${marginUnit}, 20)`}
      class="scatterplot-g"
    >
      {#if yVals == "month"}
        <ScatterplotBackgroundCovers
          {cumulativeData}
          {xScale}
          {yScale}
          {tweenedY}
          {rectWidth}
          {rectHeightMultiplyingFactor}
          {rectHeightAddition}
        />
      {/if}

      {#if showingMonthRatios}
        <ScatterplotRatios
          {cumulativeData}
          {showingMeanValues}
          {xScale}
          {yScale}
          {tweenedY}
          {rectWidth}
          {rectHeightMultiplyingFactor}
          {rectHeightAddition}
          {justAdded}
        />

        {#if showingMeanValues}
          <ScatterplotMeans
            {cumulativeData}
            {xScale}
            {yScale}
            {rectWidth}
            {rectHeightAddition}
          />
        {/if}
      {/if}
    </g>

    <AxisX {marginUnit} {xTicks} {xScale} {height} {formatTick} />

    <AxisY {yTicks} {yScale} {marginUnit} {yVals} />
  </svg>
</div>

{#if $hoveredDatapoint != undefined}
  <Tooltip {screenWidth} {screenHeight} />
{/if}

<style>
  .chart {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  svg {
    overflow: visible;
  }
</style>
