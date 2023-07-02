<script>
    import { extent } from "d3-array";
    import { scaleTime } from "d3-scale";
    import { timeParse } from 'd3-time-format';

    export let data;
    export let width;
    export let height;
    export let innerHeight;
    export let innerWidth;
    export let top;
    export let left;

    // parsing dates
    // const parseDate = timeParse('%Y%m%d');
    const parseYear = timeParse('%Y');

    let xExtent = extent(data.magazines, (d) =>  parseYear(d.year));
    export const xScale = scaleTime().domain(xExtent).range([0,innerWidth]);

    // make ticks
	let xTicks = xScale.ticks(5);
    let xTickFormat = xScale.tickFormat(5, "%Y");

</script>

<g id= "scatterplot-x-axis" class="x-axis axis" transform='translate({left},0)'>

    {#each xTicks as tick}
        <g class = "tick" transform='translate({xScale(tick)}, 0)'>
            <text y={height}>{xTickFormat(tick)}</text>
        </g>
    {/each}

    <line x1=0         y1={innerHeight + top} 
          x2={width}   y2={innerHeight + top} 
          stroke = "black"/>
</g>