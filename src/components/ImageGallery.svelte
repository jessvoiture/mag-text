<script>
  import { fade, slide, draw } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { sort, group } from 'd3-array';
  import { browser } from '$app/environment';
  import { currentStep, nowShowing } from '../stores';

  import Image from './Image.svelte';
  import Scroll from "./Scrolly.svelte";
  import Barchart from './Barchart.svelte';

  export let data;

  let groupedData = [];
  groupedData = group(data.magazines, d => d.year)

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

  $: mag_height = 0.7 * screenHeight;

  // Sort the magazines array based on the Date
  let sortedMagazines = [...data.magazines]
                    .sort((a, b) => a.Date - b.Date)
                    .slice(100, 101);

  // const toggleImage = (event) => {
  //   const img = event.target;
  //   const annotatedPath = img.dataset.annotatedPath;
  //   const originalPath = img.dataset.originalPath;

  //   img.src = img.src.includes('original') ? annotatedPath : originalPath;
  // };

  // scroll
  // let currentStep = 0;
  const steps = ["<p>these are the original images</p>", 
                 "<p>these are the annotations overlayed</p>",
                 "<p>these are the annotations</p>",
                 "<p>these are the ratios</p>",
                 "<p>this is the data by month</p>",
                 "<p>this is the data by month but the heights are better</p>",
                 "<p>this is the data as a bar chart</p>",
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
    } else if ($currentStep == 5) {
      nowShowing.set('chart');
    } else if ($currentStep == 6) {
      nowShowing.set('chart');
    } else if ($currentStep == 7) {
      nowShowing.set('chart');
    } 

    let mag_width;

    function findMagWidth(magazine, mag_height) {
      mag_width = mag_height * magazine.wh_ratio;
      return mag_width
    }

</script>

<svelte:window on:resize={resize} />

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
            {$nowShowing}
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
              {$nowShowing}
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
              {$nowShowing}
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
              {$nowShowing}
              alt={"Vogue magazine cover (the same one displayed earlier in the page) BUT the text areas on the cover are covered by semi-opaque black rectangles and the rest of the cover is a transparent white"}
            />
        </div>
      {/if}

      {#if $nowShowing == 'ratios'}
        <div class = 'all-ratio-covers all-covers' 
          style = 'width: {findMagWidth(sortedMagazines[0], mag_height)}px' 
          in:fade={{ delay: 200 }}
          out:fade> 

          {#each sortedMagazines as magazine}

            <div id="no-text-mag" class="ratio-cover"
            style = "height: {mag_height * (1 - magazine.ratio)}px;
                    width: {findMagWidth(magazine, mag_height)}px"
            >
            </div>

            <div id="text-mag" class="ratio-cover"
            style = "height: {mag_height * magazine.ratio}px;
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
        <p>hello</p>
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

  .all-original-covers, .all-annotated-only-covers, .all-ratio-covers {
      position: absolute;
      top: 0;
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

</style>
