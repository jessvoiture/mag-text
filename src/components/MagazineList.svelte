<script>
  import { fade } from "svelte/transition";
  import { months } from "../stores";
  export let data;
  export let screenWidth;

  let width;

  let showingAnnotations = false;
  let displayingCount = 3;

  let mags = data.magazines;
  let sortedMagazinesRatio = [...mags].sort((a, b) => b.ratio - a.ratio);

  $: if (screenWidth <= 860) {
    width = 0.9 * screenWidth;
  } else {
    width = 0.6 * screenWidth;
  }

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;
</script>

<div class="magazine-list" style="width: {width}px;">
  {#each sortedMagazinesRatio.slice(0, displayingCount) as d}
    <div class="list-element">
      <div class="list-img">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          class="original-image"
          src={getImagePath(d.Date, "original", ".jpg")}
          alt="Vogue cover"
        />
      </div>
      <div class="meta-info">
        <div class="body-text">{$months[d.month - 1]}, {d.year}</div>
        <div class="body-text">{Math.round(d.ratio * 100)}%</div>
      </div>
    </div>
  {/each}

  {#if displayingCount < mags.length}
    <button
      on:click={() => (displayingCount = displayingCount + 3)}
      id="loadmore"
      type="button"
      class="btn btn-secondary"
    >
      Show more
    </button>
  {/if}
</div>

<style>
  .magazine-list {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    ); /* Adjust the minmax values to control the column width */
    gap: 10px; /* Adjust the gap between items */
    margin: auto;
  }

  .list-element {
    padding: 10px; /* Add padding to the elements for some spacing */
  }

  .body-text {
    margin-bottom: 5px; /* Add margin to separate the text elements */
  }

  img {
    width: 100%;
    height: auto;
  }

  .meta-info {
    display: flex;
    justify-content: space-between;
  }

  .original-image {
    position: relative;
  }
</style>
