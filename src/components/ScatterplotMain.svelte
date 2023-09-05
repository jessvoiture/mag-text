<script>
  import { fade, fly } from "svelte/transition";
  import { scaleLinear } from "d3-scale";
  import { extent, mean, rollup } from "d3-array";

  import Tooltip from "./Tooltip.svelte";
  import { hoveredDatapoint, mouse_x, mouse_y } from "../stores";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";

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

  let yearlyMean = rollup(
    cumulativeData,
    (v) => mean(v, (d) => d.ratio),
    (d) => d.year
  );

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
  const margin = { top: 50, left: 80, right: 30, bottom: 30 };
  let left = (margin.left * 1) / 2;

  $: if (screenWidth <= 860) {
    height = 0.9 * screenHeight;
    width = 0.9 * screenWidth;
    console.log("small");
  } else {
    height = 0.7 * screenHeight;
    width = 0.8 * screenWidth;
    console.log("large");
  }

  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;

  $: yExtent = extent($tweenedY);
  $: xExtent = extent(cumulativeData, (d) => d.year);

  $: xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
  $: yScaleNormal = scaleLinear().domain(yExtent).range([innerHeight, 0]);
  $: yScaleReverse = scaleLinear().domain(yExtent).range([0, innerHeight]);

  $: rectWidth = (innerWidth / uniqueYearsCount) * 0.9;
  $: yScaleTranslate = innerWidth / uniqueMonthsCount / 4;

  // make ticks
  $: xTicks = xScale.ticks(5);
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

  const handleMouseover = function (event, d) {
    console.log("hovered");
    console.log(d);
    hoveredDatapoint.set(d);

    mouse_x.set(event.clientX);
    mouse_y.set(event.clientY);
  };

  const handleMouseout = function () {
    hoveredDatapoint.set(undefined);
  };

  $: console.log($hoveredDatapoint);
</script>

<div class="chart" {width} {height}>
  <svg {width} {height}>
    <g
      height={innerHeight}
      width={innerWidth}
      transform={`translate(${left}, 0)`}
      class="data-plotted"
    >
      {#each cumulativeData as d, index}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <rect
          class:grayedout={showingMeanValues}
          class="mag-chart-rect"
          x={xScale(d.year)}
          y={yScale($tweenedY[index])}
          width={rectWidth}
          height={rectHeightMultiplyingFactor * d.ratio + rectHeightAddition}
          in:fly={{ delay: index * 5 }}
          on:mouseover={function (event) {
            handleMouseover(event, d);
          }}
          on:mouseout={function () {
            handleMouseout();
          }}
        />
      {/each}
    </g>

    {#if showingMeanValues}
      <g
        class="mean-datapoints"
        width={innerWidth}
        height={innerHeight}
        transform={`translate(${left}, 0)`}
        transition:fade
      >
        {#each yearlyMean as d}
          <rect
            class="mean-datapoint"
            x={xScale(d[0])}
            y={yScale(d[1])}
            width={rectWidth}
            height={rectHeightAddition * 1.5}
          />
        {/each}
      </g>
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

  .mag-chart-rect {
    transition: height 0.3s ease, fill-opacity 0.5s ease;
    fill-opacity: 1;
  }

  svg {
    overflow: visible;
  }

  .mag-chart-rect.grayedout {
    fill-opacity: 0.1;
  }
</style>
