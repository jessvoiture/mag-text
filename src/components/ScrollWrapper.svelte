<script>
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { group, extent, rollup, mean } from "d3-array";
  import { currentStep, nowShowing } from "../stores";
  import { scaleLinear } from "d3-scale";
  import { tweened } from "svelte/motion";
  import { timeParse } from "d3-time-format";

  import Image from "./Image.svelte";
  import Scroll from "./Scrolly.svelte";

  export let data;
  export let screenHeight;
  export let screenWidth;
  export let screenRatio;

  let mags = data.magazines;
  const contours = data.contours;

  let width;
  let stepWidth;
  let mag_height;
  let mag_width;

  let tweenedY;
  let contourTweenedY;
  let contourTweenedX;
  let contourTweenedH;
  let contourTweenedW;

  let rectHeightMultiplyingFactor;
  let rectHeightAddition;
  let rectTranslation;
  let mouse_x, mouse_y;
  let yTickCount;
  let contourWidthFactor = 1;
  let tweenSettings = {
    duration: 1000,
    easing: cubicOut,
  };
  let showingMeanValues = false;
  let showingImage = true;
  let annotationBackgroundCapacity = "0.7";
  let magOpacity = 1;
  let showingAnnotations = false;

  const margin = { top: 30, left: 30, right: 30, bottom: 30 };

  $: screenRatio = screenWidth / screenHeight;

  $: height = 0.8 * screenHeight;
  $: width = 0.8 * screenWidth;

  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;

  const parseYear = timeParse("%Y");

  let yearlyMean = rollup(
    mags,
    (v) => mean(v, (d) => d.ratio),
    (d) => d.year
  );

  console.log(yearlyMean);

  // Sort the magazines array based on the Date
  let sortedMagazines = [...mags]
    .sort((a, b) => a.Date - b.Date)
    .filter((d) => d.Date == 20110901);

  let guineaPigMag = sortedMagazines[0];
  let whRatio = guineaPigMag.wh_ratio;

  $: if (screenRatio <= whRatio) {
    mag_height = findMagHeight(whRatio, mag_width);
    mag_width = 0.9 * screenWidth;
  } else {
    mag_height = 0.7 * screenHeight;
    mag_width = findMagWidth(whRatio, mag_height);
  }

  mags.sort((a, b) => a.Date - b.Date);

  let yVals = "month";
  let hoveredDatapoint = undefined;
  let ratioExtent = extent(mags, (d) => d.ratio);
  let ratioMax = ratioExtent[1];

  const groupedMags = group(mags, (d) => d.year);
  const cumulativeData = [];

  groupedMags.forEach((values) => {
    let cumulativeSum = 0;
    values.forEach((d) => {
      cumulativeSum += d.ratio;
      cumulativeData.push({ ...d, total: cumulativeSum });
    });
  });

  contours.sort((a, b) => a.y - b.y);
  const totalContourArea = contours.reduce(
    (acc, curr) => acc + curr.w * curr.h,
    0
  );

  let cumulativeAreaProportion = 0;

  contours.forEach((item) => {
    item.areaProportion =
      ((item.w * item.h) / totalContourArea) * guineaPigMag.ratio * 100;
    item.cumulativeAreaProportion = cumulativeAreaProportion;
    cumulativeAreaProportion += item.areaProportion;
  });

  $: tweenedY = tweened(cumulativeData.map((d) => d.month));
  $: rectWidth = (innerWidth / 14) * 0.9;
  $: yScaleTranslate = innerWidth / 12 / 4;

  $: contourTweenedY = tweened(
    contours.map((d) => d.y_pct),
    tweenSettings
  );
  $: contourTweenedX = tweened(
    contours.map((d) => d.x_pct),
    tweenSettings
  );
  $: contourTweenedH = tweened(
    contours.map((d) => d.h_pct),
    tweenSettings
  );
  $: contourTweenedW = tweened(
    contours.map((d) => d.w_pct),
    tweenSettings
  );

  const setRatioValues = function () {
    yVals = "ratio";
    tweenedY.set(cumulativeData.map((d) => d.ratio));
  };

  const setMonthValues = function () {
    yVals = "month";
    tweenedY.set(cumulativeData.map((d) => d.month));
  };

  const setRelativeHeightValues = () => {
    yVals = "relative";
    tweenedY.set(cumulativeData.map((d) => d.month));
  };

  const setContoursOnMag = () => {
    contourTweenedY.set(contours.map((d) => d.y_pct));
    contourTweenedX.set(contours.map((d) => d.x_pct));
    contourTweenedH.set(contours.map((d) => d.h_pct));
    contourTweenedW.set(contours.map((d) => d.w_pct));
  };

  const setContoursRatio = () => {
    contourTweenedY.set(contours.map((d) => d.cumulativeAreaProportion));
    contourTweenedX.set(contours.map(() => 0));
    contourTweenedH.set(contours.map((d) => d.areaProportion + 1));
    contourTweenedW.set(contours.map(() => 100));
  };

  $: yExtent = extent($tweenedY);
  $: xExtent = extent(mags, (d) => d.year);

  let yScale = yScaleNormal;
  $: xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
  $: yScaleNormal = scaleLinear().domain(yExtent).range([innerHeight, 0]);
  $: yScaleReverse = scaleLinear().domain(yExtent).range([0, innerHeight]);

  $: contourXScale = scaleLinear().domain([0, 100]).range([0, mag_width]);
  $: contourYScale = scaleLinear().domain([100, 0]).range([mag_height, 0]);

  $: if (yVals == "month") {
    rectHeightMultiplyingFactor = innerHeight / 12;
    rectHeightAddition = 0;
    rectTranslation = innerHeight / 12;
    yTickCount = 12;
    yScale = yScaleReverse;
  } else if (yVals == "relative") {
    rectHeightMultiplyingFactor = innerHeight / 12 / ratioMax;
    rectHeightAddition = 0;
    rectTranslation = innerHeight / 12;
    yTickCount = 12;
    yScale = yScaleReverse;
  } else if (yVals == "ratio") {
    rectHeightMultiplyingFactor = 0;
    rectHeightAddition = 2;
    rectTranslation = 0;
    yTickCount = 4;
    yScale = yScaleNormal;
  }

  // make ticks
  $: xTicks = xScale.ticks(5);
  $: yTicks = yScale.ticks(yTickCount);

  const setMousePosition = function (event) {
    mouse_x = event.clientX;
    mouse_y = event.clientY;
  };

  // scroll
  // let currentStep = 0;
  const steps = [
    "<p>In [year], [person] graced the cover of Vogue’s [Month] issue.</p>",
    "<p>Next, we can identify all of the text areas on the cover excluding the title</p>",
    "<p>When we remove the background image, we can start to see the skeleton of the cover and the relative proportions of text to cover.</p>",
    "<p>The ratio of the text areas to the whole cover is [ratio]. In other words, [percent] of the cover is covered by text.</p>",
    "<p>Let’s now look at this ratio for all the covers analysed. </p>",
    "<p>this is the data by month</p>",
    "<p>this is the data by month but the heights are better</p>",
    "<p>this is the data as a scatterplot</p>",
    "<p>here are the averages</p>",
  ];

  $: if ($currentStep == 0) {
    nowShowing.set("ratios");
    showingImage = true;
    showingAnnotations = false;
  } else if ($currentStep == 1) {
    nowShowing.set("ratios");
    showingImage = true;
    showingAnnotations = true;
    setContoursOnMag();
  } else if ($currentStep == 2) {
    nowShowing.set("ratios");
    showingImage = false;
    annotationBackgroundCapacity = "1";
    showingAnnotations = true;
    setContoursOnMag();
  } else if ($currentStep == 3) {
    nowShowing.set("ratios");
    showingImage = false;
    annotationBackgroundCapacity = "1";
    contourWidthFactor = mag_width;
    showingAnnotations = true;
    setContoursRatio();
  } else if ($currentStep == 4) {
    nowShowing.set("ratios");
    showingImage = false;
    annotationBackgroundCapacity = 1;
    contourWidthFactor = mag_width;
    showingAnnotations = true;
    setContoursRatio();
  } else if ($currentStep == 5) {
    nowShowing.set("chart");
    showingMeanValues = false;
    magOpacity = 1;
    showingAnnotations = false;
    setMonthValues();
  } else if ($currentStep == 6) {
    nowShowing.set("chart");
    showingMeanValues = false;
    magOpacity = 1;
    setRelativeHeightValues();
  } else if ($currentStep == 7) {
    nowShowing.set("chart");
    showingMeanValues = false;
    magOpacity = 1;
    setRatioValues();
  } else if ($currentStep == 8) {
    nowShowing.set("chart");
    showingMeanValues = true;
    magOpacity = 0.1;
    setRatioValues();
  }

  function findMagHeight(ratio, mag_width) {
    const h = mag_width * (1 / ratio);
    return h;
  }

  function findMagWidth(ratio, mag_height) {
    const w = mag_height * ratio;
    return w;
  }
