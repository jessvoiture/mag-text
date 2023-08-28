<script>
  export let left;
  export let xTicks;
  export let height;
  export let xScale;
</script>

<g transform="translate({left},0)" class="axis xaxis">
  {#each xTicks as tick}
    <g transform="translate({xScale(tick)}, 0)">
      <text y={height}>{tick}</text>
    </g>
  {/each}
</g>
