<script>
  import { fade } from "svelte/transition";
  import { mean, rollup } from "d3-array";

  export let cumulativeData;
  export let xScale;
  export let yScale;
  export let rectWidth;
  export let rectHeightAddition;

  let yearlyMean = rollup(
    cumulativeData,
    (v) => mean(v, (d) => d.ratio),
    (d) => d.year
  );
</script>

<g class="mean-datapoints scatterplot" transition:fade>
  {#each yearlyMean as d}
    <rect
      class="mean-datapoint"
      x={xScale(d[0])}
      y={yScale(d[1])}
      width={rectWidth}
      height={rectHeightAddition * 1.5}
    />
  {/each}
</g>
