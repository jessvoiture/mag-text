<script>
  import { hoveredDatapoint, mouse_x, mouse_y } from "../stores";

  export let screenWidth;
  export let screenHeight;

  const maxLeft = screenWidth - 10; // Adjust as needed
  const maxTop = screenHeight - 10; // Adjust as needed
  let adjustedLeft = $mouse_x + 10;
  let adjustedTop = $mouse_y - 10;
  if (adjustedLeft > maxLeft) {
    adjustedLeft = maxLeft;
  }
  if (adjustedTop > maxTop) {
    adjustedTop = maxTop;
  }

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;
</script>

<div class="tooltip" style="left: {$mouse_x + 10}px; top: {$mouse_y - 10}px">
  <div class="tooltip-content">
    <p>{$hoveredDatapoint.Date}</p>
    <p>{Math.round($hoveredDatapoint.ratio * 100)}%</p>
  </div>

  <div class="tooltip-image">
    <img
      src={getImagePath($hoveredDatapoint.Date, "original", ".jpg")}
      alt="Vogue magaaine cover"
    />
  </div>
</div>

<style>
  .tooltip {
    position: fixed;
    display: flex; /* Use flexbox for side-by-side layout */
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
  }

  .tooltip-image {
    flex: 0 0 auto; /* The left column (image) won't grow or shrink */
    margin-right: 10px; /* Add spacing between columns */
  }

  .tooltip-image img {
    max-width: 200px; /* Adjust the image size as needed */
    max-height: 200px;
  }

  .tooltip-content {
    flex: 1 1 auto; /* The right column (content) will grow and shrink as needed */
  }

  .tooltip-content p {
    margin: 0;
    padding: 3px;
  }
</style>
