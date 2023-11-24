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
      > I manually annotated the cover lines on the covers, using black
      boxes to denote text areas and white to denote the background. I did not include
      the masthead which appeared in a similar size and position on every cover.
      Nor did I include diagonal text that occasionally appeared on a banner on top
      of the masthead. As this was a manual process completed over a few months,
      it was undoubtedly subject to inconsistencies and human error. 
    </div>
    <div class="methods-section">
      The annotations were processed in Python using OpenCV to find the
      coordinates and dimensions of the black rectangles on the image and to
      calculate the percentage of black pixels to the total image size.
    </div>
    <div class="methods-section">
      This wee site was made with sveltekit, d3, and scrollama.
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
</style>
