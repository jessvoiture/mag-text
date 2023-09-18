<script>
  import { fade } from "svelte/transition";
  import { months } from "../stores";
  export let data;
  export let screenWidth;

  let width;

  let displayingCount = 3;

  let mags = data.magazines;
  let sortedMagazinesRatio = [...mags].sort((a, b) => b.ratio - a.ratio);

  $: if (screenWidth <= 860) {
    width = 0.9 * screenWidth;
  } else {
    width = 0.7 * screenWidth;
  }

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;
</script>

<div class="magazine-list" style="width: {width}px;">
  {#each sortedMagazinesRatio.slice(0, displayingCount) as d, i}
    <div class="row" class:last={i == displayingCount - 1}>
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
        <div class="body-text">{$months[d.month - 1]}, {d.year}</div>
        <div class="body-text">{Math.round(d.ratio * 100)}%</div>
      </div>
    </div>

    {#if i !== displayingCount - 1}
      <hr />
    {/if}
  {/each}

  {#if displayingCount < mags.length}
    <button
      on:click={() => (displayingCount = displayingCount + 3)}
      id="loadmore"
      type="button"
      class="see-more-btn"
    >
      Show more
    </button>
  {/if}
</div>

<style>
  .row {
    padding: 10px 20px;
  }

  .magazine-list {
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .list-element {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }

  .row.last {
    position: relative;
  }

  .row.last::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0),
      #180e0d
    ); /* Gradient from transparent to opaque #180e0d */

    pointer-events: none;
  }

  .body-text {
    margin-bottom: 5px; /* Add margin to separate the text elements */
  }

  img {
    max-width: 100px;
    height: auto;
  }

  .original-image {
    position: relative;
  }

  .see-more-btn {
    margin: auto;
  }

  hr {
    width: 100%;
  }
</style>
