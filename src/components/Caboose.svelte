<script>
  import AreaChart from "./AreaChart.svelte";
  import MagazineExamples from "./MagazineExamples.svelte";

  export let cumulativeData;
  export let google;
  export let screenHeight;
  export let screenWidth;

  console.log(google[0]);

  let examplesEarly2000sYears = [20011101, 20030701, 20060901, 20090301];
  let examplesEarly2010sYears = [20120901, 20140401, 20160501, 20170801];
  let examplesLate2010sYears = [20180901, 20201201, 20210201, 20221101];

  let examplesEarly2000s = cumulativeData.filter((d) =>
    examplesEarly2000sYears.includes(d.Date)
  );
  let examplesEarly2010s = cumulativeData.filter((d) =>
    examplesEarly2010sYears.includes(d.Date)
  );
  let examplesLate2010s = cumulativeData.filter((d) =>
    examplesLate2010sYears.includes(d.Date)
  );

  let showingRatio = true;
</script>

<div class="body-section">
  <div class="section">
    <div class="body-text">
      In the early aughts, on the wave of a digital publishing revolution thanks
      to Adobe software, Vogue covers clung steadfastly to tried and tested
      traditions of illustration, photography, and celebrity-focused
      portraiture. Text coverage increased in the first half of the 2000s,
      likely a product of y2k maximalism, new graphics software, and competition
      with tabloids.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      Vogue launched its flagship website in <a
        target="_blank"
        href="https://web.archive.org/web/19981212022034/http://vogue.com/"
        >1998</a
      >. Despite, this early affinity to the internet, the web design reflects
      how the magazine (and much of the rest of the internet) was applying print
      design thinking to ditigal mediums. The result was a rather clunky,
      modular design, slightly averse to positive user experiences. The
      potential of digital mediums had yet to be realised.
    </div>
  </div>

  <MagazineExamples magList={examplesEarly2000s} {showingRatio} />

  <div class="section">
    <div class="body-text">
      Text coverage peaked around 2005 and 2006, with an average annual text
      coverage of 35%. Stunning!
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      In 2010, Instagram was launched and quickly
      <a href="https://en.wikipedia.org/wiki/Instagram" target="_blank"
        >found success,</a
      >
      with one million registered users in two months, 10 million in a year, and
      1 billion by June 2018. Digitisation and social media dramatically affected
      how people interacted with print publications. People's initial encounters
      with magazines transpired online, rather than in physical stores. While subscriptions
      remained the primary source of revenue, social media platforms replaced the
      newsstand as the marketplace.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      The online boom also affected people's relationship with celebrity
      culture. Through social media platforms, celebrities could communicate
      directly with fans and wield more control over narratives. Vogue was
      simply a middleman and no longer held a monopoly on celebrity culture.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      In the 2010s, we start to see the affects of these changes manifesting on
      the cover, through a gradual decline in text coverage. Put simply, the
      coverlines were simply caught in the crossfire of the tech explosion
    </div>
  </div>

  <MagazineExamples magList={examplesEarly2010s} {showingRatio} />

  <div class="section">
    <div class="body-text">
      The clickbait titles and noisy, maximalist design didn’t translate well to
      small screens. Graphic design as a whole trended toward minimalism,
      offering visual efficacy both on billboards and mobile displays and
      imbuing a sense of modernity.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      In place of punchy coverlines to entice readers, magazines needed to
      leverage a digital approach to engender cultural resonance. The prominence
      of a cover star proved to have far greater potential for virality than
      coverlines. Thus, we see more focus on the cover photography and the
      subject themself. To differentiate themselves from the ocean of celebrity
      photos and content, Vogue needed to put forth high-impact visuals for
      shock value. Accompanied by a juicy interview and Vogue's got a winner.
      <a
        target="_blank"
        href="https://www.washingtonpost.com/news/arts-and-entertainment/wp/2014/03/25/why-we-are-still-talking-about-kanye-west-and-kim-kardashians-vogue-cover/"
      >
        Kim Kardashian's and Kayne West's controversial cover
      </a> in 2014, for example, engendered a boost in Google search interest in
      Vogue magazine covers.
    </div>
  </div>

  <div class="section chart-container">
    <div class="chart-title">
      Google Search Interest in 'vogue magazine cover'
    </div>
    <div class="chart-subtitle text">
      Note: Vogue Cover designs are often revealed online the month before the
      issue is released. Therefore, interest in a certain month's issue might
      occur in the previous month. <a
        href="https://trends.google.com/trends/explore?q=vogue%20magazine%20cover&date=all&geo=US"
        target="_blank">Source</a
      >
    </div>

    <AreaChart {screenHeight} {screenWidth} points={google} />
  </div>

  <div class="section">
    <div class="body-text">
      Between 2006 and 2016, average annual text coverage decreased by 15%.
    </div>
  </div>

  <div class="section last-section">
    <div class="body-text">
      Since 2018, there has been a consistent yearly dip in text coverage,
      marking an intensified progression of the pattern seen in the early 2010s.
      A trend that was perhaps accelerated in reaction to COVID-19 and the Black
      Lives Matter movement beginning in 2020. Amidst the profound suffering,
      isolation, and reflection frivolous cover lines would've been out of
      place.
    </div>
  </div>

  <MagazineExamples magList={examplesLate2010s} {showingRatio} />

  <div class="section">
    <div class="body-text">
      By 2022, average text coverage dwindled to just 10%, 25% less than the
      peak in the mid 2000s.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      We almost see a rebirth of the simpler poster covers of the early 1900s,
      with much more focus on the cover imagery and the cover star themself. The
      dissemination of visuals, as well as accompanying media such as YouTube
      videos, across social media serves as an advertising medium thus rendering
      the cover lines obsolete and unnecessary noise. The high-production
      editorial shoots provokes greater visual impact and efficacy on large
      screens, mobile devices, and print while also imbuing a sense of modernity
      and artistry.
    </div>
  </div>

  <div class="section">
    <div class="body-text">
      Vogue's text journey is undoubtedly a reaction to societal change and a
      (successful) bid to stay relevant. The cultural imprint of Vogue magazine
      is profound, yet it, too, has been shaped by the shifting tides of time.
    </div>
  </div>
</div>

<style>
  .chart-subtitle {
    color: #8a8a8a;
    font-size: 10pt;
    font-family: "encode";
  }

  .chart-subtitle > a {
    color: #8a8a8a;
    text-decoration: underline;
  }

  .chart-subtitle > a:hover {
    color: #8a8a8a;
    text-decoration: none;
  }

  .chart-container {
    margin-top: 24px;
    margin-bottom: 48px;
  }
</style>
