<script>
    import ImageGallery from "../components/ImageGallery.svelte";
    import Hero from "../components/Hero.svelte";
    import Barchart from "../components/Barchart.svelte";
    import { browser } from '$app/environment';
    
    export let data;

    let screenWidth; 
    let screenHeight;
    let innerHeight;
    let innerWidth;

    function resize() {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
    }

    if (browser) {
        resize()
    }
    
    let width;

    $: if (screenWidth <= 860) {
        width = 0.8 * screenWidth
    } else {
        width = 0.6 * screenWidth;
    }

    $: height = 0.6 * screenHeight;

    const margin = {top: 30, left: 50, right: 30, bottom:30};

    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;
    
</script>

<svelte:window on:resize={resize}/>

<Hero />
<ImageGallery {data} {height} />
<Barchart {data} {height} {width} top={margin.top} left={margin.left} {innerHeight} {innerWidth} />