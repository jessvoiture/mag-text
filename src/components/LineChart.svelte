<script>
  import { scaleLinear } from "d3-scale";
  import { extent, mean, rollup } from "d3-array";
  import { line, curveBasis } from "d3-shape";
  import { format } from "d3-format";
  import { tweened } from "svelte/motion";
  import { onMount } from "svelte";

  import AxisX from "./AxisX.svelte";
  import Rectangle from "./Rectangle.svelte";

  export let cumulativeData;
  export let screenHeight;
  export let screenWidth;
  export let currentStep;

  onMount(() => {
    currentStep == 0;
  });

  const yearRanges = [
    { start: 2000, end: 2006 },

    { start: 2006, end: 2016 },
    { start: 2018, end: 2022 },
  ];

  const margin = { top: 15, left: 15, bottom: 40, right: 15 };
  const formatTick = format(".0f");

  let yearlyMean = rollup(
    cumulativeData,
    (v) => mean(v, (d) => d.ratio),
    (d) => d.year
  );

  let rectangle = tweened({
    start: yearRanges[0].start,
    end: yearRanges[0].end,
  });

  $: width = 0.15 * screenWidth;
  $: height = 0.2 * screenHeight;
  $: innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;

  $: yExtent = extent(cumulativeData, (d) => d.ratio);
  $: xExtent = extent(cumulativeData, (d) => d.year);

  $: yMax = yExtent[1];

  $: xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
  $: yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

  $: xTickCount = 1;
  $: xTicks = xScale.ticks(xTickCount);

  $: pathLine = line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
    .curve(curveBasis);

  $: if (currentStep == 0) {
    setRectangleRange(0);
  } else if (currentStep == 1) {
    setRectangleRange(1);
  } else if (currentStep == 2) {
    setRectangleRange(2);
  }

  const setRectangleRange = function (index) {
    rectangle.set({
      start: yearRanges[index].start,
      end: yearRanges[index].end,
    });
  };
</script>

<div class="chart-title">Text Coverage (%)</div>
<svg {width} {height}>
  <g
    width={innerWidth}
    height={innerHeight}
    transform="translate({margin.left}, {margin.top})"
  >
    <g class="minimap-rectangle">
      <Rectangle {rectangle} {innerHeight} {xScale} />
    </g>

    <g class="minimap-path">
      <path d={pathLine(yearlyMean)} />
    </g>
  </g>

  <AxisX
    marginUnit={margin.left}
    {xTicks}
    height={innerHeight + margin.bottom}
    {xScale}
    {formatTick}
  />
</svg>

<style>
  path {
    stroke: white;
    stroke-width: 1;
    fill: none;
    stroke-linecap: round;
  }

  .chart-title {
    font-size: 12pt;
    color: #e1e1e1;
    text-transform: capitalize;
  }
</style>
