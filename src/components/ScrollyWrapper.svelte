<script>
  import { group, extent } from "d3-array";

  import { months } from "../stores";
  import ScrollyChart from "./ScrollyChart.svelte";
  import ScrollyMethod from "./ScrollyMethod.svelte";
  import AnalysisSection from "../components/AnalysisSection.svelte";
  import AnalysisScrolly from "./AnalysisScrolly.svelte";

  export let data;
  export let screenHeight;
  export let screenWidth;

  const mags = data.magazines;

  const groupedMags = group(mags, (d) => d.year);
  const cumulativeData = [];

  mags.sort((a, b) => a.Date - b.Date);

  // calc cumulative sum of text ratio grouped by YEAR
  // useful for y pos in chart by month/year
  groupedMags.forEach((values) => {
    let cumulativeSum = 0;
    values.forEach((d) => {
      cumulativeSum += d.ratio;
      cumulativeData.push({ ...d, total: cumulativeSum });
    });
  });

  cumulativeData.sort((a, b) => a.Date - b.Date);

  cumulativeData.forEach((d) => {
    const monthNumber = d.month;
    d.monthName = $months[monthNumber - 1];
  });

  $: dateExtent = extent(cumulativeData, (d) => d.year);
</script>

<ScrollyMethod {cumulativeData} {screenHeight} {screenWidth} />

<div class="body-section">
  <div class="section">
    <div class="body-text">
      Is this merely an anomaly— did Rihanna simply slay so hard in 2022 that
      there was no room for textual fare? Or is this indicative of a larger
      trend?
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      Let's expand our search to all magazine covers from 2000 to 2022—{cumulativeData.length}
      covers in total. As before, we will be looking at the area occupied by the
      text compared to the total area of the magazine cover. For simplicity, I'll
      refer to this percentage as the text coverage.
    </div>
  </div>
</div>

<ScrollyChart {cumulativeData} {screenHeight} {screenWidth} {dateExtent} />

<AnalysisSection />

<AnalysisScrolly {cumulativeData} {screenHeight} {screenWidth} />

<div class="body-section">
  <div class="section">
    <div class="body-text">
      Social media and mobile devices have transformed the landscape of Vogue
      magazines, forcing its evolution towards a more minimalist design.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      We almost see a rebirth of the simpler poster covers of the early 1900s,
      with much more focus on the cover imagery and the cover star themself. The
      dissemination of visuals, as well as accompanying media such as YouTube
      videos, across social media serves as an advertising medium thus rendering
      the cover lines obsolete and unnecessary noise. The high-production
      editorial shoots provokes greater visual impact and efficacy on large
      screens, mobile devices, and print while also imbuing a sense of modernity
      and artistry.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      Vogue's text journey is undoubtedly a reaction to societal change and a
      (successful) bid to stay relevant. The cultural imprint of Vogue magazine
      is profound, yet it, too, has been shaped by the shifting tides of time.
    </div>
  </div>
</div>
