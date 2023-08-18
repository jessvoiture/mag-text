<script>
    import { nowShowing } from "../stores";

    export let sortedMagazines;

    export let mag_width;
    export let mag_height;

    export let alt;
    export let type;
    export let imagePathEnding;

    let imgClassName = $nowShowing + "-covers";

    const getImagePath = (path, image_type, ending) => `/${image_type}/${path}${ending}`;

</script>

    
{#each sortedMagazines as magazine}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
        class="{imgClassName} cover"
        src={getImagePath(magazine.Date, type, imagePathEnding)} 
        alt={alt}
        height= {mag_height}
        width= {mag_width}
    />
{/each}