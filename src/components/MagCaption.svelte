<script>
  import { getImagePath } from "../utils/main";
  import Caption from "./Caption.svelte";

  export let magWidth;
  export let showingRatio;
  export let d;
  export let imageType;
  export let colour;

  let whRatioEstimate = 0.68;
  $: magHeight = magWidth / whRatioEstimate;

  console.log("magWidth", magWidth);
</script>

<div class="mag-caption">
  <div class="list-img" style="height: {magHeight}px;">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      class="original-image {colour}"
      style="width: {magWidth}px; height: auto;"
      src={getImagePath(d.Date, imageType, ".jpg")}
      alt="Vogue cover"
    />
  </div>

  <Caption {d} {colour}
    >{#if showingRatio}
      <div class="img-captions body-text caption-text-coverage">
        {Math.round(d.ratio * 100)}% text
      </div>
    {/if}</Caption
  >
</div>

<style>
  .mag-caption {
    display: flex;
    flex-direction: column;
  }

  .caption-text-coverage {
    color: #8a8a8a;
  }
</style>
