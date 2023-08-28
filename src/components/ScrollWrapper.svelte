<script>
  import { cubicOut } from "svelte/easing";
  import { currentStep } from "../stores";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";

  import Image from "./Image.svelte";
  import Scroll from "./Scrolly.svelte";
  import Annotations from "./Annotations.svelte";
  import ScatterplotMain from "./ScatterplotMain.svelte";

  export let cumulativeData;
  export let contours;
  export let whRatio;
  export let screenHeight;
  export let screenWidth;
  export let guineaPigMag;

  console.log(cumulativeData);
  console.log(contours);
  console.log(guineaPigMag);

  // scroll
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

  let nowShowing;

  let stepWidth;
  let mag_height;
  let mag_width;

  let tweenedY;
  let contourTweenedY;
  let contourTweenedX;
  let contourTweenedH;
  let contourTweenedW;

  let tweenSettings = {
    duration: 1000,
    easing: cubicOut,
  };

  let showingMeanValues = false;
  let showingImage = true;
  let showingAnnotations = false;

  let yVals = "month";

  $: screenRatio = screenWidth / screenHeight;

  $: if (screenRatio <= whRatio) {
    mag_height = findMagHeight(whRatio, mag_width);
    mag_width = 0.9 * screenWidth;
  } else {
    mag_height = 0.7 * screenHeight;
    mag_width = findMagWidth(whRatio, mag_height);
  }

  $: tweenedY = tweened(cumulativeData.map((d) => d.month));

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

  $: if ($currentStep == 0) {
    nowShowing = "ratios";
    showingImage = true;
    showingAnnotations = false;
  } else if ($currentStep == 1) {
    nowShowing = "ratios";
    showingImage = true;
    showingAnnotations = true;
    setContoursOnMag();
  } else if ($currentStep == 2) {
    nowShowing = "ratios";
    showingImage = false;
    showingAnnotations = true;
    setContoursOnMag();
  } else if ($currentStep == 3) {
    nowShowing = "ratios";
    showingImage = false;
    showingAnnotations = true;
    setContoursRatio();
  } else if ($currentStep == 4) {
    nowShowing = "ratios";
    showingImage = false;
    showingAnnotations = true;
    setContoursRatio();
  } else if ($currentStep == 5) {
    nowShowing = "chart";
    showingMeanValues = false;
    showingAnnotations = false;
    setMonthValues();
  } else if ($currentStep == 6) {
    nowShowing = "chart";
    showingMeanValues = false;
    setRelativeHeightValues();
  } else if ($currentStep == 7) {
    nowShowing = "chart";
    showingMeanValues = false;
    setRatioValues();
  } else if ($currentStep == 8) {
    nowShowing = "chart";
    showingMeanValues = true;
    setRatioValues();
  }

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

  function findMagHeight(ratio, mag_width) {
    const h = mag_width * (1 / ratio);
    return h;
  }

  function findMagWidth(ratio, mag_height) {
    const w = mag_height * ratio;
    return w;
  }
</script>

<div class="scroller">
  <div class="mag-gallery">
    <div class="mag-wrapper">
      {#if nowShowing == "ratios"}
        <div class="methods-demo" width={mag_width} height={mag_height}>
          {#if showingImage}
            <div class="all-original-covers all-covers" transition:fade>
              <Image
                {guineaPigMag}
                {mag_width}
                {mag_height}
                type={"original"}
                imagePathEnding={".jpg"}
                alt={"Vogue magazine cover"}
              />
            </div>
          {/if}

          {#if showingAnnotations}
            <div class="annotations-wrapper">
              <Annotations
                {mag_height}
                {mag_width}
                {showingImage}
                {contours}
                {contourTweenedH}
                {contourTweenedY}
                {contourTweenedX}
                {contourTweenedW}
              />
            </div>
          {/if}
        </div>
      {/if}

      {#if nowShowing == "chart"}
        <ScatterplotMain
          {screenHeight}
          {screenWidth}
          {cumulativeData}
          {showingMeanValues}
          {yVals}
          {tweenedY}
        />
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

  .scroller {
    z-index: 1;
  }

  .methods-demo {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .annotations-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
