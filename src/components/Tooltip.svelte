<script>
  import { hoveredDatapoint, mouse_x, mouse_y, months } from "../stores";

  export let screenWidth;
  export let screenHeight;

  let adjustedMouseX;
  let adjustedMouseY;

  let tooltipWidth = 300;
  let tooltipHeight = 400;

  if ($mouse_x + 310 < screenWidth) {
    adjustedMouseX = $mouse_x + 10;
  } else {
    adjustedMouseX = $mouse_x - tooltipWidth;
  }

  if ($mouse_y + 310 < screenHeight) {
    adjustedMouseY = $mouse_y + 10;
  } else {
    adjustedMouseY = $mouse_y - tooltipHeight;
  }

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;
</script>

<div class="tooltip" style="left: {adjustedMouseX}px; top: {adjustedMouseY}px">
  <div class="tooltip-content body-text">
    <p>{$months[$hoveredDatapoint.month - 1]}, {$hoveredDatapoint.year}</p>
    <p>
      {Math.round($hoveredDatapoint.ratio * 100)}% of cover has text
    </p>
  </div>

  <div class="tooltip-image">
    <div class="original">
      <img
        src={getImagePath($hoveredDatapoint.Date, "original", ".jpg")}
        alt="Vogue magaaine cover"
        loading="lazy"
      />
    </div>

    <div class="annotated">
      <img
        src={getImagePath($hoveredDatapoint.Date, "annotated", "-01.png")}
        alt="Vogue magaaine cover"
        loading="lazy"
      />
    </div>
  </div>
</div>

<style lang="scss" scoped>
  .tooltip {
    position: fixed;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 240px;
    padding: 16px;
  }

  .tooltip-image {
    flex: 0 0 auto; /* The left column (image) won't grow or shrink */
    position: relative;
  }

  .tooltip-image img {
    width: 100%;
  }

  .tooltip-content p {
    margin: 0;
    padding: 0;
    color: #6b5b6a;
  }

  .annotated {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 40%;
  }
</style>
