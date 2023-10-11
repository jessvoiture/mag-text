<script>
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";

  import Image from "./Image.svelte";
  import Scroll from "./Scrolly.svelte";
  import Annotations from "./Annotations.svelte";
  import Dropdown from "./Dropdown.svelte";

  export let cumulativeData;
  export let contours;
  export let whRatio;
  export let screenHeight;
  export let screenWidth;
  export let guineaPigMag;

  let nowShowing;

  let stepWidth;
  let mag_height;
  let mag_width;

  let contourTweenedY;
  let contourTweenedX;
  let contourTweenedH;
  let contourTweenedW;

  let currentStep = 0;
  let steps = [];

  let tweenSettings = {
    duration: 1000,
    easing: cubicOut,
  };

  let showingImage = true;
  let showingAnnotations = false;

  // scroll steps
  $: steps = [
    // 0
    ``,
    // 1
    "<p>Next, let's identify all of the text on the cover excluding the Vogue masthead</p>",
    // 2
    "<p>Removing the background image reveals a very bare-boned wire-frame of the magazine. We can start to see the relative proportions of text to cover</p>",
    // 3
    `<p>When we compare the sum of all the text areas compared to the total area of the cover, around ${Math.round(
      guineaPigMag.ratio * 100,
      0
    )}% is covered by text. Let's call this number a magazine's text coverage</p>`,
  ];

  $: screenRatio = screenWidth / screenHeight;

  //  determine which dimension to use for magazines
  // if screen size is tall and narrow (ie W:H ratio for screen < magazine then use width as limiting dimension)
  //  if screen size is short and wide (ie W:H ratio for screen > magazine then use height as limiting dimension)
  $: if (screenRatio <= whRatio) {
    mag_width = 0.9 * screenWidth;
    mag_height = findMagHeight(whRatio, mag_width);
  } else {
    mag_height = 0.7 * screenHeight;
    mag_width = findMagWidth(whRatio, mag_height);
  }

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

  // scrolly stuff
  $: if (currentStep == 0) {
    // initial frame of just the magazine
    nowShowing = "ratios";
    showingImage = true;
    showingAnnotations = false;
  } else if (currentStep == 1) {
    // magazine + contours
    nowShowing = "ratios";
    showingImage = true;
    showingAnnotations = true;
    setContoursOnMag();
  } else if (currentStep == 2) {
    // contours
    nowShowing = "ratios";
    showingImage = false;
    showingAnnotations = true;
    setContoursOnMag();
  } else if (currentStep == 3) {
    // contour area as percent of total mag area
    nowShowing = "ratios";
    showingImage = false;
    showingAnnotations = true;
    setContoursRatio();
  } else if (currentStep == 4) {
    // contour area as percent of total mag area
    nowShowing = "ratios";
    showingImage = false;
    showingAnnotations = true;
    setContoursRatio();
  }

  // annotations: tweened values for when contours are in og pos on mag
  const setContoursOnMag = () => {
    contourTweenedY.set(contours.map((d) => d.y_pct));
    contourTweenedX.set(contours.map((d) => d.x_pct));
    contourTweenedH.set(contours.map((d) => d.h_pct));
    contourTweenedW.set(contours.map((d) => d.w_pct));
  };

  // annotations: tweened values for when contours are lumped together in one big area
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
  <!-- main content -->
  <div class="mag-gallery">
    <div class="mag-wrapper">
      {#if nowShowing == "ratios"}
        <div class="methods-demo">
          {#if showingImage}
            <div class="all-original-covers all-covers" transition:fade>
              <!-- cover image -->
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
              <!-- contours -->
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
    </div>
  </div>

  <!-- scrolly steps-->
  <div class="steps-wrapper" class:first={currentStep == 0}>
    <Scroll bind:value={currentStep}>
      {#each steps as text, i}
        <div class="step" class:active={currentStep === i}>
          <div class="step-content" width={stepWidth}>
            {#if i === 0}
              <p>
                <span class="inline-dropdown">
                  <Dropdown options={cumulativeData} />
                </span>
              </p>
            {:else}
              {@html text}
            {/if}
          </div>
        </div>
      {/each}
    </Scroll>
  </div>
</div>

<style>
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

  .inline-dropdown {
    display: inline;
  }

  .first {
    pointer-events: all;
  }
</style>
