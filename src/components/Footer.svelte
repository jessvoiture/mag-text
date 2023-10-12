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
      calculate the percentage of black pixels to the total image size. The
      detection of black rectangles was fairly good but sometimes presented
      false positives (eg black rectangles that were not in the original image).
      These were (hopefully all) culled manually.
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
          the <a
            target="_blank"
            href="https://github.com/russellsamora/scrollama">scrollama</a
          > documentation and examples by Russell Samora
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
    <!-- <div class="methods-section last">
      Research on the history of text on magazines was conducted during
      September 2023. I have included hyperlinks to articles and research
      surrounding the mysterious disappearance of text above, but here is the
      complete list for easy clicking!
      <ul>
        <li>
          <a
            target="_blank"
            href="https://www.moma.org/interactives/objectphoto/publications/788.html"
            >First US Vogue with a photographed cover image</a
          >by MOMA
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.theringer.com/2018/9/4/17816298/magazine-cover-industry-2018"
            >Judging by the Cover: How the Magazine Industry’s Identity Crisis
            Is Playing Out on Its Front Page</a
          >by Alyssa Bereznak for The Ringer
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7966324/"
            >What's Up with the Cover?</a
          >by M. Castillo, editor-in-chief (aka the Miranda Priestly) of the
          American Journal of Neuroradiology
        </li>
        <li>
          <a
            target="_blank"
            href="https://3ptscomm.medium.com/design-through-the-decades-the-evolution-of-graphic-design-over-the-last-50-years-and-beyond-617a20f8b61d"
            >Design through the Decades</a
          > by 3Points Communications
        </li>
        <li>
          <a
            target="_blank"
            href="https://web.archive.org/web/20230409202208/nytimes.com/1999/01/30/business/trading-on-hollywood-magic-celebrities-push-models-off-women-s-magazine-covers.html"
            >Trading on Hollywood Magic; Celebrities Push Models Off Women's
            Magazine Covers</a
          >by Alex Kuczynski for The New York Times
        </li>
        <li>
          Wikipedia entry for
          <a target="_blank" href="https://en.wikipedia.org/wiki/Instagram"
            >Instagram</a
          >
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.nucreative.co.uk/post/graphic-design-trends-of-the-last-decade"
            >Graphic Design Trends of the Last Decade</a
          > by Nnamdi Odiaka for NU Creative
        </li>
        <li>
          <a
            target="_blank"
            href="https://d2cu82y6eo7f22.cloudfront.net/2022/02/07212140/JMM_5.1_Grow.pdf"
            >Magazine Covers and Cover Lines: An Illustrated History</a
          > by Gerald Grow of Florida A&M University
        </li>
      </ul>
    </div> -->
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
