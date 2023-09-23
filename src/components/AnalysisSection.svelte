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
      The decline in text on covers mirrors broader changes in media consumption
      habits and an evolving preference for minimalist graphic design. To
      understand, let's get into a bit of history.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      In the early 20th century, magazine covers featured illustrations. The
      intention was to create covers so beautiful that one might consider
      hanging them as a <a
        target="_blank"
        href="https://d2cu82y6eo7f22.cloudfront.net/2022/02/07212140/JMM_5.1_Grow.pdf"
        >poster</a
      >. Thus, they were dubbed poster covers. The 1930s saw the transition from
      illustrations to photographs on covers, with Vogue featuring its first
      cover with a
      <a
        target="_blank"
        href="https://www.moma.org/interactives/objectphoto/publications/788.html"
        >colour photograph</a
      > in 1932. Despite this shift in medium, the poster-like aesthetic retained
      its allure. While publications toyed with text placement, the focal point invariably
      remained the central image.
    </div>
  </div>

  <MagazineExamples magList={examples1900s} />

  <div class="section last-section">
    <div class="body-text">
      Yet, the economic underpinnings of many magazines were shifting from
      <a
        target="_blank"
        href="https://www.theringer.com/2018/9/4/17816298/magazine-cover-industry-2018"
        >subscriptions to newsstand sales.</a
      >
      This economic shift played out on the covers—from posters to selling points.
      In the 1950s and 60s, text advertising the magazine's contents (referred to
      as cover lines in industry parlance) began infiltrating the
      <a
        target="_blank"
        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7966324/"
        >margins of magazines</a
      >. Increased competition led to larger and bolder as well as grabbier and
      more clickbait-y coverlines.
    </div>
  </div>

  <MagazineExamples magList={examples1960s} />

  <div class="section">
    <div class="body-text">
      This trend was no doubt aided by the <a
        target="_blank"
        href="https://d2cu82y6eo7f22.cloudfront.net/2022/02/07212140/JMM_5.1_Grow.pdf"
        >innovative typography</a
      >, by designers such as Herb Lubalin, and advances in graphic design
      technology, including phototypesetting
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      This trend continued to persist and mature throughout the 20th century and
      into the 21st. The rapid improvement of graphic design software and
      technology in the 90s and 2000s fueled graphic design <a
        target="_blank"
        href="https://3ptscomm.medium.com/design-through-the-decades-the-evolution-of-graphic-design-over-the-last-50-years-and-beyond-617a20f8b61d"
        >maximalism</a
      >. In parallel, the icon herself, Anna Wintour, entered the scene,
      becoming the editor-in-chief of US Vogue in 1988. Aside from inspiring the
      cinematic tour de force, The Devil Wears Prada, Wintour played an
      instrumental role in redefining Vogue's cover aesthetics. She pushed for
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

  <MagazineExamples magList={examples1990s} />

  <div class="section">
    <div class="body-text">
      With the rise of digital media in the 2000s, print publications clung
      steadfastly to traditions of illustration, photography, and
      celebrity-focused portraiture, showing a reluctance to embrace the digital
      frontier
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      In 2010, Instagram was launched and quickly <a
        target="_blank"
        href="https://en.wikipedia.org/wiki/Instagram">found success</a
      >, with one million registered users in two months, 10 million in a year,
      and 1 billion by June 2018. Through social media platforms, celebrities
      could communicate directly with fans and wield more control over their
      image and narratives; Vogue no longer held a monopoly on celebrity
      culture. Yet, despite the saturation of celebrity content and photos,
      magazine
      <a
        target="_blank"
        href="https://www.theringer.com/2018/9/4/17816298/magazine-cover-industry-2018"
        >covers have remained relevant</a
      >—a concept so ingrained in our culture. But, how people interacted with
      magazine covers and issues shifted.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      Social media replaced the newsstand as the marketplace for magazines.
      People's initial encounters with magazines transpired online, rather than
      in physical stores. Magazines needed to leverage a digital approach to
      create cultural resonance and virality and thus translating into augmented
      sales.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      The clickbaity cover lines were not as impactful as <a
        target="_blank"
        href="https://www.theringer.com/2018/9/4/17816298/magazine-cover-industry-2018"
        >striking imagery</a
      >
      in the digital landscape. The noisy, maximalist design chock-full of text didn’t
      translate well to
      <a
        target="_blank"
        href="https://www.nucreative.co.uk/post/graphic-design-trends-of-the-last-decade"
        >small screens</a
      >. Thus, magazine covers trended toward minimalism, offering visual
      efficacy both on large screens, mobile devices, and print while also
      imbuing a sense of modernity.
    </div>
  </div>

  <MagazineExamples magList={examples2010s} />

  <div class="section">
    <div class="body-text">
      In the digital age, the prominence of a magazine's cover star has far
      greater potential for virality than cover lines. Ergo, we almost see a
      rebirth of the poster covers of the early 1900s, with much more focus on
      the cover feature and the subject themself. The dissemination of visuals,
      as well as accompanying media such as YouTube videos, across social media
      serves as an advertising medium thus rendering the cover lines obsolete
      and unnecesary noise. The high-production editorial shoots provokes
      greater visual impact in an infinite sea of online content.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      Vogue's text journey is undoubted a reaction to societal change and a
      (successful) bid to stay relevant. The cultural imprint of Vogue magazine
      has been and is profound, yet it, too, has gracefully evolved in tandem
      with the shifting tides of time.
    </div>
  </div>
</div>
