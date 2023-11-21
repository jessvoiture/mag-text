<script>
  import { fade } from "svelte/transition";

  export let rectangle;
  export let innerHeight;
  export let xScale;
</script>

<g class="rectangle" transition:fade>
  <rect
    x={xScale($rectangle.start)}
    y={0}
    width={xScale($rectangle.end) - xScale($rectangle.start)}
    height={innerHeight}
    fill="#6b5b6a"
    opacity="0.3"
  />
</g>

<style>
  .rectangle {
    z-index: 0;
  }
</style>
