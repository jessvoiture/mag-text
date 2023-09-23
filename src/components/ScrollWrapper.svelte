<script>
  import { cubicOut } from "svelte/easing";
  import { currentStep } from "../stores";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  import Image from "./Image.svelte";
  import Scroll from "./Scrolly.svelte";
  import Annotations from "./Annotations.svelte";
  import ScatterplotWrapper from "./ScatterplotWrapper.svelte";
  import { months } from "../stores";

  export let cumulativeData;
  export let contours;
  export let whRatio;
  export let screenHeight;
  export let screenWidth;
  export let guineaPigMag;
  export let dateExtent;

  onMount(() => {
    cumulativeData.sort((a, b) => a.Date - b.Date);
  });

  // scroll
  const steps = [
    // 0
    `<p>Let's start with the magazine cover. In ${
      guineaPigMag.year
    }, Rihanna graced the cover of US Vogue’s ${
      $months[guineaPigMag.month - 1]
    } issue.</p>`,
    // 1
    "<p>Next, let's identify all of the text on the cover excluding the masthead</p>",
    // 2
    "<p>When we remove the background image, we can start to see the skeletal framework of the cover and the relative proportions of text to cover.</p>",
    // 3
    `<p>When we consider the sum of all the text areas compared to the total area of the cover, only around ${Math.round(
      guineaPigMag.ratio * 100,
      0
    )}% is covered by text.</p>`,
    // 4
    "<p>Let’s now look at this ratio for all the covers analysed. </p>",
    // 5 -> w bg, by month
    `<p>Here we have the text-to-cover ratio for all the magazines from ${dateExtent[0]} to ${dateExtent[1]}</p>`,
    // 6 -> remove bg, by month
    "<p>Let's remove the background. This will help us focus just on the relative sizes of the text areas.</p>",
    // 7 -> remove bg, by month
    "<p>We can start to see a trend! More recent covers seem to have less area with text than older covers.</p>",
    // 8 -> plot ratios
    "<p>Now, let's remove month information and look at the plot of text-area ratios by year</p>",
    // 9
    "<p>We can see the downward trend of the amount of text on covers.</p>",
    // 10
    `<p>Let's also plot the yearly average of the text area to cover ratio.</p>`,
    // 11
    `<p>The area covered by text has decreased from an average of ~30% in ${dateExtent[0]} to ~10% in ${dateExtent[1]}.</p>`,
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
    mag_width = 0.9 * screenWidth;
    mag_height = findMagHeight(whRatio, mag_width);
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
  } else if (($currentStep == 6) | ($currentStep == 7)) {
    nowShowing = "chart";
    showingMeanValues = false;
    setRelativeHeightValues();
  } else if (($currentStep == 8) | ($currentStep == 9)) {
    nowShowing = "chart";
    showingMeanValues = false;
    setRatioValues();
  } else if (($currentStep == 10) | ($currentStep == 11)) {
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
        <div class="methods-demo">
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
        <ScatterplotWrapper
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

  <div class="steps-wrapper">
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
</div>

<style>
  .steps-wrapper {
    z-index: 100000;
    position: relative;
  }
  .step {
    height: 110vh;
    display: flex;
    place-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 18px;
    /* position: relative; */
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
    height: auto;
  }

  @media (max-width: 800px) {
    .step-content {
      max-width: 85vw;
    }

    .step {
      position: relative;
    }
  }

  @media (min-width: 800px) {
    .step-content {
      max-width: 30vw;
    }
  }

  .mag-gallery {
    position: sticky;
    margin: auto;
    flex: 1 1 60%;
    top: 0vh;
    height: 100vh;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mag-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .methods-demo {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .annotations-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
