<script>
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { timeParse, timeFormat } from "d3-time-format";
  import { onMount } from "svelte";
  import { annotationDates } from "../utils/annotations.js";
  import AxisX from "./AxisX.svelte";

  export let points;

  export let screenHeight;
  export let screenWidth;

  let width;
  let curveHeight = 30;
  let curveWidth = 20;

  const circleRadius = 7;

  const annotationDatesJoined = annotationDates.map((annotation) => {
    const match = points.find((item) => item.Date === annotation.Date);
    return match ? { ...annotation, ...match } : annotation;
  });

  const parseDate = timeParse("%Y-%m-%d");
  const parsedPoints = points.map((d) => ({
    ...d,
    Date: parseDate(d.Date),
  }));

  const formatTick = timeFormat("%Y");

  const parsedAnnotationDates = annotationDatesJoined.map((d) => ({
    ...d,
    Date: parseDate(d.Date),
  }));

  const padding = { top: 100, right: 15, bottom: 30, left: 15 };

  $: height = screenHeight * 0.4;

  $: if (screenWidth >= 860) {
    width = 0.5 * screenWidth;
  } else {
    width = 0.85 * screenWidth;
  }

  $: innerWidth = width - padding.left - padding.right;
  $: innerHeight = height - padding.top - padding.bottom;

  $: xExtent = extent(parsedPoints, (d) => d.Date);
  $: yExtent = extent(parsedPoints, (d) => d.Search);

  $: xScale = scaleTime().domain(xExtent).range([0, innerWidth]);
  $: yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

  $: minX = xExtent[0];
  $: maxX = xExtent[1];

  $: path = `M${parsedPoints
    .map((p) => `${xScale(p.Date)},${yScale(p.Search)}`)
    .join("L")}`;

  $: area = `${path}L${xScale(maxX)},${innerHeight}L${xScale(
    minX
  )},${innerHeight}Z`;

  $: xTickCount = Math.floor(innerWidth / 100);

  $: xTicks = xScale.ticks(xTickCount);

  let selectedAnnotation = parsedAnnotationDates[1];
  $: startX = xScale(selectedAnnotation.Date);
  $: startY = yScale(selectedAnnotation.Search);
  $: endX = startX + curveWidth;
  $: endY = startY - curveHeight;

  function handleEvent(_event, annotation) {
    selectedAnnotation = annotation;
  }
</script>

<div class="chart-container" style="position: relative;">
  <svg {width} {height} class="area-chart">
    <g
      height={innerHeight}
      width={innerWidth}
      transform="translate({padding.left}, {padding.top})"
      id="chart-wrapper"
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
            cy={yScale(annotationDate.Search)}
            id={`${xScale(annotationDate.Date)}-circle`}
            r={circleRadius}
            stroke="white"
            fill="white"
            fill-opacity="0.5"
            on:click={(event) => handleEvent(event, annotationDate)}
          />
        {/each}
      </g>

      <g class="annotation" transform="translate(0, -{2 * circleRadius})">
        {#if selectedAnnotation}
          <path
            d="M {startX} {startY} 
                C
                {startX}
                {startY - 10}

                {startX}
                {endY}

                {endX}
                {endY}
                "
            stroke="#c4c4c4"
            fill="none"
          />
        {/if}

        <text
          class="annotation-label"
          x={xScale(selectedAnnotation.Date)}
          y={yScale(selectedAnnotation.Search)}
          transform="translate({curveWidth + 5}, -{curveHeight - 6})"
        >
          {selectedAnnotation.Person}
        </text>
      </g>

      <g class="x-axis axis">
        <AxisX
          marginUnit={padding.left}
          {xTicks}
          height={innerHeight + padding.bottom}
          {xScale}
          {formatTick}
        />
      </g>
    </g>
  </svg>
</div>

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

  .annotation-label {
    font-size: 10pt;
    line-height: 14pt;
    font-family: "encode";
    fill: #c4c4c4;
    color: #180e0d;
  }
</style>
