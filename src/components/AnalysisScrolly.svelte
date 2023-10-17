<script>
  import Scatterplot from "./Scatterplot.svelte";
  import Scroll from "./Scrolly.svelte";
  import { readable } from "svelte/store";
  import { tweened } from "svelte/motion";

  export let screenHeight;
  export let screenWidth;
  export let cumulativeData;

  export let datapoints = readable(cumulativeData.map((d) => d.ratio));

  let steps = [];
  let stepWidth;
  let currentStep = 0;
  let showingMeanValues = false;
  let showingMonthRatios = true;
  let yVals = "ratio";
  let justAdded = false;
  let showingRectangle = false;

  const yearRanges = [
    { start: 2000, end: 2006 },
    { start: 2005, end: 2006 },
    { start: 2004, end: 2010 },
    { start: 2006, end: 2016 },
    { start: 2018, end: 2022 },
  ];

  let rectangle = tweened({
    start: yearRanges[0].start,
    end: yearRanges[0].end,
  });

  // scroll steps
  $: steps = [
    // 0 -> all mags with bg
    `<p>Now back to the chart</p>`,
    // 1 ->  means
    `<p>First, let's plot the average text coverage by year to take a closer look at the recent trends</p>`,
    // 2 -> 2000 - 2004
    `<p>In the early 2000s print publications were slow to embrace the digital frontier, clinging to traditional cover designs and advertising methods</p>`,
    // 3 -> 2000 - 2004
    `<p>Perhaps in response to the onslaught of the 2000's tabloid journalism, magazine covers maintained a high text coverage</p>`,
    // 4 ->  2005 - 2006
    `<p>We hit a peak text coverage in 2005 and 2006 with an average of around 35%</p>`,
    // 5 ->  2007 - 2011
    `<p>The latter half of the 2010s, however, saw the emergence of Facebook, Youtube, Twitter, tumblr, and Instagram— all of which launched between 2004 and 2010</p>`,
    // 6 ->  2007 - 2011
    `<p>The boom of social media platforms forced publications to change course</p>`,
    // 7 ->  2007 - 2011
    `<p>Digitization dramatically changed how people interacted with magazines. Social media replaced the newsstand as the marketplace for magazines</p>`,
    // 8 ->  2012 - 2017
    `<p>Throughout the 2010s we see this change manifesting on covers through a gradual decline in text coverage</p>`,
    // 9 ->  2012 - 2017
    `<p>Clickbait-y cover lines weren't as impactful as striking imagery in the digital landscape, and the text didn’t translate well to small screens</p>`,
    // 10 ->  2012 - 2017
    `<p>Instead, magazines needed to leverage digital mediums to generate cultral resonance and online buzz. The prominence of a magazine's cover star had far
      greater potential for virality than its cover lines. Ergo, we see more focus on
      the images and the subject themself</p>`,
    // 11 ->  2012 - 2017
    `<p> Between 2006 and 2016 the average text coverage decreased by 15%</p>`,
    // 12 ->  2018 - 2022
    `<p>Since 2018, there's been a consistent yearly dip in text coverage, marking an intensified progression of the trend seen throughout the 2010s</p>`,
    // 12 ->  2018 - 2022
    `<p>A trend perhaps in reaction to pivotal moments like the COVID-19 pandemic and the Black Lives Matter movement in 2020. Amidst the profound suffering, isolation, and reflection, frivolous cover lines would've been out of place</p>`,
    // 13 ->  2018 - 2022
    `<p>By 2022, average text coverage had dwindled to just 10%, 25% less than the 2006 peak</p>`,
  ];

  // scrolly stuff
  $: if (currentStep == 0) {
    // barcode no means
    showingMeanValues = false;
    showingRectangle = false;
    setRectangleRange(0);
  } else if (currentStep == 1) {
    // add means
    showingMeanValues = true;
    showingRectangle = false;
    setRectangleRange(0);
  } else if ((currentStep == 2) | (currentStep == 3)) {
    // 2000 - 2004
    showingMeanValues = true;
    showingRectangle = true;
    setRectangleRange(0);
  } else if (currentStep == 4) {
    // 2005 - 2006
    showingMeanValues = true;
    showingRectangle = true;
    setRectangleRange(1);
  } else if ((currentStep >= 5) & (currentStep <= 7)) {
    // 2007 - 2011
    showingMeanValues = true;
    showingRectangle = true;
    setRectangleRange(2);
  } else if ((currentStep >= 8) & (currentStep <= 11)) {
    // 2012 - 2017
    showingMeanValues = true;
    showingRectangle = true;
    setRectangleRange(3);
  } else if (currentStep >= 11) {
    // 2018 - 2022
    showingMeanValues = true;
    showingRectangle = true;
    setRectangleRange(4);
  }

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
        tweenedY={datapoints}
        {justAdded}
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
          </div>
        </div>
      {/each}
    </Scroll>
  </div>
</div>
