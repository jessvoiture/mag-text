<script>
  import { months } from "../stores";
  export let d;
</script>

<div class="caption">
  <div class="img-captions body-text">
    {d.year} — {$months[d.month - 1]}
  </div>

  <slot />
</div>

<style>
  .img-captions {
    font-size: 12pt;
    line-height: 20pt;
  }
</style>
