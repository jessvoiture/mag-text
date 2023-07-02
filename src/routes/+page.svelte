<script>
    import ImageGallery from "../components/ImageGallery.svelte";
    import Scatterplot from "../components/Scatterplot.svelte";
    export let data;
    
</script>

<ImageGallery {data}/>
<Scatterplot {data}/>
