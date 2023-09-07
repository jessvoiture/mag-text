<script>
  import HeroTitle from "./HeroTitle.svelte";
</script>

<div class="hero">
  <div class="heros-wear-capes">
    <img
      class="the-devil-herself"
      src="/thedevilwearsprada/missannawintour.png"
      alt="anna wintour at the met gala. she is shockingly without her iconic glasses and wrapped in a fuzzy pink coat that compliments the pink color of the title"
    />
  </div>

  <div class="superman-logo">
    <HeroTitle />
  </div>
</div>

<style>
  .hero {
    min-height: 100vh; /* Use min-height instead of height */
    /* height: 100%; */
    width: 100vw;
    position: relative;
    display: flex;
    flex-direction: column; /* Make sure it's a column layout */
    overflow: hidden; /* Prevent any potential overflow */
    background: radial-gradient(
      69.96% 103.49% at -1.8% 4.63%,
      #8a8a8a 0%,
      #180e0d 98.79%
    );
    margin-bottom: 20vh;
  }
  .heros-wear-capes {
    max-height: 100vh;
    bottom: 0;
    position: absolute;
  }
  .superman-logo {
    height: 100%;
    display: flex;
    place-items: center;
    position: relative;
  }
  @media (max-width: 800px) {
    .superman-logo {
      display: flex;
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
      margin-top: 10vh;
    }
    .heros-wear-capes {
      right: -33vw;
      min-width: 133vw;
    }
    .the-devil-herself {
      max-width: 150vw;
      min-height: 60vh;
      overflow: hidden;
      position: relative;
    }
  }
  @media (min-width: 800px) {
    .superman-logo {
      right: 0;
      margin-right: 5%;
      margin-left: auto;
      margin-top: 20vh;
    }
    .heros-wear-capes {
      left: 0;
    }
    .the-devil-herself {
      max-width: 67vw;
      max-height: 90vh;
      overflow: hidden;
    }
  }
</style>
