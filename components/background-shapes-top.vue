<template>
  <div class="background-top">
    <div class="blur-1">
      <div id="hexagon-shadow">
        <div id="hexagon" class="k"></div>
      </div>
    </div>
    <div
      id="small-ring"
      :class="blurChange2"></div>
    <div
      :class="blurChange1">
      <div id="hexagon-shadow">
        <div id="hexagon" class="a"></div>
      </div>
    </div>
    <div
      :class="blurChange2">
      <div id="hexagon-shadow">
        <div id="hexagon" class="c"></div>
      </div>
    </div>
    <div
      :class="blurChange1">
      <div id="hexagon-shadow">
        <div id="hexagon" class="b"></div>
      </div>
    </div>
    <div class="blur-1">
      <div id="hexagon-shadow">
        <div id="hexagon" class="d"></div>
      </div>
    </div>
    <div
      :class="blurChange2">
      <div id="hexagon-shadow">
        <div id="hexagon" class="e"></div>
      </div>
    </div>
    <div
      id="large-ring"
      :class="blurChange1"></div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundShapesTop',

  props: {
    blurChangeTop: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    blurChange1 () {
      return this.blurChangeTop ? '' : 'blur-3'
    },
    blurChange2 () {
      return this.blurChangeTop ? 'blur-3' : 'blur-1'
    }
  }
}

</script>

<style lang="scss" scoped>
.background-top {
  position: relative;
  height: 3rem;
  top: 0;
  z-index: -10;
}
.blur-3 {
  filter: blur(3px);
}
.blur-2 {
  filter: blur(2px);
}
.blur-1 {
  filter: blur(1px);
}
#hexagon-shadow {
  filter: drop-shadow(2px 4px 1px rgba(169, 180, 203, 0.3)) drop-shadow(-2px -2px 0px #FFFFFF);
}

#hexagon {
  position: absolute;
  z-index: -1;
  background: $gradient_SilverGrey;
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  transition: all 0.35s ease-in-out;
  &.a {
    top: -36rem;
    left: 31rem;
    transform: rotate(-80deg);
    width: 40.9375rem;
    height: 40.9375rem;
  }
  &.b {
    top: 7rem;
    left: 70rem;
    transform: rotate(15deg);
    width: 14.3125rem;
    height: 14.3125rem;
  }
  &.c {
    top: 17rem;
    left: 67rem;
    transform: rotate(15deg);
    width: 7.5625rem;
    height: 7.5625rem;
  }
  &.d {
    top: 40rem;
    left: 87rem;
    transform: rotate(15deg);
    width: 7.5625rem;
    height: 7.5625rem;
  }
  &.e {
    top: 46rem;
    left: 5rem;
    transform: rotate(15deg);
    width: 7.5625rem;
    height: 7.5625rem;
  }
  &.k {
    top: 4rem;
    left: 5rem;
    transform: rotate(15deg);
    width: 7.5625rem;
    height: 7.5625rem;
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
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translate(-62rem, 36rem);
  transition: all 0.35s ease;
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
}

#small-ring {
  position: absolute;
  z-index: -1;
  display: inline-block;
  box-shadow: 0px 70px 60px rgba(169, 180, 203, 0.3), -2px -2px 0px #FFFFFF, 0px 3px 0px #D6DADF, inset 0px -20px 20px rgba(255, 255, 255, 0.2);
  position: relative;
  left: 30rem;
  border-radius: 100%;
  z-index: 99;
  background: $gradient_SilverGrey;
  transition: all 0.35s ease;
  z-index: -4;
  top: 10rem;
  left: 65rem;
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
}

</style>
