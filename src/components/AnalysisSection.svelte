<script>
  import MagazineExamples from "./MagazineExamples.svelte";

  export let screenWidth;

  let examples1900s = [
    { Date: "19120615", month: 6, year: 1912 },
    { Date: "19320701", month: 7, year: 1932 },
    { Date: "19450315", month: 3, year: 1945 },
    { Date: "19500401", month: 4, year: 1950 },
  ];

  let examples1960s = [
    { Date: "19670701", month: 7, year: 1967 },
    { Date: "19740801", month: 8, year: 1974 },
    { Date: "19881101", month: 11, year: 1988 },
    { Date: "19950901", month: 9, year: 1995 },
  ];

  let showingRatio = false;
</script>

<div class="body-section">
  <div class="section">
    <div class="body-text">
      The numbers are damning. But is this discrepancy merely an anomaly? Did
      the bump simply speak for itself? There was simply only one path forward.
      In this extremely important, time sensitive, and highly requested
      endeavour, I analysed 22 years of US Vogue covers to ascertain if the
      amount of text on covers has indeed dwindled. But, before we dive into
      data on Vogue's recent relationship with text, we must first appreciate
      Vogue covers' origin story.
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
      >. Thus, they were creatively dubbed poster covers. The 1930s saw the
      transition from illustrated covers to photographed ones, with Vogue
      debuting its first cover with a
      <a
        target="_blank"
        href="https://www.moma.org/interactives/objectphoto/publications/788.html"
        >photograph</a
      > in 1932. Despite this shift in medium, the poster-like aesthetic retained
      its allure. While publications toyed with text placement, the focal point invariably
      remained the central image (hands up, they were stunning).
    </div>
  </div>

  <MagazineExamples magList={examples1900s} {showingRatio} {screenWidth} />

  <div class="section">
    <div class="body-text">
      Towards the midpoint of the century, the economic underpinnings of many
      magazines shifted from
      <a
        target="_blank"
        href="https://www.theringer.com/2018/9/4/17816298/magazine-cover-industry-2018"
        >subscriptions to newsstand sales.</a
      >
      This economic shift manifested on the covers, as they now functioned as an
      advertisement. Text describing the magazine's contents began infiltrating the
      <a
        target="_blank"
        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7966324/"
        >margins of magazines</a
      >, and increased competition led to larger and grabbier cover lines.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      This trend was no doubt complemented by the <a
        target="_blank"
        href="https://d2cu82y6eo7f22.cloudfront.net/2022/02/07212140/JMM_5.1_Grow.pdf"
        >innovative typography</a
      >, by designers such as Herb Lubalin (&lt;3), and advances in graphic
      design technology, including phototypesetting.
    </div>
  </div>

  <MagazineExamples magList={examples1960s} {showingRatio} {screenWidth} />

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
      more actors, musicians, and political figures on the cover of Vogue
      instead of just models.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      This stategy, perhaps unintentionally, sensationalised the role of the
      cover star. The role of cover star became one of honor, for it signified a
      celebration and acknoweledgement of not only a person's
      <a
        target="_blank"
        href="https://www.washingtonpost.com/news/arts-and-entertainment/wp/2014/03/25/why-we-are-still-talking-about-kanye-west-and-kim-kardashians-vogue-cover/"
        >contribution to fashion but to larger culture.</a
      >
      Furthermore, this approach positioned the magazine as a cultural lodestar offering
      access to eminent
      <a
        target="_blank"
        href="https://web.archive.org/web/20230409202208/nytimes.com/1999/01/30/business/trading-on-hollywood-magic-celebrities-push-models-off-women-s-magazine-covers.html"
        >celebrities</a
      >. In an era predating the ubiquity of social media, magazine profiles
      served as a conduit between celebrities and society.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      This brings us up to the 2000s, where the effects of the tech boom and
      Anna Wintour truly precipitate. Let's get into the data!
    </div>
  </div>
</div>
