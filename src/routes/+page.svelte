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

<div class="body-section">
  <div class="section">
    <div class="body-text hook">
      Do you remember where you were when Rihanna’s May 2022 US Vogue cover
      story dropped? I do. I first saw the visuals on instagram and then again
      on reddit. The photographs, lensed by Annie Leibovitz, and the fashion,
      styled by Alex Harrington And Jahleel Weaver, were nothing short of
      magnificent. I was gagged.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      I saw the magazine cover in print a few weeks later. It was like many
      Vogue covers, complete with the signature masthead at the top and one main
      image. The text on the front read, “Oh, Baby! Rihanna’s Plus One.”
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      I was once again stunned. You see, as a child of the 2000s, I am no
      stranger to the symphony of clickbait titles—aka cover lines—that used to
      adorn fashion magazines. But, this cover had merely 5 words. 29
      characters. Where had all the coverlines gone?
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      I was set in motion to unearth the lost art of textual exuberance. In this
      extremely important, time sensitive, and highly requested endeavour, I
      analysed 22 years of US Vogue covers to ascertain if the amount of text on
      covers had indeed dwindled. Please, enjoy.
    </div>
  </div>
</div>

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
    margin-bottom: 10px;
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
