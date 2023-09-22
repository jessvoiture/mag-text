<script>
  import { browser } from "$app/environment";

  import Hero from "../components/Hero.svelte";
  import Colophon from "../components/Colophon.svelte";
  import DataPrep from "../components/DataPrep.svelte";
  import MagazineList from "../components/MagazineList.svelte";
  import Introduction from "../components/Introduction.svelte";
  import AnalysisSection from "../components/AnalysisSection.svelte";

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

  console.log("icuqt3.14 😘");
</script>

<svelte:window on:resize={resize} />

<Hero />
<Introduction />
<DataPrep {data} {screenHeight} {screenWidth} />
<AnalysisSection />
<MagazineList {data} {screenWidth} />
<Colophon />
