<script>
  import { fade } from "svelte/transition";

  import { hoveredDatapoint } from "../stores";

  import ScatterplotBackgroundCovers from "./ScatterplotBackgroundCovers.svelte";
  import ScatterplotMeans from "./ScatterplotMeans.svelte";
  import ScatterplotRatios from "./ScatterplotRatios.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Tooltip from "./Tooltip.svelte";

  export let screenWidth;
  export let screenHeight;
  export let width;
  export let height;
  export let innerHeight;
  export let innerWidth;
  export let left;
  export let cumulativeData;
  export let showingMeanValues;
  export let xScale;
  export let yScale;
  export let tweenedY;
  export let rectWidth;
  export let rectHeightMultiplyingFactor;
  export let rectHeightAddition;
  export let yVals;
  export let xTicks;
  export let yTicks;
  export let yScaleTranslate;

  let chartDivHeight = width + 50;
  let chartTitle = "";

  $: if ((yVals == "month") | (yVals == "relative")) {
    chartTitle = "% covered by text by month and year";
  } else {
    chartTitle = "% covered by text by year";
  }
</script>

<div class="chart" {width} height={chartDivHeight} transition:fade>
  <div class="chart-title">{chartTitle}</div>

  <svg {width} {height}>
    {#if yVals == "month"}
      <ScatterplotBackgroundCovers
        {innerHeight}
        {innerWidth}
        {left}
        {cumulativeData}
        {xScale}
        {yScale}
        {tweenedY}
        {rectWidth}
        {rectHeightMultiplyingFactor}
        {rectHeightAddition}
      />
    {/if}

    <ScatterplotRatios
      {innerHeight}
      {innerWidth}
      {left}
      {cumulativeData}
      {showingMeanValues}
      {xScale}
      {yScale}
      {tweenedY}
      {rectWidth}
      {rectHeightMultiplyingFactor}
      {rectHeightAddition}
    />

    {#if showingMeanValues}
      <ScatterplotMeans
        {innerHeight}
        {innerWidth}
        {left}
        {cumulativeData}
        {xScale}
        {yScale}
        {rectWidth}
        {rectHeightAddition}
      />
    {/if}

    <AxisX {left} {xTicks} {xScale} {height} />
    <AxisY {yTicks} {yScale} {yScaleTranslate} {yVals} />
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
