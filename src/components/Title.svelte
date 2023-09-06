<div class="container">
  <div class="box left-aligned title-cookies white-text">Since When Does</div>
  <div class="box middle-aligned title-cream type-accent">Vogue</div>
  <div class="box right-aligned title-cookies white-text">Hate Text?</div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .box {
    &.left-aligned {
      text-align: left;
    }

    &.middle-aligned {
      text-align: center;
    }

    &.right-aligned {
      text-align: right;
    }
  }

  .title-cream {
    text-transform: uppercase;
  }

  .title-cookies {
    font-family: "encode", sans-serif;
    font-weight: lighter;
    text-transform: capitalize;
  }

  @media (max-width: 800px) {
    .title-cream {
      font-size: 22vw;
      line-height: 1;
    }

    .title-cookies {
      font-size: 6vw;
    }
  }

  @media (min-width: 800px) {
    .title-cream {
      font-size: 15vw;
      line-height: 1;
    }

    .title-cookies {
      font-size: 4vw;
    }

    .container {
      width: max-content; /* Initially set to max-content */
    }
  }
</style>
