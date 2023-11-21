<script>
  import { getImagePath } from "../utils/main";
  import Caption from "./Caption.svelte";

  export let magWidth;
  export let showingRatio;
  export let d;
  export let imageType;
  export let colour;
</script>

<div class="mag-caption">
  <div class="list-img">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      class="original-image"
      style="width: {magWidth}px; height: auto;"
      src={getImagePath(d.Date, imageType, ".jpg")}
      alt="Vogue cover"
    />
  </div>

  <Caption {d} {colour}
    >{#if showingRatio}
      <div class="img-captions body-text">
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

  .list-img {
    height: 220px;
  }
</style>
