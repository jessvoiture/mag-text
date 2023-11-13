<script>
  import Colophon from "./Colophon.svelte";
</script>

<div class="footer">
  <div class="section">
    <div class="footer-title">Methods</div>
    <div class="methods-section">
      US Vogue magazine covers were sourced from
      <a target="_blank" href="https://archive.vogue.com/"
        >Vogue's online archive.</a
      > I manually annotated the cover lines—or text areas—on the covers, using black
      boxes to denote text areas and white to denote the background. I did not include
      the masthead which appeared in a similar size and position on every cover.
      Nor did I include diagonal text that occasionally appeared on a banner on top
      of the masthead. As this was a manual process completed over a few months,
      it was undoubtedly subject to inconsistencies and human error. Only covers
      from 2000 to 2022 were annotated as this I am a one man band, but this time
      period was long enough to illustrate a trend.
    </div>
    <div class="methods-section">
      The annotations were processed in Python using OpenCV to find the
      coordinates and dimensions of the black rectangles on the image and to
      calculate the percentage of black pixels to the total image size.
    </div>
    <div class="methods-section">
      This wee site was made using sveltekit, d3, and scrollama. The
      development—both conceptually and technically—was greatly assisted by
      several wonderful resources. Including but not limited to:
      <ul>
        <li>
          <a
            target="_blank"
            href="https://learn.svelte.dev/tutorial/introducing-sveltekit"
            >the Sveltekit</a
          >
          and
          <a
            target="_blank"
            href="https://learn.svelte.dev/tutorial/welcome-to-svelte">Svelte</a
          >
          tutorials by svelte plus Rich Harris' courses on
          <a
            target="_blank"
            href="https://frontendmasters.com/courses/svelte-v2/"
            >frontend masters</a
          >
        </li>
        <li>
          <a target="_blank" href="pudding.cool">The Pudding,</a>
          including the
          <a target="_blank" href="https://pudding.cool/resources/"
            >how-to blogs,</a
          >
          <a
            target="_blank"
            href="https://github.com/the-pudding/svelte-starter"
            >the svelte starter,</a
          >
          and the
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=lqvY_0gJf_I&t=812s"
            >svelte way youtube series</a
          >
        </li>
        <li>
          <a target="_blank" href="https://www.connorrothschild.com/"
            >Connor Rothschild's</a
          >
          blog posts, specifically this one on
          <a
            target="_blank"
            href="https://www.connorrothschild.com/post/svelte-scrollytelling"
            >scrollytelling with scrollama</a
          >
        </li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="footer-title">Colophon</div>
    <Colophon />
  </div>

  <div class="section">
    <div class="footer-title">
      <a target="_blank" href="https://github.com/jessvoiture/mag-text"
        >Github</a
      >
    </div>
  </div>
</div>

<style>
  .footer {
    background-color: #221919;
    padding-top: 5vh;
    padding-bottom: 5vh;
  }

  .footer-title {
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    color: #8a8a8a;
    font-family: "encode";
    font-size: 10pt;
    margin-bottom: 10px;
  }

  .methods-section {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 2px 16px;
  }
</style>
