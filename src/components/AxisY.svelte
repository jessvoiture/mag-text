<script>
  export let top;
  export let yTicks;
  export let yScale;
  export let yScaleTranslate;
</script>

<g transform="translate(0, {top})">
  {#each yTicks as tick}
    <g class="tick" transform="translate(0, {yScale(tick) - yScaleTranslate})">
      <text>{tick}</text>
    </g>
  {/each}
</g>
