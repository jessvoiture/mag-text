<script>
  import MagCaption from "./MagCaption.svelte";

  export let magList;

  let magWidth = "200";
</script>

<div class="example-wrapper">
  {#each magList as d}
    <div class="example">
      <MagCaption {d} {magWidth} showingRatio={false} imageType={"special"} />
    </div>
  {/each}
</div>

<style>
  .example-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    margin: 5vh 0vh;
  }

  .example {
    margin: 0px 20px;
  }
</style>
