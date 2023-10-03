<script>
  import { nowShowing } from "../stores";
  import { getImagePath } from "../utils/main";

  export let guineaPigMag;

  export let mag_width;
  export let mag_height;

  export let alt;
  export let type;
  export let imagePathEnding;

  let imgClassName = $nowShowing + "-covers";
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
  class="{imgClassName} cover"
  src={getImagePath(guineaPigMag.Date, type, imagePathEnding)}
  {alt}
  height={mag_height}
  width={mag_width}
/>
