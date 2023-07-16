<script>
    import { extent, rollup, mean } from "d3-array";
    import { scaleLinear, scaleTime } from "d3-scale";
    import { timeParse } from 'd3-time-format';
    import { browser } from '$app/environment';

    export let data;

    // parsing dates
    const parseDate = timeParse('%Y%m%d');
    const parseYear = timeParse('%Y');

    // annual mean
    let yearlyMean = rollup(data.magazines, v => mean(v, d => d.ratio), d => d.year);

    // set-up
    // let browserWidth;
    // let browserHeight;

     // dimensions
    let screenWidth; 
    let screenHeight;

    function resize() {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
    }

    if (browser) {
        resize()
    }
    
    let width;

    $: if (screenWidth <= 860) {
        width = 0.8 * screenWidth
    } else {
        width = 0.6 * screenWidth;
    }

    $: height = 0.6 * screenHeight;

    const margin = {top: 30, left: 50, right: 30, bottom:30};

    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;
    
    // scales
    let xExtent = extent(data.magazines, (d) =>  parseYear(d.year));
    let yExtent = extent(data.magazines, (d) =>  d.ratio);

    $: xScale = scaleTime().domain(xExtent).range([0,innerWidth]);
    $: yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

    // make ticks
	$: xTicks = xScale.ticks(5);
    $: xTickFormat = xScale.tickFormat(5, "%Y");

	$: yTicks = yScale.ticks(5);
    $: yTickFormat = yScale.tickFormat(5, "%");

    // attributes
    let datapointHeight = 2;
    let datapointOpacity = 0.3
    let meanFillColour = "#fc0000"
    $: datapointWidth = innerWidth / 13;

</script>

 <svelte:window on:resize={resize}/>

<svg id = "scatterplot" {width} {height}>

    <g id= "scatterplot-x-axis" class="x-axis axis" transform='translate({margin.left},0)'>

		{#each xTicks as tick}
			<g class = "tick" transform='translate({xScale(tick)}, 0)'>
				<text y={height}>{xTickFormat(tick)}</text>
			</g>
		{/each}

        <!-- <line x1=0         y1={innerHeight + margin.top} 
              x2={width}   y2={innerHeight + margin.top} 
              stroke = "#e3e3e3"/> -->
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

    #scatterplot {
        margin-left: 10%;
    }
</style>