<script>
    import { fade, slide, fly, draw } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { sort, group, extent } from 'd3-array';
    import { browser } from '$app/environment';
    import { currentStep, nowShowing } from '../stores';
    import { scaleOrdinal, scaleLinear } from 'd3-scale';
    import { tweened } from 'svelte/motion';
  
    import Image from './Image.svelte';
    import Scroll from "./Scrolly.svelte";
    import Barchart from './Barchart.svelte';
  
    export let data;
    export let screenHeight;
    export let screenWidth;

    let width;
    let groupedData = [];

    const margin = {top: 30, left: 50, right: 30, bottom:30};

    $: if (screenWidth <= 860) {
        width = 0.8 * screenWidth
    } else {
        width = 0.7 * screenWidth;
    }

    $: height = 0.6 * screenHeight;

    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;
  
    groupedData = group(data.magazines, d => d.year)
  
    $: mag_height = 0.7 * screenHeight;
  
    // Sort the magazines array based on the Date
    let sortedMagazines = [...data.magazines]
                      .sort((a, b) => a.Date - b.Date)
                      .slice(100, 101);
  

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
        values.forEach((d) => {
            cumulativeSum += d.ratio;
            cumulativeData.push({...d, total: cumulativeSum});
        });
    });

    $: tweenedY = tweened(cumulativeData.map((d) => d.month));
    $: rectWidth = (innerWidth / 14) * 0.95;
    $: yScaleTranslate = (innerWidth / 12) / 4

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

    // scroll
    // let currentStep = 0;
    const steps = ["<p>these are the original images</p>", 
                   "<p>these are the annotations overlayed</p>",
                   "<p>these are the annotations</p>",
                   "<p>these are the ratios</p>",
                   "<p>this is the data by month</p>",
                   "<p>this is the data by month but the heights are better</p>",
                //    "<p>this is the data as a bar chart</p>",
                   "<p>this is the data as a scatterplot</p>"
                  ];
  
    $: if ($currentStep == 0) {
        nowShowing.set('original');
      } else if ($currentStep == 1) {
        nowShowing.set('overlay');
      } else if ($currentStep == 2) {
        nowShowing.set('annotated');
      } else if ($currentStep == 3) {
        nowShowing.set('ratios');
      } else if ($currentStep == 4) {
        nowShowing.set('chart');
        setMonthValues();
      } else if ($currentStep == 5) {
        nowShowing.set('chart');
        setRelativeHeightValues();
      } else if ($currentStep == 6) {
        nowShowing.set('chart');
        setRatioValues();
      } 
  
      let mag_width;
  
      function findMagWidth(magazine, mag_height) {
        mag_width = mag_height * magazine.wh_ratio;
        return mag_width
      }
  
  </script>
  
  <div class="scroller">
    <div class="mag-gallery" >
      <div class="mag-wrapper">
  
        {#if $nowShowing == 'original'}
          <div class='all-original-covers all-covers'
            out:fade>
            <Image 
              {sortedMagazines}
              {mag_height}
              type={'original'}
              imagePathEnding={'.jpg'}
              alt={"Vogue magazine cover"}
            />
          </div>
        {/if}
  
        {#if $nowShowing == 'overlay'}
          <div class='all-original-covers all-covers'
            transition:fade>
              <Image 
                {sortedMagazines}
                {mag_height}
                type={'original'}
                imagePathEnding={'.jpg'}
                alt={"Vogue magazine cover"}
              />
          </div>
  
          <div class='all-annotated-covers all-covers'
            transition:fade> 
              <Image 
                {sortedMagazines}
                {mag_height}
                type={'annotated'}
                imagePathEnding={'-01.png'}
                alt={"Vogue magazine cover (the same one displayed earlier in the page) BUT the text areas on the cover are covered by semi-opaque black rectangles and the rest of the cover is a transparent white"}
              />
          </div>
        {/if}
  
        {#if $nowShowing == 'annotated'}
          <div class='all-annotated-only-covers all-covers'
            transition:fade> 
              <Image 
                {sortedMagazines}
                {mag_height}
                type={'annotated'}
                imagePathEnding={'-01.png'}
                alt={"Vogue magazine cover (the same one displayed earlier in the page) BUT the text areas on the cover are covered by semi-opaque black rectangles and the rest of the cover is a transparent white"}
              />
          </div>
        {/if}
  
        {#if $nowShowing == 'ratios'}
          <div class = 'all-ratio-covers all-covers' 
            style = 'width: {findMagWidth(sortedMagazines[0], mag_height)}px' 
            in:slide={{ delay: 200 }}
            out:fade> 
  
            {#each sortedMagazines as magazine}

                <div id="text-mag" class="ratio-cover"
                style = "height: {mag_height * magazine.ratio}px;
                        width: {findMagWidth(magazine, mag_height)}px"
                >
                </div> 

                <div id="no-text-mag" class="ratio-cover"
                style = "height: {mag_height * (1 - magazine.ratio)}px;
                        width: {findMagWidth(magazine, mag_height)}px"
                >
                </div>

            {/each}
          </div>
          <!-- 
          <svg>
            <path
              in:draw = {{ duration: 2000, delay: 1000 }}
              out:draw = {{ duration: 400 }}
              d="M {(screenWidth - findMagWidth(sortedMagazines[0], mag_height)) / 2 - 50},
                    {0.15 * screenHeight + mag_height * (1 - sortedMagazines[0].ratio)} 
                h {findMagWidth(sortedMagazines[0], mag_height) + 85 }
                z"
              fill="none"
              stroke="red"
              stroke-width="2px"
            />
          </svg> -->
        {/if}
  
        {#if $nowShowing == 'chart'}
            <div class="chart"
                >
                <svg {width} {height}>

                    <g height={innerHeight} width={innerWidth}
                        transform='translate({margin.left}, {margin.top})'>
                        {#each cumulativeData as d, index}
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                            <rect
                                class="mag-chart-rect"
                                x={xScale(d.year)} 
                                y={yScale($tweenedY[index]) - rectTranslation} 
                                width={rectWidth}
                                height={rectHeightMultiplyingFactor * d.ratio + rectHeightAddition}
                                in:fly={{ delay: index * 5 }}
                     
                                on:mouseover={function(event) {hoveredDatapoint = d; setMousePosition(event)}}
                                on:mouseout={function() {hoveredDatapoint = undefined}}
                
                            />
                        {/each}
                    </g>
                
                    <g transform='translate({margin.left},0)'>
                        {#each xTicks as tick}
                            <g transform='translate({xScale(tick)}, 0)'>
                                <text y={height}>{tick}</text>
                            </g>
                        {/each}
                    </g>
                
                    <g transform='translate(0, {margin.top})'>
                        {#each yTicks as tick}
                            <g class = "tick" transform='translate(0, {yScale(tick) - yScaleTranslate})'>
                                <text>{tick}</text>
                            </g>
                
                            <!-- <line x1=0         y1={yScale(tick)} 
                                x2={width}   y2={yScale(tick)} 
                            stroke = "#e3e3e3"/> -->
                        {/each}
                    </g> 
                
                </svg>
            </div>

            {#if hoveredDatapoint != undefined }
                <div class="tooltip"
                    width=30
                    height="auto"
                    style="left: {mouse_x + 10}px; top: {mouse_y - 10}px">
                    <p>{hoveredDatapoint.Date}</p>
                    <p>{Math.round(hoveredDatapoint.ratio * 100)}</p>
                </div>
            {/if}
        {/if}
        
      </div>
    </div>
  
    <Scroll bind:value={$currentStep}>
      {#each steps as text, i}
        <div class="step" 
             class:active={$currentStep === i}>
          <div class="step-content">
            {@html text}
          </div>
        </div>
      {/each}
    </Scroll>
  </div>
  
  <style>
    .all-covers {
      margin-top: 15vh;
    }
  
    .step {
      height:110vh;
      display: flex;
      place-items: center;
      justify-content: center;
    }
  
    .step-content {
      background: whitesmoke;
      color: #ccc;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: background 500ms ease;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
      z-index: 10;
    }
  
    .step.active .step-content {
      background: white;
      color: black;
    }
  
    /* .hidden-step {
      visibility: hidden;
    } */
  
    .mag-gallery {
      position: sticky;
      margin: auto;
      flex: 1 1 60%;
      top: 0vh;
      height: 100vh;
    }
  
    .mag-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }
  
    .all-original-covers, .all-annotated-only-covers, .all-ratio-covers, .chart {
        position: absolute;
        top: 0;
    }

    .chart {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
  
    .all-annotated-covers {
        opacity: 0.7;
    }
  
    .all-covers {
        display: flex;
        flex-wrap: wrap;
        align-self: center;
        justify-content: center;
        column-gap: 40px;
    }
  
    #no-text-mag {
      background:#f2f2f2;
    }
  
    #text-mag {
      background:black;
    }
  
    /* svg {
      overflow: visible;
      z-index: 999;
    } */

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
  