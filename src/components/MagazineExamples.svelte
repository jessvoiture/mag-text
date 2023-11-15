<script>
  import MagCaption from "./MagCaption.svelte";

  export let magList;

  let magWidth = "200";
</script>

<div class="example-wrapper">
  {#each magList as d}
    <div class="example">
      <MagCaption
        {d}
        {magWidth}
        showingRatio={false}
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
    gap: 30px;
  }
</style>
