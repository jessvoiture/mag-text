<script>
  import { months } from "../stores";
  export let d;
  export let colour;
</script>

<div class="caption">
  <div class="img-captions body-text {colour}">
    {d.year} — {$months[d.month - 1]}
  </div>

  <slot />
</div>

<style>
  .img-captions {
    font-size: 12pt;
    line-height: 20pt;
  }

  .white {
    color: #e0e0e0;
  }

  .black {
    color: #180e0d;
  }
</style>
