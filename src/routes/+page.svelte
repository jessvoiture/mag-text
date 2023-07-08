<script>
    import ImageGallery from "../components/ImageGallery.svelte";
    import Scatterplot from "../components/Scatterplot.svelte";
    import Hero from "../components/Hero.svelte";
    
    export let data;
    
</script>

<Hero />
<ImageGallery {data} />
<Scatterplot {data} />
 