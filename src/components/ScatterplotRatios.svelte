<script>
  import { fly, fade } from "svelte/transition";
  import { hoveredDatapoint, mouse_x, mouse_y } from "../stores";

  export let cumulativeData;
  export let showingMeanValues;
  export let xScale;
  export let yScale;
  export let tweenedY;
  export let rectWidth;
  export let rectHeightMultiplyingFactor;
  export let rectHeightAddition;

  const handleMouseover = function (event, d) {
    hoveredDatapoint.set(d);
    mouse_x.set(event.clientX);
    mouse_y.set(event.clientY);
  };

  const handleMouseout = function () {
    hoveredDatapoint.set(undefined);
  };
</script>

<g class="data-plotted">
  {#each cumulativeData as d, index}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <rect
      class:grayedout={showingMeanValues}
      class="mag-chart-rect scatterplot"
      x={xScale(d.year)}
      y={yScale($tweenedY[index])}
      width={rectWidth}
      height={rectHeightMultiplyingFactor * d.ratio + rectHeightAddition}
      in:fly={{ delay: index * 7 }}
      on:mouseover={function (event) {
        handleMouseover(event, d);
      }}
      on:mouseout={function () {
        handleMouseout();
      }}
    />
  {/each}
</g>

<style>
  .mag-chart-rect {
    transition: height 0.3s ease, fill-opacity 0.8s ease;
    fill-opacity: 1;
  }

  .mag-chart-rect.grayedout {
    fill-opacity: 0.2;
  }
</style>
