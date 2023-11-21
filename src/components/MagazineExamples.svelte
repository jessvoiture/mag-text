<script>
  import MagCaption from "./MagCaption.svelte";

  export let magList;
  export let showingRatio;
  export let screenWidth;

  let magWidth;
  let gap = 30;

  console.log(screenWidth);

  $: if (typeof screenWidth === "number") {
    if (screenWidth <= 1200) {
      magWidth = 150;
    } else {
      magWidth = (screenWidth / 2 - 3 * gap) / 4;
    }
    console.log(magWidth);
  } else {
    console.error("screenWidth is not a number:", screenWidth);
  }
</script>

<div class="example-wrapper">
  {#each magList as d}
    <div class="example">
      <MagCaption
        {d}
        {magWidth}
        {showingRatio}
        imageType={"special"}
        colour={"white"}
      />
    </div>
  {/each}
</div>

<style>
  .example-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    margin: 5vh 2vw;
    gap: 24px;
  }
</style>
