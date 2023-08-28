<script>
  import { nowShowing } from "../stores";
  import { fade } from "svelte/transition";

  export let guineaPigMag;

  export let mag_width;
  export let mag_height;

  export let alt;
  export let type;
  export let imagePathEnding;

  let imgClassName = $nowShowing + "-covers";

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
  class="{imgClassName} cover"
  src={getImagePath(guineaPigMag.Date, type, imagePathEnding)}
  {alt}
  height={mag_height}
  width={mag_width}
/>
