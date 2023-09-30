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
  export let marginUnit;
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

  <svg {width} {height} class="scatterplot-svg">
    <g
      width={innerWidth}
      height={innerHeight}
      transform={`translate(${marginUnit}, 0)`}
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

      <ScatterplotRatios
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
          {cumulativeData}
          {xScale}
          {yScale}
          {rectWidth}
          {rectHeightAddition}
        />
      {/if}
    </g>

    <AxisX {marginUnit} {xTicks} {xScale} {height} />

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
