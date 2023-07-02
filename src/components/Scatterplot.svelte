<script>
    import { extent, rollup, mean } from "d3-array";
    import { scaleLinear, scaleTime } from "d3-scale";
    import { timeParse } from 'd3-time-format';

    export let data;

    // parsing dates
    const parseDate = timeParse('%Y%m%d');
    const parseYear = timeParse('%Y');

    // annual mean
    let yearlyMean = rollup(data.magazines, v => mean(v, d => d.ratio), d => d.year);

    // set-up
    let width = 700;
    let height = 600;

    const margin = {top: 30, left: 50, right: 30, bottom:30};

    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;
    
    // scales
    let xExtent = extent(data.magazines, (d) =>  parseYear(d.year));
    let yExtent = extent(data.magazines, (d) =>  d.ratio);

    let xScale = scaleTime().domain(xExtent).range([0,innerWidth]);
    let yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

    // make ticks
	let xTicks = xScale.ticks(5);
    let xTickFormat = xScale.tickFormat(5, "%Y");

	let yTicks = yScale.ticks(5);
    let yTickFormat = yScale.tickFormat(5, "%");

    // attributes
    let datapointHeight = 2;
    let datapointWidth = 20;
    let datapointOpacity = 0.3
    let meanFillColour = "#fc0000"

</script>

<svg id = "scatterplot" {width} {height}>

    <g id= "scatterplot-x-axis" class="x-axis axis" transform='translate({margin.left},0)'>

		{#each xTicks as tick}
			<g class = "tick" transform='translate({xScale(tick)}, 0)'>
				<text y={height}>{xTickFormat(tick)}</text>
			</g>
		{/each}

        <line x1=0         y1={innerHeight + margin.top} 
              x2={width}   y2={innerHeight + margin.top} 
              stroke = "#e3e3e3"/>
	</g>

    <g id= "scatterplot-y-axis" class="y-axis axis" transform='translate(0, {margin.top})'>

		{#each yTicks as tick}
			<g class = "tick" transform='translate(0, {yScale(tick)})'>
				<text>{yTickFormat(tick)}</text>
			</g>
		{/each}

	</g> 

    <g class="datapoints" width={innerWidth} height={innerHeight} 
                    transform='translate({margin.left}, {margin.top})'>

		{#each data.magazines as mag}
			<rect id={mag.Date}
                class="magazine-datapoint"
                x={xScale(parseYear(mag.year))} 
                y={yScale(mag.ratio)} 
                width={datapointWidth}
                height={datapointHeight}
                fill-opacity = {datapointOpacity}
            />
		{/each}
	</g>

    <g class="mean-datapoints" width={innerWidth} height={innerHeight} 
                    transform='translate({margin.left}, {margin.top})'>

		{#each yearlyMean as aMean}
			<rect class="mean-datapoint"
                x={xScale(parseYear(aMean[0]))} 
                y={yScale(aMean[1])} 
                width={datapointWidth}
                height={datapointHeight}
                fill = {meanFillColour}
            />
		{/each}
	</g>

</svg>

<style>
    .axis text {
        font-family: sans-serif;
        font-size: 10pt;
        fill: #000000;
    }
</style>