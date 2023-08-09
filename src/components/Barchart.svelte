<script>
    import { tweened } from 'svelte/motion';
    import { extent, group } from "d3-array";
    import { scaleLinear, scaleOrdinal } from "d3-scale";
    import { currentStep } from '../stores';

    export let data;
    export let height;
    export let width;
    export let innerHeight;
    export let innerWidth;
    export let left;
    export let top;

    let mags = data.magazines;

    let tweenedY;
    let rectHeightMultiplyingFactor;
    let rectHeightAddition;
    let rectTranslation;
    let mouse_x, mouse_y; 
    let yTickCount; 

    let yVals = "month";
    let hoveredDatapoint = undefined;
    let ratioExtent = extent(mags, (d) => d.ratio)
    let ratioMax = ratioExtent[1];

    mags.sort((a, b) => a.Date - b.Date)

    const groupedMags = group(mags, d => d.year);
    const cumulativeData = [];

    groupedMags.forEach((values, year) => {
        let cumulativeSum = 0
        values.forEach((d, index) => {
            cumulativeSum += d.ratio;
            // const total = index === 0 ? 0 : cumulativeSum - d.ratio; 
            cumulativeData.push({...d, total: cumulativeSum});
        });
    });

    $: tweenedY = tweened(cumulativeData.map((d) => d.month));
    $: rectWidth = (innerWidth / 14) * 0.95;
    $: yScaleTranslate = (innerWidth / 12) / 4

    const setTotalValues = function () {
        yVals = "total";
        tweenedY.set(cumulativeData.map((d) => d.total));
    };

    const setRatioValues = function () {
        yVals = "ratio";
        tweenedY.set(cumulativeData.map((d) => d.ratio));
    };

    const setMonthValues = function () {
        yVals = "month";
        tweenedY.set(cumulativeData.map((d) => d.month));
    };

    const setRelativeHeightValues = () => {
        yVals = "relative"
        tweenedY.set(cumulativeData.map((d) => (d.month)));
    };  

    $: yExtent = extent($tweenedY);
    $: xExtent = extent(mags, (d) =>  d.year);

    $: xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
    $: yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

    $: if (yVals == "month") {
        rectHeightMultiplyingFactor = (innerHeight / 12);
        rectHeightAddition = 0;
        rectTranslation = (innerHeight / 12);
        yTickCount = 12;
    }  else if (yVals == "total") {
        rectHeightMultiplyingFactor = innerHeight / yExtent[1];
        rectHeightAddition = 0;
        rectTranslation = 0;
        yTickCount = 4;
    } else if (yVals == "ratio") {
        rectHeightMultiplyingFactor = 0;
        rectHeightAddition = 2;
        rectTranslation = 0;
        yTickCount = 4;
    } else if (yVals == "relative") {
        rectHeightMultiplyingFactor = (innerHeight / 12) / ratioMax;
        rectHeightAddition = 0;
        rectTranslation = (innerHeight / 12);
        yTickCount = 12;
    }

    // make ticks
	$: xTicks = xScale.ticks(5);
	$: yTicks = yScale.ticks(yTickCount);

    let colScale = scaleOrdinal()
        .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'])
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
                        
    const setMousePosition = function(event) {      
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    }

    if ($currentStep == 4){
       setMonthValues() 
    } else if ($currentStep == 5) {
        setRelativeHeightValues() 
    } else if ($currentStep == 6) {
        setTotalValues()
    } else if ($currentStep == 7) {
        setRatioValues();
    } 

</script>

<div {width}>
<button on:click={setTotalValues}>Total</button>
<button on:click={setRatioValues}>Ratio</button>
<button on:click={setMonthValues}>Month</button>
<button on:click={setRelativeHeightValues}>Change Height</button>

</div>

<svg {width} {height}>

    <g height={innerHeight} width={innerWidth}
        transform='translate({left}, {top})'>
        {#each cumulativeData as d, index}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<rect
                class="mag-chart-rect"
                x={xScale(d.year)} 
                y={yScale($tweenedY[index]) - rectTranslation} 
                width={rectWidth}
                height={rectHeightMultiplyingFactor * d.ratio + rectHeightAddition}
                fill={colScale(d.month)}
                on:mouseover={function(event) {hoveredDatapoint = d; setMousePosition(event)}}
                on:mouseout={function() {hoveredDatapoint = undefined}}

            />
		{/each}
    </g>

    <g transform='translate({left},0)'>
		{#each xTicks as tick}
			<g transform='translate({xScale(tick)}, 0)'>
				<text y={height}>{tick}</text>
			</g>
		{/each}
	</g>

    <g transform='translate(0, {top})'>
		{#each yTicks as tick}
			<g class = "tick" transform='translate(0, {yScale(tick) - yScaleTranslate})'>
				<text>{tick}</text>
			</g>


            <line x1=0         y1={yScale(tick)} 
                  x2={width}   y2={yScale(tick)} 
            stroke = "#e3e3e3"/>
		{/each}
	</g> 

</svg>

{#if hoveredDatapoint != undefined }
    <div class="tooltip"
        width=30
        height="auto"
         style="left: {mouse_x + 10}px; top: {mouse_y - 10}px">
        <p>{hoveredDatapoint.Date}</p>
        <p>{Math.round(hoveredDatapoint.ratio * 100)}</p>
    </div>
{/if}

<style>
    .tooltip {                           
        position: fixed;
        background-color: white;
        padding: 3px;
        border: solid 1px;
    }

    p {
        margin: 0;
    }

    .mag-chart-rect {
        transition: height 0.3s ease
    }

</style>