<script>
  import { getImagePath } from "../utils/main";
  import Caption from "./Caption.svelte";

  export let magWidth;
  export let showingRatio;
  export let d;
  export let imageType;
</script>

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

<Caption {d}
  >{#if showingRatio}
    <div class="img-captions body-text">
      {Math.round(d.ratio * 100)}% text
    </div>
  {/if}</Caption
>
