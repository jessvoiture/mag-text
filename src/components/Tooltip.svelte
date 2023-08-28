<script>
  import { hoveredDatapoint, mouse_x, mouse_y } from "../stores";
</script>

<div
  class="tooltip"
  width="30"
  height="auto"
  style="left: {$mouse_x + 10}px; top: {$mouse_y - 10}px"
>
  <p>{$hoveredDatapoint.Date}</p>
  <p>{Math.round($hoveredDatapoint.ratio * 100)}</p>
</div>

<style>
  .tooltip {
    position: fixed;
    background-color: white;
    padding: 3px;
    border: solid 1px;
  }
</style>
