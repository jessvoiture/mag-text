<script>
  export let marginUnit;
  export let xTicks;
  export let height;
  export let xScale;
  export let formatTick;
</script>

<g transform="translate({marginUnit},10)" class="axis xaxis">
  {#each xTicks as tick}
    <g transform="translate({xScale(tick)}, 0)">
      <text y={height}>{formatTick(tick)}</text>
    </g>
  {/each}
</g>
