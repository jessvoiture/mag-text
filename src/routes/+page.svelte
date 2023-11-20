<script>
  import { browser } from "$app/environment";

  import Hero from "../components/Hero.svelte";
  import ScrollyWrapper from "../components/ScrollyWrapper.svelte";
  import MagazineList from "../components/MagazineList.svelte";
  import Introduction from "../components/Introduction.svelte";
  import Footer from "../components/Footer.svelte";

  export let data;

  let screenWidth;
  let screenHeight;

  function resize() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
  }

  if (browser) {
    resize();
  }
</script>

<svelte:window on:resize={resize} />

<Hero />
<Introduction />
<ScrollyWrapper {data} {screenHeight} {screenWidth} />
<MagazineList {data} {screenWidth} />
<Footer />
