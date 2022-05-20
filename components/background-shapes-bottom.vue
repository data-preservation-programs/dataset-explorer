<template>
  <div class="background-bottom">
    <div id="hexagon-shadow">
      <div id="hexagon" class="f medium"></div>
    </div>
    <div id="small-ring" class="c"></div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="g small"></div>
    </div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="h small"></div>
    </div>
    <div id="small-ring" class="d"></div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="i large"></div>
    </div>
    <div id="hexagon-shadow">
      <div id="hexagon" class="j huge"></div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.background-bottom {
  position: relative;
  bottom: 0;
  z-index: -10;
  height: 3rem;
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
  &.f {
    top: -73.5rem;
    left: 75rem;
    transform: rotate(24deg);
  }
  &.g {
    top: -63.5rem;
    left: 79rem;
    transform: rotate(5deg);
  }
  &.h {
    top: -41.5rem;
    left: 20rem;
    transform: rotate(4deg)
  }
  &.i {
    top: -57rem;
    left: -8rem;
    transform: rotate(15deg)
  }
  &.j {
    top: -72rem;
    left: 55rem;
    transform: rotate(30deg);
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
  &.c {
    top: -64.5rem;
    left: 81rem;
    z-index: -2;
  }
  &.d {
    top: -60rem;
    left: -3rem;
  }
}

</style>
