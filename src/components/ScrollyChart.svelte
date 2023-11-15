<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";

  import Scroll from "./Scrolly.svelte";
  import Scatterplot from "./Scatterplot.svelte";
  import { magDemoDate } from "../stores";
  import MagCaption from "./MagCaption.svelte";

  export let cumulativeData;
  export let screenHeight;
  export let screenWidth;
  export let dateExtent;

  const yearRanges = [
    { start: 2000, end: 2006 },
    { start: 2005, end: 2006 },
    { start: 2004, end: 2010 },
    { start: 2006, end: 2016 },
    { start: 2018, end: 2022 },
  ];

  let stepWidth;
  let tweenedY;
  let yVals;

  let steps = [];
  let currentStep = 0;
  let exampleMagDate = 20011101;
  let showingMeanValues = false;
  let showingMonthRatios = false;
  let showingRectangle = false;
  let stepsWithMags = [7, 9, 13, 16, 19];

  let rectangle = tweened({
    start: yearRanges[0].start,
    end: yearRanges[0].end,
  });

  onMount(() => {
    showingMeanValues = false;
    showingMonthRatios = false;
  });

  // scroll steps
  $: steps = [
    // 0 -> all mags with bg
    `<p>Here we have all US Vogue magazines from ${dateExtent[0]} to ${dateExtent[1]} organised by month and year</p>`,
    // 1 -> all mags with bg
    `<p>Just as before, we've plotted a magazine's text coverage in proportion to the magazine's cover area.</p>`,
    // 2 -> remove bg, by month
    "<p>But, let's remove the background, so we can focus on the text coverages</p>",
    // 3 -> remove bg, by month
    "<p>We can start to see a trend! More recent covers seem to have a lower text coverage than older covers</p>",
    // 4 -> barcode
    "<p>To see trends more clearly, let's just plot the text coverages by year</p>",
    // 5 -> barcode
    "<p>We can see a sort of inverted U shape, with text coverage increasing slightly in the early aughts, peaking in the mid 2000s and then steadily declining</p>",
    // 6 ->  means
    `<p>Let's plot the average text coverage by year to take a closer look</p>`,
    // 7 -> 2000 - 2004, show ex
    `<p>In the early 2000s print publications were slow to embrace the digital frontier, clinging to traditional cover designs and advertising methods</p>`,
    // 8 -> 2000 - 2004
    `<p>Perhaps in response to the onslaught of the 2000's tabloid journalism and revelling in graphics software, magazine covers maintained a high text coverage</p>`,
    // 9 ->  2005 - 2006, show ex
    `<p>We hit a peak text coverage in 2005 and 2006 with an average of around 35%</p>`,
    // 10 ->  2007 - 2011
    `<p>The latter half of the 2010s, however, saw the emergence of Facebook, Youtube, Twitter, tumblr, and Instagram— all of which launched between 2004 and 2010</p>`,
    // 11 ->  2007 - 2011
    `<p>The boom of social media platforms forced publications to change course</p>`,
    // 12 ->  2007 - 2011
    `<p>Digitization dramatically changed how people interacted with magazines. While subscriptions remained the primary source of revenue, social media replaced the newsstand as the marketplace</p>`,
    // 13 ->  2012 - 2017, show ex
    `<p>Throughout the 2010s we see this change manifesting on covers through a gradual decline in text coverage</p>`,
    // 14 ->  2012 - 2017
    `<p>Clickbait-y cover lines weren't as impactful as striking imagery in the digital landscape, and the text didn’t translate well to small screens</p>`,
    // 15 ->  2012 - 2017
    `<p>Instead, magazines needed to leverage the internet to generate online buzz. The prominence of a magazine's cover star had 
      greater potential for virality than its cover lines. Ergo, we see more focus on
      the images and the subject themself</p>`,
    // 16 ->  2012 - 2017
    `<p>The reveal of the April 2014 Vogue cover, resulted in a x% increase in Google searches for Vogue</p>`,
    // 17 ->  2012 - 2017
    `<p> Between 2006 and 2016 the average text coverage decreased by 15%</p>`,
    // 18 ->  2018 - 2022
    `<p>Since 2018, there's been a consistent yearly dip in text coverage, marking an intensified progression of the trend seen throughout the 2010s</p>`,
    // 19 ->  2018 - 2022, show ex
    `<p>A trend perhaps in reaction to pivotal moments like the COVID-19 pandemic and the Black Lives Matter movement in 2020. Amidst the profound suffering, isolation, and reflection, frivolous cover lines would've been out of place</p>`,
    // 20 ->  2018 - 2022
    `<p>By 2022, average text coverage had dwindled to just 10%, 25% less than the 2006 peak</p>`,
  ];

  // example mag to show in scroll step
  $: exampleMag = cumulativeData.find((d) => d.Date == exampleMagDate);

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

  // showing rectangle
  $: if (currentStep >= 7) {
    showingRectangle = true;
    console.log("showing rectangle");
  } else {
    showingRectangle = false;
  }

  // rectangle area stuff
  $: if ((currentStep == 7) | (currentStep == 8)) {
    // 2000 - 2004
    setRectangleRange(0);
  } else if (currentStep == 9) {
    // 2005 - 2006
    setRectangleRange(1);
  } else if ((currentStep >= 10) & (currentStep <= 11)) {
    // 2007 - 2011
    setRectangleRange(2);
  } else if ((currentStep >= 12) & (currentStep <= 17)) {
    // 2012 - 2017
    setRectangleRange(3);
  } else if (currentStep >= 18) {
    // 2018 - 2022
    setRectangleRange(4);
  }

  $: if (currentStep == 7) {
    exampleMagDate = 20011101;
  } else if (currentStep == 9) {
    exampleMagDate = 20060301;
  } else if (currentStep == 13) {
    exampleMagDate = 20130401;
  } else if (currentStep == 16) {
    exampleMagDate = 20140401;
  } else if (currentStep == 19) {
    exampleMagDate = 20200901;
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

  const setRectangleRange = function (index) {
    rectangle.set({
      start: yearRanges[index].start,
      end: yearRanges[index].end,
    });
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
        {rectangle}
        {showingRectangle}
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

            {#if stepsWithMags.includes(i)}
              <MagCaption
                magWidth={150}
                d={exampleMag}
                showingRatio={false}
                imageType={"original"}
                colour={"black"}
              />
            {/if}
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
