<script>
  import { onMount } from "svelte";
  import { months } from "../stores";
  import MagCaption from "./MagCaption.svelte";

  export let data;
  export let screenWidth;

  onMount(() => {
    sort("ratio");
  });

  const additionalDisplayed = 12;

  let width;
  let sortBy;

  let ascending = true;
  let magWidth = 150;
  let displayingCount = 12;
  let seeMoreWord = "See More";
  let numClickSeeMore = 0;

  let mags = data.magazines;
  let sortedMagazinesRatio = [...mags].sort((a, b) => b.ratio - a.ratio);

  $: if (screenWidth <= 860) {
    width = 0.9 * screenWidth;
  } else {
    width = 0.7 * screenWidth;
  }

  const getImagePath = (path, image_type, ending) =>
    `/${image_type}/${path}${ending}`;

  function sort(by) {
    sortedMagazinesRatio = [...mags].sort((a, b) => {
      if (by === "year") {
        return ascending ? a.year - b.year : b.year - a.year;
      } else if (by === "ratio") {
        return ascending ? b.ratio - a.ratio : a.ratio - b.ratio;
      }
    });

    sortBy = by;
  }

  function toggleSort() {
    ascending = !ascending;
    if (sortBy) {
      sort(sortBy);
    }
  }
</script>

<div class="list-wrapper" style="width: {width}px;">
  <div class="list-header">
    <div class="h2 type-accent">Explore the magazines</div>
    <div class="list-controls">
      <div class="sort-buttons">
        <div class="helper-text body-text">Sort by:</div>
        <button
          class="sort-option"
          class:active={sortBy == "year"}
          on:click={() => sort("year")}>Year</button
        >
        <button
          class="sort-option"
          class:active={sortBy == "ratio"}
          on:click={() => sort("ratio")}>Text %</button
        >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src="/arrows/Arrow_w.svg"
          alt="Sort Arrow"
          class="arrow-icon"
          class:rotate={ascending}
          on:click={toggleSort}
          width="24"
        />
      </div>
    </div>

    <div class="filters" />
  </div>

  <div class="magazine-list">
    {#each sortedMagazinesRatio.slice(0, displayingCount) as d}
      <div class="list-element" style="width: {magWidth}px;">
        <MagCaption {d} {magWidth} showingRatio={true} imageType={"original"} />
      </div>
    {/each}
  </div>

  <div class="pagination">
    {#if numClickSeeMore > 0}
      <div class="see-more-wrapper">
        <button
          on:click={() => {
            displayingCount = additionalDisplayed;
            numClickSeeMore = 0;
          }}
          id="loadmore"
          type="button"
          class="see-more-btn helper-text"
        >
          See less ↑
        </button>
      </div>
    {/if}
    {#if displayingCount < mags.length}
      <div class="see-more-wrapper">
        <button
          on:click={() => {
            displayingCount = displayingCount + additionalDisplayed;
            numClickSeeMore += 1;
          }}
          id="loadmore"
          type="button"
          class="see-more-btn helper-text"
        >
          {seeMoreWord} ↓
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .list-wrapper {
    margin: auto;
  }
  .magazine-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 1rem;
    justify-content: space-between;
  }

  .magazine-list::after {
    content: "";
    flex: auto;
  }

  .h2 {
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 250%;
    text-align: center;
  }

  .sort-buttons {
    display: flex;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }

  .list-header {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
  }

  .sort-buttons button {
    margin-right: 10px;
  }

  .arrow-icon {
    transition: transform 0.3s ease;
    margin-left: 10px;
    cursor: pointer;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .see-more-btn {
    color: #8a8a8a;
    margin: auto;
    cursor: pointer;
  }

  .see-more-btn:hover {
    color: #fcfdfd;
  }

  .see-more-wrapper {
    display: flex;
  }

  .list-element {
    padding-bottom: 20px;
  }

  .sort-option {
    font-family: "encode";
    font-size: 14pt;
    border-radius: 4pt;
    color: #fcfdfd;
    background-color: #180e0d;
    /* border: 1px solid #fcfdfd; */
    padding: 4px 12px;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px #fcfdfd; /* Add an inset box shadow */
  }

  .sort-option.active,
  .sort-option:hover {
    font-family: "encode";
    color: #180e0d;
    background-color: #fcfdfd;
    border: 0px;
  }

  .sort-buttons button {
    margin-right: 0;
    margin-left: 10px;
  }
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .helper-text {
    font-family: "encode";
    font-size: 14pt;
  }
</style>
