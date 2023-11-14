<script>
  import MagazineExamples from "./MagazineExamples.svelte";

  let examples1900s = [
    { Date: "19120615", month: 6, year: 1912 },
    { Date: "19320701", month: 7, year: 1932 },
    { Date: "19450315", month: 3, year: 1945 },
  ];

  let examples1960s = [
    { Date: "19660601", month: 6, year: 1966 },
    { Date: "19740801", month: 8, year: 1974 },
    { Date: "19840801", month: 8, year: 1984 },
  ];

  let examples1990s = [
    { Date: "19890501", month: 5, year: 1989 },
    { Date: "20011101", month: 11, year: 2001 },
    { Date: "20060901", month: 9, year: 2006 },
  ];

  let examples2010s = [
    { Date: "20140401", month: 4, year: 2014 },
    { Date: "20201201", month: 12, year: 2020 },
    { Date: "20210201", month: 2, year: 2021 },
  ];
</script>

<div class="body-section">
  <div class="section">
    <div class="body-text">
      The numbers are damning. But is this discrepancy merely an anomaly? Did
      the bump simply speak for itself? I’m afraid the answer is no. But, before
      we dive into data on Vogue's recent relationship with text, let's go back
      a bit further.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      In the early 20th century, Vogue covers featured illustrations. The
      intention was to create covers so beautiful that one might consider
      hanging them as a <a
        target="_blank"
        href="https://d2cu82y6eo7f22.cloudfront.net/2022/02/07212140/JMM_5.1_Grow.pdf"
        >poster</a
      >, thus creatively dubbed poster covers. The 1930s saw the transition from
      illustrated covers to photographed ones, with Vogue debuting its first
      cover with a
      <a
        target="_blank"
        href="https://www.moma.org/interactives/objectphoto/publications/788.html"
        >photograph</a
      > in 1932. Despite this shift in medium, the poster-like aesthetic retained
      its allure. While publications toyed with text placement, the focal point invariably
      remained the central image (hands up, they were stunning).
    </div>
  </div>

  <MagazineExamples magList={examples1900s} />

  <div class="section last-section">
    <div class="body-text">
      Towards the midpoint of the century, the economic underpinnings of many
      magazines shifted from
      <a
        target="_blank"
        href="https://www.theringer.com/2018/9/4/17816298/magazine-cover-industry-2018"
        >subscriptions to newsstand sales.</a
      >
      This economic shift manifested on the covers, as they now functioned as an
      advertisement. Text describing the magazine's contents (referred to as cover
      lines in industry parlance) began infiltrating the
      <a
        target="_blank"
        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7966324/"
        >margins of magazines</a
      >, and increased competition led to larger and grabbier cover lines.
    </div>
  </div>

  <MagazineExamples magList={examples1960s} />

  <div class="section">
    <div class="body-text">
      This trend was no doubt complemented by the <a
        target="_blank"
        href="https://d2cu82y6eo7f22.cloudfront.net/2022/02/07212140/JMM_5.1_Grow.pdf"
        >innovative typography</a
      >, by designers such as Herb Lubalin (&lt;3), and advances in graphic
      design technology, including phototypesetting
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      This trend continued to persist and mature throughout the 20th century and
      into the 21st. The rapid improvement of graphic design software and
      technology in the 90s and 2000s fueled graphic design <a
        target="_blank"
        href="https://3ptscomm.medium.com/design-through-the-decades-the-evolution-of-graphic-design-over-the-last-50-years-and-beyond-617a20f8b61d"
        >maximalism</a
      >. In parallel, the icon herself, Anna Wintour, entered the scene,
      becoming the editor-in-chief of US Vogue in 1988. Aside from inspiring the
      cinematic tour de force, The Devil Wears Prada, and stealing the bob
      limelight from Edna Mode, Wintour played an instrumental role in
      redefining Vogue's cover aesthetics. She advocated for the appearance of
      more actors, musicians, and political figures on the cover of Vogue,
      positioning the magazine as a cultural lodestar offering access to eminent
      <a
        target="_blank"
        href="https://web.archive.org/web/20230409202208/nytimes.com/1999/01/30/business/trading-on-hollywood-magic-celebrities-push-models-off-women-s-magazine-covers.html"
        >celebrities</a
      >. In an era predating the ubiquity of social media, magazine profiles
      served as a conduit linking celebrities with society.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      This brings up to the 2000s. Let's get into the data!
    </div>
  </div>
</div>
