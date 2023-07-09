<script>
  import { fade } from 'svelte/transition';
  import Scroll from "./Scrolly.svelte";
  import { browser } from '$app/environment';

  export let data;

  // Sort the magazines array based on the Date
  let sortedMagazines = [...data.magazines]
                    .sort((a, b) => a.Date.localeCompare(b.Date))
                    .slice(100, 102);

  // const toggleImage = (event) => {
  //   const img = event.target;
  //   const annotatedPath = img.dataset.annotatedPath;
  //   const originalPath = img.dataset.originalPath;

  //   img.src = img.src.includes('original') ? annotatedPath : originalPath;
  // };

  // scroll
  let currentStep = 0;
  const steps = ["<p>these are the original images</p>", 
                 "<p>these are the annotations</p>",
                ""];

  let show_annotated = false;

  $: if (currentStep >= 1) {
      show_annotated = true;
    } else {
      show_annotated = false;
    }

  // get image path
  const getImagePath = (path, image_type, ending) => `/${image_type}/${path}${ending}`;

  // dimensions
  // let browserHeight;
  // let browserWidth;

</script>

<!-- <svelte:window bind:innerWidth={browserWidth} bind:innerHeight={browserHeight}/> -->

<div class="scroller">
  <div class="mag-gallery" >
    <div class="mag-wrapper">
      <div class='all-original-covers all-covers'>
        {#each sortedMagazines as magazine}
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <img
            class="original-cover cover"
            src={getImagePath(magazine.Date, "original", ".jpg")} 
            alt='Vogue magazine cover from {magazine.Date}'
          />
        {/each}
      </div>

      {#if show_annotated}
        <div class = 'all-annotated-covers all-covers'
          transition:fade> 
          {#each sortedMagazines as magazine}
            <img 
              class="annotated-cover cover"
              src={getImagePath(magazine.Date, "annotated", "-01.png")} 
              alt='A vogue magazine cover from {magazine.Date} (ie the same one displayed earlier in the page) BUT the text areas on the cover are covered by semi-opaque black rectangles and the rest of the cover is a transparent white'
            />
          {/each}
        </div>
      {/if}

    </div>
  </div>

  <Scroll bind:value={currentStep}>
    {#each steps as text, i}
      <div class="step {currentStep == 2 ? "hidden-step" : ""}" 
           class:active={currentStep === i}>
        <div class="step-content">
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

  .hidden-step {
    visibility: hidden;
  }

  .mag-gallery {
    position: sticky;
    margin: auto;
		flex: 1 1 60%;
    top: 0vh;
    height: 60vh;
  }

  .mag-wrapper {
    position: relative;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    height: 100%;
    margin: 0 auto;
  }

  .all-original-covers {
    position: absolute;
    top: 0;
    left: 0;
  }

  .all-annotated-covers {
    opacity: 0.7;
  }

  .all-covers {
    flex-direction: column
  }

  .cover {
    height: 50vh;
  }

</style>
