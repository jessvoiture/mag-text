<script>
  import Colophon from "./Colophon.svelte";
</script>

<div class="footer">
  <div class="section">
    <div class="footer-title">Methods</div>
    <div>
      US Vogue magazine covers were sourced from
      <a target="_blank" href="https://archive.vogue.com/"
        >Vogue's online archive.</a
      > I then manually annotated the coverlines on the covers, using black boxes
      to denote text areas and white to denote the background. Only covers from 2000
      to 2022 were annotated as the manual process took quite a bit of time and Vogue
      published a consistent number of issues per year in this time period. The annotations
      were processed in Python using OpenCV to calculate the percentage of black
      pixels (text area) to the total image size.
    </div>
  </div>

  <div class="section">
    <div class="footer-title">Colophon</div>
    <Colophon />
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
</style>
