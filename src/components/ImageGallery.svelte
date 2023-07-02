<script>
  import { group } from 'd3-array';
  export let data;

  const getImagePath = (path) => {
    const imagePath = `/original/${path}.jpg`;
    return imagePath;
  };

  // Group the magazines by year
  $: groupedMagazines = Array.from(
    group(data.magazines, (magazine) => magazine.year)
  );

</script>

<div>
  {#each Array.from(groupedMagazines) as [year, magazinesByYear]}
    <div>
      <h2>{year}</h2>
      {#each magazinesByYear as magazine}
        <img
          src={getImagePath(magazine.Date)}
          alt={magazine.Date}
          width="80"
          height="100"
        />
      {/each}
    </div>
  {/each}
</div>
