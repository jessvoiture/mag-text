<script>
  import { months } from "../stores";

  export let data;
  export let screenWidth;

  let width;
  let sortBy;

  let ascending = true;
  let magWidth = 100;

  let mags = data.magazines;
  let sortedMagazinesRatio = [...mags].sort((a, b) => b.ratio - a.ratio);

  $: if (screenWidth <= 860) {
    width = 0.9 * screenWidth;
  } else {
    width = 0.7 * screenWidth;
  }

  $: displayingCount = 9;

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;

  function sort(by) {
    if (by === sortBy) {
      ascending = !ascending;
    } else {
      ascending = true;
    }

    sortedMagazinesRatio = [...mags].sort((a, b) => {
      if (by === "year") {
        return ascending ? a.year - b.year : b.year - a.year;
      } else if (by === "ratio") {
        return ascending ? b.ratio - a.ratio : a.ratio - b.ratio;
      }
    });

    sortBy = by;
  }
</script>

<div class="sort-buttons">
  <button on:click={() => sort("year")}>Sort by Year</button>
  <button on:click={() => sort("ratio")}>Sort by Ratio</button>
</div>

<div class="list-wrapper" style="width: {width}px;">
  <div class="magazine-list">
    {#each sortedMagazinesRatio.slice(0, displayingCount) as d}
      <div class="list-element" style="width: {magWidth}px;">
        <div class="list-img">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <img
            class="original-image"
            style="width: {magWidth}px; height: auto;"
            src={getImagePath(d.Date, "original", ".jpg")}
            alt="Vogue cover"
          />
        </div>
        <div class="meta-info">
          <div class="body-text">{d.year} — {$months[d.month - 1]}</div>
          <div class="body-text">{Math.round(d.ratio * 100)}%</div>
        </div>
      </div>
    {/each}
  </div>

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
  .list-wrapper {
    margin: auto;
  }
  .magazine-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    width: 100%;
    margin: auto;
  }

  .list-element {
    padding: 10px;
  }

  .body-text {
    margin-bottom: 5px; /* Add margin to separate the text elements */
  }

  .original-image {
    position: relative;
  }

  .sort-buttons {
    margin-bottom: 10px;
  }

  .sort-buttons button {
    margin-right: 10px;
  }

  .see-more-btn {
    margin: auto;
  }
</style>
