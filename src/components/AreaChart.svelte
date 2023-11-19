<script>
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { timeParse, timeFormat } from "d3-time-format";
  import CurvedLine from "./CurvedLine.svelte";
  import { annotationDates } from "../utils/annotations.js";

  export let points;
  export let xKey;
  export let yKey;

  export let screenHeight;
  export let screenWidth;

  let width;
  let mouseX;
  let mouseY;

  const circleRadius = 7;

  const annotationDatesJoined = annotationDates.map((annotation) => {
    const match = points.find((item) => item.Date === annotation.Date);
    return match ? { ...annotation, ...match } : annotation;
  });

  const parseDate = timeParse("%Y-%m-%d");
  const parsedPoints = points.map((d) => ({
    ...d,
    [xKey]: parseDate(d[xKey]),
  }));

  const formatTick = timeFormat("%b %Y");

  const parsedAnnotationDates = annotationDatesJoined.map((d) => ({
    ...d,
    [xKey]: parseDate(d[xKey]),
  }));

  const padding = { top: 100, right: 15, bottom: 30, left: 15 };

  let selectedAnnotation = undefined;

  $: height = screenHeight * 0.4;

  $: if (screenWidth >= 860) {
    width = 0.5 * screenWidth;
  } else {
    width = 0.85 * screenWidth;
  }

  $: innerWidth = width - padding.left - padding.right;
  $: innerHeight = height - padding.top - padding.bottom;

  $: xExtent = extent(parsedPoints, (d) => d[xKey]);
  $: yExtent = extent(parsedPoints, (d) => d[yKey]);

  $: xScale = scaleTime().domain(xExtent).range([0, innerWidth]);
  $: yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

  $: minX = xExtent[0];
  $: maxX = xExtent[1];

  $: path = `M${parsedPoints
    .map((p) => `${xScale(p[xKey])},${yScale(p[yKey])}`)
    .join("L")}`;

  $: area = `${path}L${xScale(maxX)},${innerHeight}L${xScale(
    minX
  )},${innerHeight}Z`;

  $: xTickCount = Math.floor(innerWidth / 100);

  $: xTicks = xScale.ticks(xTickCount);

  function handleEvent(event, annotation) {
    selectedAnnotation = annotation;
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function handleMouseout() {
    selectedAnnotation = undefined;
  }

  function getTextPosition(annotation) {
    return {
      x: xScale(annotation.Date) + 10, // adjust offset as needed
      y: yScale(annotation[yKey]) - 20, // adjust offset as needed
    };
  }
</script>

<svg {width} {height} class="area-chart">
  <g
    height={innerHeight}
    width={innerWidth}
    transform="translate({padding.left}, {padding.top})"
  >
    <g class="chart">
      <path class="path-area" d={area} />
      <path class="path-line" d={path} />
    </g>

    <g class="annotations-circles">
      {#each parsedAnnotationDates as annotationDate}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <circle
          cx={xScale(annotationDate.Date)}
          cy={yScale(annotationDate[yKey])}
          id={`${annotationDate.Date}-circle`}
          r={circleRadius}
          stroke="white"
          fill="white"
          fill-opacity="0.5"
          on:click={(event) => handleEvent(event, annotationDate)}
        />
      {/each}
    </g>

    <!-- <g class="annotation">
      {#if selectedAnnotation}
        <text
          class="annotation-label"
          x={getTextPosition(selectedAnnotation).x}
          y={getTextPosition(selectedAnnotation).y}
        >
          {selectedAnnotation.Person}
        </text>
      {/if}
    </g> -->
  </g>
</svg>

{#if selectedAnnotation != undefined}
  <div class="annotation-wrapper">
    <div
      class="annotation-label"
      style="left: {mouseX}px; 
             top: {mouseY + selectedAnnotation.yTranslate}px;
             width: 160px"
    >
      {#if selectedAnnotation.Bottom}
        <CurvedLine
          path={selectedAnnotation.Path}
          height={selectedAnnotation.Height}
        />
      {/if}

      <div class="annotation-text">
        {selectedAnnotation.Person}
      </div>

      {#if !selectedAnnotation.Bottom}
        <CurvedLine
          path={selectedAnnotation.Path}
          height={selectedAnnotation.Height}
        />
      {/if}
    </div>
  </div>
{/if}

<style>
  .path-line {
    fill: none;
    stroke: rgb(182, 182, 182);
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }

  .path-area {
    fill: rgba(244, 244, 244, 0.2);
  }

  svg {
    overflow: visible;
  }

  .hovered {
    fill: #f7a4f6;
    stroke: #f7a4f6;
  }

  .annotation-label {
    position: fixed;
    font-size: 10pt;
    line-height: 14pt;
    font-family: "encode";
    color: #c4c4c4;
  }

  .annotation-wrapper {
    position: relative;
  }

  .annotation-text {
    background-color: #180e0d;
    margin-left: 30px;
  }
</style>
