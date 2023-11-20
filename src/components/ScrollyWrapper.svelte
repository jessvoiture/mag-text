<script>
  import { group, extent } from "d3-array";

  import { months } from "../stores";
  import ScrollyChart from "./ScrollyChart.svelte";
  import ScrollyMethod from "./ScrollyMethod.svelte";
  import AnalysisSection from "../components/AnalysisSection.svelte";
  import Caboose from "./Caboose.svelte";

  export let data;
  export let screenHeight;
  export let screenWidth;

  const mags = data.magazines;
  const yt = data.yt;
  const google = data.google;

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

<AnalysisSection />

<ScrollyChart {cumulativeData} {screenHeight} {screenWidth} {dateExtent} />

<Caboose {cumulativeData} {yt} {google} {screenHeight} {screenWidth} />
