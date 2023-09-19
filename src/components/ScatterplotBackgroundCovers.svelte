<script>
  import { fade, fly } from "svelte/transition";

  export let innerHeight;
  export let innerWidth;
  export let left;
  export let cumulativeData;
  export let xScale;
  export let yScale;
  export let tweenedY;
  export let rectWidth;
  export let rectHeightMultiplyingFactor;
  export let rectHeightAddition;
</script>

<g
  height={innerHeight}
  width={innerWidth}
  transform={`translate(${left}, 0)`}
  class="data-plotted"
  transition:fade
>
  {#each cumulativeData as d, index}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <rect
      class="mag-chart-rect background-rect"
      x={xScale(d.year)}
      y={yScale($tweenedY[index])}
      width={rectWidth}
      height={rectHeightMultiplyingFactor + rectHeightAddition}
    />
  {/each}
</g>

<style>
  .background-rect {
    fill-opacity: 1;
    transition: fill-opacity 1s ease;
  }
</style>
