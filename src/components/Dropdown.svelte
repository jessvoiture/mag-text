<script>
  import { magDemoDate, months } from "../stores";

  export let options;
  export let mags;
  $: console.log($magDemoDate);

  function handleDropdown() {
    let selectedMag = [...mags]
      .sort((a, b) => a.Date - b.Date)
      .filter((d) => d.Date == $magDemoDate);

    // guineaPigMag.set(sortedMagazines[0]);
    // whRatio.set(guineaPigMag.wh_ratio);
    // contours.set(guineaPigMag.contours);
  }
</script>

<form on:change|preventDefault={handleDropdown}>
  <select bind:value={$magDemoDate}>
    {#each options as option (option)}
      <option value={option.Date}>{option.Date}</option>
    {/each}
  </select>
</form>
