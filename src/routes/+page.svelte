<script>
  import { browser } from "$app/environment";

  import Hero from "../components/Hero.svelte";
  import Colophon from "../components/Colophon.svelte";
  import DataPrep from "../components/DataPrep.svelte";
  import MagazineList from "../components/MagazineList.svelte";

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

<!-- <div class="body-section">
  <div class="section">
    <div class="body-text hook">
      As a child in the 2000s, I sourced my social capital from my J-14 magazine
      subscription. The covers were chalk full of celebrity cutouts and text, in
      a seemingly silent protest against negative space. They were an exercise
      in graphic design maximalism and not a far cry from my creations in
      MyPaint. Like crypto, however, this capital quickly became a liability,
      and I had to graduate to more cool forms of literature. I have since
      revisited my love of fashion magazines. But the magazine covers seem more
      naked—the cover stars aren’t framed by clickbait titles in various sized
      type. Where did all the text go?
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      In this tell-all I looked at 13 years of Vogue magazine covers. Caroline
      Weber for the New York Times described it as, "the world's most
      influential fashion magazine"—or as contemporary philosopher Carrie
      Bradshaw so eloquently puts it, Mecca. To begin, let’s look at a cover…
    </div>
  </div>
</div> -->

<DataPrep {data} {screenHeight} {screenWidth} />
<MagazineList {data} {screenWidth} />
<Colophon />

<style>
  :global(body) {
    /* this will apply to <body> */
    margin: 0;
    padding: 0;
  }

  .body-section {
    font-size: 14pt;
    line-height: 18pt;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .section {
    margin: 0 auto; /* Horizontally center the sections */
    margin-bottom: 20px;
    padding-bottom: 24px;
  }

  @media (max-width: 800px) {
    .section {
      max-width: 85vw;
    }
  }

  @media (min-width: 800px) {
    .section {
      max-width: 50vw;
    }
  }
</style>
