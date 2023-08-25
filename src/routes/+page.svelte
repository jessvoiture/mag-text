<script>
  import ImageGallery from "../components/ImageGallery.svelte";
  import Hero from "../components/Hero.svelte";
  import Barchart from "../components/Barchart.svelte";
  import { browser } from "$app/environment";
  import ScrollWrapper from "../components/ScrollWrapper.svelte";
  import Colophon from "../components/Colophon.svelte";

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
    resize();
  }

  let width;

  $: if (screenWidth <= 860) {
    width = 0.8 * screenWidth;
  } else {
    width = 0.6 * screenWidth;
  }

  $: height = 0.6 * screenHeight;

  const margin = { top: 30, left: 50, right: 30, bottom: 30 };

  $: innerWidth = width - margin.left - margin.right;
  $: innerHeight = height - margin.top - margin.bottom;
</script>

<svelte:window on:resize={resize} />

<Hero />

<div class="body-section">
  <!-- <div class="section">
        <div class="section-heading">Love Confessions!</div>
        <div class="body-text">
            As a child in the 2000s, I sourced my social capital from my J-14 magazine subscription. The covers were chalk full of celebrity cutouts and text, in a seemingly silent protest against negative space. They were an exercise in graphic design maximalism and not a far cry from my creations in MyPaint. Like crypto, however, this capital quickly became a liability, and I had to graduate to more cool forms of literature. 

            I have since revisited my love of fashion magazines. But the magazine covers seem more naked—the cover stars aren’t framed by clickbait titles in various sized type. Where did all the text go? 
        </div>
    </div>

    <div class="section">
        <div class="section-heading">Tell All</div>
        <div class="body-text">
            In this tell-all I looked at 13 years of Vogue magazine covers. Caroline Weber for the New York Times described it as, "the world's most influential fashion magazine"—or as contemporary philosopher Carrie Bradshaw so eloquently puts it, Mecca. 

            To begin, let’s look at a cover…
        </div>
    </div>-->
</div>

<ScrollWrapper {data} {screenHeight} {screenWidth} />

<Colophon />

<style>
  .section-heading,
  .body-text {
    font-family: sans-serif;
  }

  .section-heading {
    font-size: 18pt;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .body-section {
    font-size: 12pt;
  }

  .section {
    margin-bottom: 20px;
  }

  @media (max-width: 800px) {
    .body-section {
      max-width: 85vw;
    }
  }

  @media (min-width: 800px) {
    .body-section {
      max-width: 50vw;
    }
  }
</style>
