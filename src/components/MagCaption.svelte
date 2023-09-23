<script>
  import { months } from "../stores";

  export let magWidth;
  export let showingRatio;
  export let d;
  export let imageType;

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;
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
<div class="caption">
  <div class="img-captions body-text">
    {d.year} — {$months[d.month - 1]}
  </div>
  {#if showingRatio}
    <div class="img-captions body-text">{Math.round(d.ratio * 100)}%</div>
  {/if}
</div>

<style>
  .img-captions {
    font-size: 12pt;
    line-height: 20pt;
  }
</style>
