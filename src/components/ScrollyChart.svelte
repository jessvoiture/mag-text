<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";

  import Scroll from "./Scrolly.svelte";
  import Scatterplot from "./Scatterplot.svelte";

  export let cumulativeData;
  export let screenHeight;
  export let screenWidth;
  export let dateExtent;

  let stepWidth;
  let tweenedY;

  let steps = [];
  let currentStep = 0;
  let showingMeanValues = false;
  let showingMonthRatios = false;
  let yVals;

  onMount(() => {
    showingMeanValues = false;
    showingMonthRatios = false;
  });

  // scroll steps
  $: steps = [
    `<p>Here we have all US Vogue magazines from ${dateExtent[0]} to ${dateExtent[1]} organised by month and year</p>`,
    `<p>Just as before, we've plotted a magazine's text coverage in proportion to the magazine's cover area.</p>`,
    // 6 -> remove bg, by month
    "<p>But, let's remove the background, so we can focus on the text coverages</p>",
    // 7 -> remove bg, by month
    "<p>We can start to see a trend! More recent covers seem to have less area with text than older covers</p>",
    // 8 -> plot ratios
    "<p>Just to be sure, let's just plot the text coverages by year</p>",
    // 9
    "<p>We can clearly see the downward trend of the amount of text on covers over time</p>",
    // 10
    `<p>Let's also plot the yearly average of the text coverage</p>`,
    // 11
    `<p>The area covered by text has decreased from an average of ~30% in ${dateExtent[0]} to ~10% in ${dateExtent[1]}.</p>`,
  ];

  // initialise tween values
  $: tweenedY = tweened(cumulativeData.map((d) => d.month));

  // scrolly stuff
  $: if (currentStep == 0) {
    // first chart! just the background
    showingMeanValues = false;
    showingMonthRatios = true;
    setMonthValues();
  } else if (currentStep == 1) {
    // add on the ratios with fly transition
    setMonthValues();
    showingMeanValues = false;
    showingMonthRatios = true;
  } else if ((currentStep == 2) | (currentStep == 3)) {
    // rescale
    showingMeanValues = false;
    showingMonthRatios = true;
    setRelativeHeightValues();
  } else if ((currentStep == 4) | (currentStep == 5)) {
    // barcode
    showingMeanValues = false;
    showingMonthRatios = true;
    setRatioValues();
  } else if ((currentStep == 6) | (currentStep == 7)) {
    // barcode with means
    showingMeanValues = true;
    showingMonthRatios = true;
    setRatioValues();
  }

  // chart: y vals for all the magazines by month/year with mag bg + contours
  const setMonthValues = function () {
    yVals = "month";
    tweenedY.set(cumulativeData.map((d) => d.month));
  };

  // chart: y vals for all the magazines by month/year with with contour area only
  const setRelativeHeightValues = () => {
    yVals = "relative";
    tweenedY.set(cumulativeData.map((d) => d.month));
  };

  // chart: y vals for barcode
  const setRatioValues = function () {
    yVals = "ratio";
    tweenedY.set(cumulativeData.map((d) => d.ratio));
  };
</script>

<div class="scroller">
  <!-- main content -->
  <div class="mag-gallery">
    <div class="mag-wrapper">
      <!-- chart -->
      <Scatterplot
        {screenHeight}
        {screenWidth}
        {cumulativeData}
        {showingMeanValues}
        {showingMonthRatios}
        {yVals}
        {tweenedY}
      />
    </div>
  </div>

  <!-- scrolly steps-->
  <div class="steps-wrapper">
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
