<script>
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";

  import Image from "./Image.svelte";
  import Scroll from "./Scrolly.svelte";
  import Annotations from "./Annotations.svelte";
  import Caption from "./Caption.svelte";

  export let cumulativeData;
  export let screenHeight;
  export let screenWidth;

  let sortedMagazines = [...cumulativeData].sort((a, b) => a.Date - b.Date);

  let nowShowing;

  let stepWidth;
  let mag_height;
  let mag_width;
  let guineaPigMagList;

  let contourTweenedY_1;
  let contourTweenedX_1;
  let contourTweenedH_1;
  let contourTweenedW_1;
  let contourTweenedY_2;
  let contourTweenedX_2;
  let contourTweenedH_2;
  let contourTweenedW_2;

  const guineaPigMag_1 = sortedMagazines.find((d) => d.Date == 20110401);
  const guineaPigMag_2 = sortedMagazines.find((d) => d.Date == 20220501);

  let contours_1 = guineaPigMag_1.contours;
  let contours_2 = guineaPigMag_2.contours;

  let totalContourArea_1 = calculateTotalContourArea(contours_1);
  let totalContourArea_2 = calculateTotalContourArea(contours_2);

  contours_1 = sortContoursByY(contours_1);
  contours_2 = sortContoursByY(contours_2);

  contours_1 = calculateContourProportions(
    contours_1,
    totalContourArea_1,
    guineaPigMag_1.ratio
  );
  contours_2 = calculateContourProportions(
    contours_2,
    totalContourArea_2,
    guineaPigMag_2.ratio
  );

  const whRatio = guineaPigMag_1.wh_ratio;

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
    `<p>Let's compare Rihanna's May 2022 cover with her first US Vogue cover in April 2011</p>`,
    // 1
    "<p>We'll start by identifying all of the text on the covers excluding the Vogue masthead</p>",
    // 2
    "<p>Next, we can remove the background image and look at the wireframe for each cover. We can start to see the relative proportions of text to cover</p>",
    // 3
    `<p>Now, let's consider the total area covered by text compared to the total area of the cover. Around ${Math.round(
      guineaPigMag_1.ratio * 100,
      0
    )}% of the 2011 cover was covered by text. In 2022, that percentage dipped to just ${Math.round(
      guineaPigMag_2.ratio * 100,
      0
    )}%</p>`,
  ];

  //  determine which dimension to use for magazines
  // if screen size is tall and narrow (ie W:H ratio for screen < magazine then use width as limiting dimension)
  //  if screen size is short and wide (ie W:H ratio for screen > magazine then use height as limiting dimension)
  $: if (screenWidth <= 860) {
    mag_height = 0.4 * (screenHeight - 24);
    mag_width = findMagWidth(whRatio, mag_height);
  } else {
    mag_width = 0.25 * (screenWidth - 96);
    mag_height = findMagHeight(whRatio, mag_width);
  }

  $: contourTweenedY_1 = tweened(
    contours_1.map((d) => d.y_pct),
    tweenSettings
  );

  $: contourTweenedX_1 = tweened(
    contours_1.map((d) => d.x_pct),
    tweenSettings
  );

  $: contourTweenedH_1 = tweened(
    contours_1.map((d) => d.h_pct),
    tweenSettings
  );

  $: contourTweenedW_1 = tweened(
    contours_1.map((d) => d.w_pct),
    tweenSettings
  );

  $: contourTweenedY_2 = tweened(
    contours_2.map((d) => d.y_pct),
    tweenSettings
  );

  $: contourTweenedX_2 = tweened(
    contours_2.map((d) => d.x_pct),
    tweenSettings
  );

  $: contourTweenedH_2 = tweened(
    contours_2.map((d) => d.h_pct),
    tweenSettings
  );

  $: contourTweenedW_2 = tweened(
    contours_2.map((d) => d.w_pct),
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

  $: guineaPigMagList = [
    {
      Date: guineaPigMag_1.Date,
      year: guineaPigMag_1.year,
      month: guineaPigMag_1.month,
      ratio: guineaPigMag_1.ratio,
      contours: contours_1,
      contourTweenedX: contourTweenedX_1,
      contourTweenedY: contourTweenedY_1,
      contourTweenedW: contourTweenedW_1,
      contourTweenedH: contourTweenedH_1,
    },
    {
      Date: guineaPigMag_2.Date,
      year: guineaPigMag_2.year,
      month: guineaPigMag_2.month,
      ratio: guineaPigMag_2.ratio,
      contours: contours_2,
      contourTweenedX: contourTweenedX_2,
      contourTweenedY: contourTweenedY_2,
      contourTweenedW: contourTweenedW_2,
      contourTweenedH: contourTweenedH_2,
    },
  ];

  // annotations: tweened values for when contours are in og pos on mag
  const setContoursOnMag = () => {
    contourTweenedY_1.set(contours_1.map((d) => d.y_pct));
    contourTweenedX_1.set(contours_1.map((d) => d.x_pct));
    contourTweenedH_1.set(contours_1.map((d) => d.h_pct));
    contourTweenedW_1.set(contours_1.map((d) => d.w_pct));

    contourTweenedY_2.set(contours_2.map((d) => d.y_pct));
    contourTweenedX_2.set(contours_2.map((d) => d.x_pct));
    contourTweenedH_2.set(contours_2.map((d) => d.h_pct));
    contourTweenedW_2.set(contours_2.map((d) => d.w_pct));
  };

  // annotations: tweened values for when contours are lumped together in one big area
  const setContoursRatio = () => {
    contourTweenedY_1.set(contours_1.map((d) => d.cumulativeAreaProportion));
    contourTweenedX_1.set(contours_1.map(() => 0));
    contourTweenedH_1.set(contours_1.map((d) => d.areaProportion + 1));
    contourTweenedW_1.set(contours_1.map(() => 100));

    contourTweenedY_2.set(contours_2.map((d) => d.cumulativeAreaProportion));
    contourTweenedX_2.set(contours_2.map(() => 0));
    contourTweenedH_2.set(contours_2.map((d) => d.areaProportion + 1));
    contourTweenedW_2.set(contours_2.map(() => 100));
  };

  function findMagHeight(ratio, mag_width) {
    const h = mag_width * (1 / ratio);
    return h;
  }

  function findMagWidth(ratio, mag_height) {
    const w = mag_height * ratio;
    return w;
  }

  function calculateTotalContourArea(contours) {
    return contours.reduce((acc, curr) => acc + curr.w * curr.h, 0);
  }

  function sortContoursByY(contours) {
    return contours.slice().sort((a, b) => a.y - b.y);
  }

  function calculateContourProportions(contours, totalContourArea, ratio) {
    let cumulativeAreaProportion = 0;

    return contours.map((item) => {
      const areaProportion =
        ((item.w * item.h) / totalContourArea) * ratio * 100;
      item.areaProportion = areaProportion;
      item.cumulativeAreaProportion = cumulativeAreaProportion;
      cumulativeAreaProportion += areaProportion;
      return item;
    });
  }
</script>

<div class="scroller">
  <!-- main content -->
  <div class="mag-gallery">
    <div class="mag-wrapper">
      {#each guineaPigMagList as d, i}
        {#if nowShowing == "ratios"}
          <div class="methods-demo">
            <div class="image-wrapper">
              <div class="image">
                <div class="all-original-covers all-covers" transition:fade>
                  <!-- cover image -->
                  <Image
                    guineaPigMag={d}
                    {mag_width}
                    {mag_height}
                    type={"original"}
                    imagePathEnding={".jpg"}
                    alt={"Vogue magazine cover"}
                    {showingImage}
                  />
                </div>

                {#if showingAnnotations}
                  <div class="annotations-wrapper">
                    <!-- contours -->
                    <Annotations
                      {mag_height}
                      {mag_width}
                      {showingImage}
                      contours={d.contours}
                      contourTweenedH={d.contourTweenedH}
                      contourTweenedY={d.contourTweenedY}
                      contourTweenedX={d.contourTweenedX}
                      contourTweenedW={d.contourTweenedW}
                    />
                  </div>
                {/if}
              </div>
              <Caption {d} />
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- scrolly steps-->
  <div class="steps-wrapper" class:first={currentStep == 0}>
    <Scroll bind:value={currentStep}>
      {#each steps as text, i}
        <div class="step" class:active={currentStep === i}>
          <div class="step-content" width={stepWidth}>
            {@html text}
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

  .mag-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  @media (max-width: 860px) {
    .mag-wrapper {
      gap: 16px;
    }
  }

  @media (min-width: 860px) {
    .mag-wrapper {
      gap: 80px;
    }
  }

  .image-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .image {
    position: relative;
  }
</style>
