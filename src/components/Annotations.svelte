<script>
  import { scaleLinear } from "d3-scale";
  import { fade } from "svelte/transition";

  export let mag_height;
  export let mag_width;
  export let showingImage;
  export let contours;
  export let contourTweenedH;
  export let contourTweenedW;
  export let contourTweenedY;
  export let contourTweenedX;

  $: contourXScale = scaleLinear().domain([0, 100]).range([0, mag_width]);
  $: contourYScale = scaleLinear().domain([100, 0]).range([mag_height, 0]);
</script>

<svg
  height={mag_height}
  width={mag_width}
  class="all-annotated-covers all-covers"
  transition:fade
>
  <g>
    <rect
      class:translucent={showingImage}
      class="annotation-cover annotation-cover-background"
      x="0"
      y="0"
      width={mag_width}
      height={mag_height}
    />
  </g>

  <g>
    {#each contours as contour, index}
      <rect
        class:translucent={showingImage}
        class="annotation-cover annotation-cover-contour"
        x={contourXScale($contourTweenedX[index])}
        y={contourYScale($contourTweenedY[index])}
        width={contourXScale($contourTweenedW[index])}
        height={contourYScale($contourTweenedH[index])}
      />
    {/each}
  </g>
</svg>

<style>
  .annotation-cover-background,
  .annotation-cover-contour {
    fill-opacity: 1;
    transition: fill-opacity 1s ease;
  }

  .annotation-cover-background.translucent {
    fill-opacity: 0.5;
    transition: fill-opacity 0.3s ease;
  }

  .annotation-cover-contour.translucent {
    fill-opacity: 0.6;
    transition: fill-opacity 0.3s ease;
  }
</style>