</script>

<div width={mag_width} style="background-color: black;" />

<div class="scroller">
  <div class="mag-gallery">
    <div class="mag-wrapper">
      {#if $nowShowing == "ratios"}
        {#if showingImage}
          <div class="all-original-covers all-covers" transition:fade>
            <Image
              {sortedMagazines}
              {mag_width}
              {mag_height}
              type={"original"}
              imagePathEnding={".jpg"}
              alt={"Vogue magazine cover"}
            />
          </div>
        {/if}

        {#if showingAnnotations}
          <svg
            height={mag_height}
            width={mag_width}
            class="all-annotated-covers all-covers"
            transition:fade
          >
            <g>
              <rect
                x="0"
                y="0"
                width={mag_width}
                height={mag_height}
                fill="white"
                opacity={annotationBackgroundCapacity}
              />
            </g>

            <g>
              {#each contours as contour, index}
                <rect
                  x={contourXScale($contourTweenedX[index])}
                  y={contourYScale($contourTweenedY[index])}
                  width={contourXScale($contourTweenedW[index])}
                  height={contourYScale($contourTweenedH[index])}
                  fill="black"
                />
              {/each}
            </g>
          </svg>
        {/if}
      {/if}

      {#if $nowShowing == "chart"}
        <div class="chart" {width} {height}>
          <svg {width} {height}>
            <g
              height={innerHeight}
              width={innerWidth}
              transform="translate({margin.left}, {margin.top})"
            >
              {#each cumulativeData as d, index}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <rect
                  class:grayedout={showingMeanValues}
                  class="mag-chart-rect"
                  x={xScale(d.year)}
                  y={yScale($tweenedY[index]) - rectTranslation}
                  width={rectWidth}
                  height={rectHeightMultiplyingFactor * d.ratio +
                    rectHeightAddition}
                  in:fly={{ delay: index * 5 }}
                  on:mouseover={function (event) {
                    hoveredDatapoint = d;
                    setMousePosition(event);
                  }}
                  on:mouseout={function () {
                    hoveredDatapoint = undefined;
                  }}
                />
              {/each}
            </g>

            {#if showingMeanValues}
              <g
                class="mean-datapoints"
                width={innerWidth}
                height={innerHeight}
                transform="translate({margin.left}, {margin.top})"
                transition:fade
              >
                {#each yearlyMean as d}
                  <rect
                    class="mean-datapoint"
                    x={xScale(d[0])}
                    y={yScale(d[1])}
                    width={rectWidth}
                    height={rectHeightAddition}
                    fill="red"
                  />
                {/each}
              </g>
            {/if}

            <g transform="translate({margin.left},0)">
              {#each xTicks as tick}
                <g transform="translate({xScale(tick)}, 0)">
                  <text y={height}>{tick}</text>
                </g>
              {/each}
            </g>

            <g transform="translate(0, {margin.top})">
              {#each yTicks as tick}
                <g
                  class="tick"
                  transform="translate(0, {yScale(tick) - yScaleTranslate})"
                >
                  <text>{tick}</text>
                </g>
              {/each}
            </g>
          </svg>
        </div>

        {#if hoveredDatapoint != undefined}
          <div
            class="tooltip"
            width="30"
            height="auto"
            style="left: {mouse_x + 10}px; top: {mouse_y - 10}px"
          >
            <p>{hoveredDatapoint.Date}</p>
            <p>{Math.round(hoveredDatapoint.ratio * 100)}</p>
          </div>
        {/if}
      {/if}
    </div>
  </div>

  <Scroll bind:value={$currentStep}>
    {#each steps as text, i}
      <div class="step" class:active={$currentStep === i}>
        <div class="step-content" width={stepWidth}>
          {@html text}
        </div>
      </div>
    {/each}
  </Scroll>
</div>

<style>
  .step {
    height: 110vh;
    display: flex;
    place-items: center;
    justify-content: center;
    z-index: 999;
  }

  .step-content {
    background: whitesmoke;
    color: #ccc;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    transition: background 500ms ease;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    z-index: 999;
    height: auto;
  }

  @media (max-width: 800px) {
    .step-content {
      max-width: 85vw;
    }
  }

  @media (min-width: 800px) {
    .step-content {
      max-width: 30vw;
    }
  }

  .step.active .step-content {
    background: white;
    color: black;
  }

  .mag-gallery {
    position: sticky;
    margin: auto;
    flex: 1 1 60%;
    top: 0vh;
    height: 100vh;
    z-index: 1;
  }

  .mag-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .all-covers,
  .chart {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .chart {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .all-annotated-covers {
    opacity: 0.7;
  }

  .all-covers {
    display: flex;
    flex-wrap: wrap;
    align-self: center;
    justify-content: center;
    column-gap: 40px;
  }

  /* svg {
      overflow: visible;
      z-index: 999;
    } */

  .tooltip {
    position: fixed;
    background-color: white;
    padding: 3px;
    border: solid 1px;
  }

  p {
    margin: 0;
  }

  .mag-chart-rect {
    transition: height 0.3s ease, fill-opacity 0.5s ease;
    fill-opacity: 1;
  }

  svg {
    overflow: visible;
  }

  .scroller {
    z-index: 1;
  }

  .mag-chart-rect.grayedout {
    fill-opacity: 0.1;
  }
</style>
