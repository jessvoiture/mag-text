<script>
  import { group, extent } from "d3-array";

  import { months } from "../stores";
  import ScrollyChart from "./ScrollyChart.svelte";
  import ScrollyMethod from "./ScrollyMethod.svelte";

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
      Is this merely an anomaly— did Rihanna's 2022 serve simply leave no room
      for textual fare? Or is this indicative of a larger trend?
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
