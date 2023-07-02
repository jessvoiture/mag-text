<script>
    import { extent } from "d3-array";
    import { scaleLinear } from "d3-scale";

    export let data;

    export let innerHeight;
    export let top;

    let yExtent = extent(data.magazines, (d) =>  d.ratio);
    export const yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

    let yTicks = yScale.ticks(5);

</script>

<g id= "scatterplot-y-axis" class="y-axis axis" transform='translate(0, {top})'>

    {#each yTicks as tick}
        <g class = "tick" transform='translate(0, {yScale(tick)})'>
            <text>{(tick)}</text>
        </g>
    {/each}

    <!-- <line x1={margin.left} y1=0
          x2={margin.left} y2={innerHeight}
          stroke = 'black' /> -->
</g> 