<script>
  import { magDemoDate, months, cumulativeAreaProportion } from "../stores";

  export let options;

  // format the options as Month, Year
  function formatOption(month, year) {
    const monthNames = $months;
    const date = new Date(year, month - 1);
    const monthName = monthNames[date.getMonth()];

    return `${monthName}, ${year}`;
  }

  // reset the contours cumulative area when magazine changes
  function handleDropdown() {
    cumulativeAreaProportion.set(0);
  }
</script>

<form on:change|preventDefault={handleDropdown}>
  <span>Let's start with the a cover. Here is the US Vogue cover from</span>
  <select id="magDemoDate" bind:value={$magDemoDate}>
    {#each options as option (option)}
      <option value={option.Date}
        >{formatOption(option.month, option.year)}</option
      >
    {/each}
  </select>
</form>
