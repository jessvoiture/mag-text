<script>
  import { months } from "../stores";
  export let d;
  export let colour;
</script>

<div class="caption">
  <div class="img-captions body-text caption-title {colour}">
    {d.year} — {$months[d.month - 1]}
  </div>

  <slot />
</div>

<style>
  .white {
    color: #c1c1c1;
  }

  .black {
    color: #180e0d;
  }

  .caption-title {
    font-weight: 500;
  }
</style>
