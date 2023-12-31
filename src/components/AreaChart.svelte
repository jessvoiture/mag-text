<script>
  import { extent } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { timeParse, timeFormat } from "d3-time-format";
  import { annotationDates } from "../utils/annotations.js";
  import AxisX from "./AxisX.svelte";

  export let points;

  export let screenHeight;
  export let screenWidth;

  let width;
  let curveWidth = 20;
  let textXTranslate;
  let textAlign;

  const annotationWidth = 150;
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

  let selectedAnnotation = parsedAnnotationDates[0];
  $: startX = xScale(selectedAnnotation.Date);
  $: startY = yScale(selectedAnnotation.Search);
  $: endX = startX + curveWidth * selectedAnnotation.CurveDirection; // use opposite of curve width to change direction
  $: endY = startY - innerHeight * selectedAnnotation.CurveHeightFactor; // change this for longer curve
  $: if (selectedAnnotation.CurveDirection == -1) {
    // curve to the left
    textXTranslate = -annotationWidth - 30;
    textAlign = "end";
  } else {
    // curve to the right
    textXTranslate = 30;
    textAlign = "start";
  }
  $: textYtranslate = innerHeight * selectedAnnotation.CurveHeightFactor + 10;

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
            class:selected={annotationDate == selectedAnnotation}
            cx={xScale(annotationDate.Date)}
            cy={yScale(annotationDate.Search)}
            id={`${xScale(annotationDate.Date)}-circle`}
            r={circleRadius}
            stroke="white"
            fill="white"
            fill-opacity="0.3"
            on:click={(event) => handleEvent(event, annotationDate)}
          />
        {/each}
      </g>

      <g>
        <defs>
          <marker
            id="head"
            orient="auto"
            markerWidth="2"
            markerHeight="4"
            refX="0"
            refY="2"
          >
            <path d="M0,0 V4 L2,2 Z" fill="#fcfdfd" />
          </marker>
        </defs>

        <path
          id="arrow-line"
          marker-end="url(#head)"
          stroke-width="2"
          fill="none"
          stroke="#c1c1c1"
          d="M 0 30 L 0 -30"
        />

        <foreignObject width="60" height="100" x="10" y="-35">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style="width: 60px; font-family: 'encode'; font-size: 10pt; color:#c1c1c1; line-height: 14pt"
            class="axis-label"
          >
            More Interest
          </div>
        </foreignObject>
      </g>

      <g class="annotation" transform="translate(0, -{2 * circleRadius})">
        {#if selectedAnnotation}
          <path
            d="M {startX} {startY} 
                C
                {startX} 
                {startY - 10}

                {startX + selectedAnnotation.AdditionalCurveFactor}
                {endY}

                {endX} 
                {endY}
                "
            stroke="#fcfdfd"
            fill="none"
          />
        {/if}

        <foreignObject
          width={annotationWidth}
          height="40"
          x={xScale(selectedAnnotation.Date)}
          y={yScale(selectedAnnotation.Search)}
          transform="translate({textXTranslate}, -{textYtranslate})"
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style="width: {annotationWidth}px; font-family: 'encode'; font-size: 10pt; color:#dbdbdb; text-align:{textAlign}"
            class="annotation-label"
          >
            <a href={selectedAnnotation.Link} target="_blank"
              >{selectedAnnotation.Person}</a
            >
          </div>
        </foreignObject>
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

  .annotation {
    pointer-events: all;
  }

  .annotation-label {
    font-size: 10pt;
    line-height: 14pt;
    font-family: "encode";
    fill: #c4c4c4;
    color: #180e0d;
  }

  .selected {
    fill: #f7a4f6;
    stroke: #f7a4f6;
    z-index: 999;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
