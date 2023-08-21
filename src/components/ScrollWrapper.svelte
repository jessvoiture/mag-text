<script>
    import { fade, slide, fly, draw } from 'svelte/transition';
    import { group, extent } from 'd3-array';
    import { currentStep, nowShowing } from '../stores';
    import { scaleOrdinal, scaleLinear } from 'd3-scale';
    import { tweened } from 'svelte/motion';
  
    import Image from './Image.svelte';
    import Scroll from "./Scrolly.svelte";
  
    export let data;
    export let screenHeight;
    export let screenWidth;
    export let screenRatio;

    let width;
    let stepWidth;
    let mag_height;
    let mag_width;
    let groupedData = [];

    let tweenedY;
    let rectHeightMultiplyingFactor;
    let rectHeightAddition;
    let rectTranslation;
    let mouse_x, mouse_y; 
    let yTickCount; 

    const margin = {top: 30, left: 30, right: 30, bottom: 30};

    $: screenRatio = screenWidth / screenHeight;

    $: height = 0.8 * screenHeight;
    $: width = 0.8 * screenWidth;

    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;
  
    groupedData = group(data.magazines, d => d.year)
  
    // Sort the magazines array based on the Date
    let sortedMagazines = [...data.magazines]
                      .sort((a, b) => a.Date - b.Date)
                      .filter((d) => d.Date == 20110901)
  
    let guineaPigMag = sortedMagazines[0];
    let magConstrainingDimension;
    let whRatio = guineaPigMag.wh_ratio

    console.log(guineaPigMag)

    $: if (screenRatio <= whRatio) {
      magConstrainingDimension = "width"
      mag_height = findMagHeight(whRatio, mag_width);
      mag_width = 0.9 * screenWidth;
    } else {
      magConstrainingDimension = "height"
      mag_height = 0.7 * screenHeight;
      mag_width = findMagWidth(whRatio, mag_height);
    }

    let mags = data.magazines;
    let contours = data.contours;

    mags.sort((a, b) => a.Date - b.Date)

    let yVals = "month";
    let hoveredDatapoint = undefined;
    let ratioExtent = extent(mags, (d) => d.ratio)
    let ratioMax = ratioExtent[1];

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

    $: contourXScale = scaleLinear().domain([0, guineaPigMag.width]).range([0, mag_width]);
    $: contourYScale = scaleLinear().domain([0, guineaPigMag.height]).range([0, mag_height]);

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
    const steps = ["<p>In [year], [person] graced the cover of Vogue’s [Month] issue.</p>", 
                   "<p>Next, we can identify all of the text areas on the cover excluding the title</p>",
                   "<p>When we remove the background image, we can start to see the skeleton of the cover and the relative proportions of text to cover.</p>",
                   "<p>The ratio of the text areas to the whole cover is [ratio]. In other words, [percent] of the cover is covered by text.</p>",
                   "<p>Let’s now look at this ratio for all the covers analysed. </p>",
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
      } else if ($currentStep == 3 | $currentStep == 4) {
        nowShowing.set('ratios');
      } else if ($currentStep == 5) {
        nowShowing.set('chart');
        setMonthValues();
      } else if ($currentStep == 6) {
        nowShowing.set('chart');
        setRelativeHeightValues();
      } else if ($currentStep == 7) {
        nowShowing.set('chart');
        setRatioValues();
      } 
  
      function findMagHeight(ratio, mag_width) {
        const h = mag_width * (1 / ratio);
        return h
      }

      function findMagWidth(ratio, mag_height) {
        const w = mag_height * ratio;
        return w
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
              {mag_width}
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
                {mag_width}
                {mag_height}
                type={'original'}
                imagePathEnding={'.jpg'}
                alt={"Vogue magazine cover"}
              />
          </div>
  
          <svg height = {mag_height} width = {mag_width}
          class = 'all-annotated-covers all-covers'
          transition:fade>
            <g>
                <rect
                  x=0
                  y=0
                  width={mag_width}
                  height={mag_height}
                  fill="white"
                  opacity=0.7
                />
            </g>

            <g transform="scale(1, -1)" transform-origin="center">
              {#each contours as contour}
                <rect
                  x={contourXScale(contour.x)}
                  y={mag_height - contourYScale(contour.y + contour.h)}
                  width={contourXScale(contour.w)}
                  height={contourYScale(contour.h)}
                  fill="black"
                />
              {/each}
            </g>
          </svg>
        {/if}
  
        {#if $nowShowing == 'annotated'}
          <svg height = {mag_height} width = {mag_width}
          class = 'all-ratio-covers all-covers'
          transition:fade>
            <g>
                <rect
                  x=0
                  y=0
                  width={mag_width}
                  height={mag_height}
                  fill="white"
                />
            </g>
            <g transform="scale(1, -1)" transform-origin="center">
              {#each contours as contour}
                <rect
                  x={contourXScale(contour.x)}
                  y={mag_height - contourYScale(contour.y + contour.h)}
                  width={contourXScale(contour.w)}
                  height={contourYScale(contour.h)}
                  fill="black"
                />
              {/each}
            </g>
          </svg>
        {/if}
  
        {#if $nowShowing == 'ratios'}
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

          <svg height = {mag_height} width = {mag_width}
            class = 'all-ratio-covers all-covers'>
            <g>
                <rect
                  x=0
                  y=0
                  width={mag_width}
                  height={mag_height}
                  fill="white"
                />
            </g>
            <g transform="scale(1, -1)" transform-origin="center">
              {#each contours as contour}
                <rect
                  x={contourXScale(contour.x)}
                  y={mag_height - contourYScale(contour.y + contour.h)}
                  width={contourXScale(contour.w)}
                  height={contourYScale(contour.h)}
                  fill="black"
                />
              {/each}
            </g>
          </svg>
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
          <div class="step-content" width={stepWidth}>
            {@html text}
          </div>
        </div>
      {/each}
    </Scroll>
  </div>
  
  <style>

    .step {
      height:110vh;
      display: flex;
      place-items: center;
      justify-content: center;
      z-index: 999;
    }
  
    .step-content {
      background: whitesmoke;
      color: #ccc;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      transition: background 500ms ease;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
      z-index: 10;
      height: auto;
    }

    @media (max-width: 800px) {
      .step-content {
        max-width: 85vw;
      }
    }

    @media (min-width: 800px) {
      .step-content {
        max-width: 30vw;
      }
    }
  
    .step.active .step-content {
      background: white;
      color: black;
    }
  
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
  
    .all-covers, .chart {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
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
  

    svg {
      overflow: visible;
    }
  </style>
  