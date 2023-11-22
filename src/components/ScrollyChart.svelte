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
  let yVals;

  let steps = [];
  let currentStep = 0;
  let showingMeanValues = false;
  let showingMonthRatios = false;

  onMount(() => {
    showingMeanValues = false;
    showingMonthRatios = false;
  });

  // scroll steps
  $: steps = [
    // 0 -> all mags with bg
    `<p>Here are all US Vogue magazines from ${dateExtent[0]} to ${dateExtent[1]}. Each column is a year and each row is a month. Each block represents one magazine</p>`,
    // 1 -> all mags with bg
    `<p>Just as with the Rihanna covers, we've plotted a magazine's text coverage in proportion to the magazine's cover area</p>`,
    // 2 -> remove bg, by month
    "<p>Let's remove the background and rescale the text coverage rectangles, so we can better analyse text coverage over time<p>",
    // 3 -> remove bg, by month
    "<p>We can start to see a trend! More recent covers seem to have a lower text coverage than older covers</p>",
    // 4 -> barcode
    "<p>To see trends more clearly, let's just plot the text coverages by year</p>",
    // 5 -> barcode
    "<p>We can see a sort of inverted U shape, with text coverage increasing slightly in the early aughts, peaking in the mid 2000s and then steadily declining</p>",
    // 6 ->  means
    `<p>Plotting the average text coverage by year further confirms the trend</p>`,
  ];

  // initialise tween values
  $: tweenedY = tweened(cumulativeData.map((d) => d.month));

  // showing Month Ratios
  $: if (currentStep >= 0) {
    showingMonthRatios = true;
  } else {
    showingMonthRatios = false;
  }

  // setting month values
  $: if ((currentStep == 0) | (currentStep == 1)) {
    setMonthValues();
  }

  // setting rel heights values
  $: if ((currentStep == 2) | (currentStep == 3)) {
    setRelativeHeightValues();
  }

  // setting ratio values
  $: if (currentStep >= 4) {
    setRatioValues();
  }

  // mean values
  $: if (currentStep >= 6) {
    showingMeanValues = true;
  } else {
    showingMeanValues = false;
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
        justAdded={true}
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

<style>
  .step-content {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
</style>
