<template>
  <div class="background-top">
    <div id="hexagon-shadow">
      <div id="hexagon" class="k small"></div>
    </div>
    <div id="small-ring" class="a"></div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="a huge"></div>
    </div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="c small"></div>
    </div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="b medium"></div>
    </div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="d small"></div>
    </div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="e small"></div>
    </div>
    <div id="large-ring" class="b"></div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.background-top {
  position: relative;
  height: 3rem;
  top: 0;
  z-index: -10;
}
#hexagon-shadow {
  filter: drop-shadow(2px 4px 1px rgba(169, 180, 203, 0.3)) drop-shadow(-2px -2px 0px #FFFFFF);
}

#hexagon {
  position: absolute;
  z-index: -1;
  background: $gradient_SilverGrey;
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  &.small {
    width: 7.5625rem;
    height: 7.5625rem;
  }
  &.medium {
    width: 14.3125rem;
    height: 14.3125rem;
  }
  &.large {
    width: 21.875rem;
    height: 21.875rem;
  }
  &.huge {
    width: 40.9375rem;
    height: 40.9375rem;
  }
  &.a {
    top: -36rem;
    left: 31rem;
    transform: rotate(-80deg);
  }
  &.b {
    top: 7rem;
    left: 70rem;
    transform: rotate(15deg);
  }
  &.c {
    top: 17rem;
    left: 67rem;
    transform: rotate(15deg);
  }
  &.d {
    top: 40rem;
    left: 87rem;
    transform: rotate(15deg);
  }
  &.e {
    top: 46rem;
    left: 5rem;
    transform: rotate(15deg);
  }
  &.k {
    top: 4rem;
    left: 5rem;
    transform: rotate(15deg);
  }
}

#large-ring {
  position: absolute;
  z-index: -1;
  display: inline-block;
  width: 32.25rem;
  height: 32.25rem;
  box-shadow: 0px 70px 60px rgba(169, 180, 203, 0.3), -2px -2px 0px #FFFFFF, 0px 3px 0px #D6DADF, inset 0px -20px 20px rgba(255, 255, 255, 0.2);
  border-radius: 100%;
  background: $gradient_SilverGrey;
  &:after {
    content: '';
    position: absolute;
    z-index: 0;
    top: calc(40%/2);
    left: calc(40%/2);
    height: 60%;
    width: 60%;
    border-radius: 100%;
    background-color: $mystic;
    box-shadow: inset 0px 5px 20px rgba(169, 180, 203, 0.3), -1px -2px 0px #D6DADF, 1px 3px 0px #FFFFFF, inset 0px -2px 2px rgba(255, 255, 255, 0.2);
  }
  &.b {
    z-index: 1;
    top: 0;
    left: 50%;
    transform: translate(-62rem, 36rem);
  }
}

#small-ring {
  position: absolute;
  z-index: -1;
  display: inline-block;
  width: 18.625rem;
  height: 18.625rem;
  box-shadow: 0px 70px 60px rgba(169, 180, 203, 0.3), -2px -2px 0px #FFFFFF, 0px 3px 0px #D6DADF, inset 0px -20px 20px rgba(255, 255, 255, 0.2);
  position: relative;
  left: 30rem;
  border-radius: 100%;
  z-index: 99;
  background: $gradient_SilverGrey;
  &:after {
    content: '';
    position: absolute;
    z-index: 0;
    top: calc(40%/2);
    left: calc(40%/2);
    height: 60%;
    width: 60%;
    border-radius: 100%;
    background-color: $mystic;
    box-shadow: inset 0px 0px 10px rgba(169, 180, 203, 0.3), -1px -2px 0px #D6DADF, 1px 3px 0px #FFFFFF, inset 0px -2px 2px rgba(255, 255, 255, 0.2);
  }
  &.a {
    z-index: -4;
    top: 10rem;
    left: 65rem;
  }
  &.c {
    bottom: 0;
    right: 50%;
    transform: translate(54rem, -33rem);
  }
  &.d {
    bottom: 0;
    left: 50%;
    transform: translate(-50rem, -13rem);
  }
}

</style>
