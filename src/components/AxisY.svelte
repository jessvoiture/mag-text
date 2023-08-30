<script>
  export let yTicks;
  export let yScale;
  export let yScaleTranslate;
  export let yVals;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatTick = function (tick, yVal) {
    if ((yVal == "month") | (yVal == "relative")) {
      const monthName = months[tick - 1];
      return monthName;
    } else {
      return tick;
    }
  };
</script>

<g transform="translate(0, {yScaleTranslate})">
  {#each yTicks as tick}
    <g class="tick" transform="translate(0, {yScale(tick)})">
      <text>{formatTick(tick, yVals)}</text>
    </g>
  {/each}
</g>
