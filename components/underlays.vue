<template>
  <div
    id="underlays"
    ref="underlays"
    :style="{ height, top }">

    <div class="dots" />

    <div class="grain" />

    <div class="blob blob-top" />

    <div class="blob blob-right" />

    <div :class="['blob blob-bottom', { hidden: hideBottomUnderlay }]" />

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'
import Throttle from 'lodash/throttle'

// ====================================================================== Export
export default {
  name: 'Underlays',

  data () {
    const route = this.$route.name
    return {
      hideBottomUnderlay: route !== 'index' && route !== 'program-details',
      height: '200vh',
      top: '0px',
      scroll: false,
      resize: false
    }
  },

  computed: {
    ...mapGetters({
      deals: 'deals/deals'
    })
  },

  watch: {
    '$route' (route) {
      const name = route.name
      this.hideBottomUnderlay = name !== 'index' && name !== 'program-details'
      const timeout = setTimeout(() => {
        this.setHeight()
        clearTimeout(timeout)
      }, 100)
    },
    deals () {
      this.setHeight()
    }
  },

  mounted () {
    this.setHeight()
    const scroll = () => { this.setTop() }
    const resize = () => {
      this.setHeight()
      this.setTop()
    }
    this.scroll = Throttle(scroll, 1)
    this.resize = Throttle(resize, 10)
    window.addEventListener('scroll', this.scroll)
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy () {
    if (this.scroll) { window.removeEventListener('scroll', this.scroll) }
    if (this.resize) { window.removeEventListener('resize', this.resize) }
  },

  methods: {
    setTop () {
      const y = window.pageYOffset || document.documentElement.scrollTop
      this.top = `${-y}px`
    },
    setHeight () {
      this.$nextTick(() => {
        this.height = `${this.$refs.underlays.parentNode.clientHeight}px`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* position: absolute; */

// ///////////////////////////////////////////////////////////////////// General
#underlays {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.dots,
.grain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}

.dots {
  background-image: url('~assets/patterns/dot.png');
  opacity: 0.1;
  mix-blend-mode: overlay;
  z-index: 15;
}

.grain {
  background-image: url('~assets/patterns/grain.png');
  opacity: 0.02;
  z-index: 10;
}

.blob {
  position: absolute;
  width: 1812px;
  height: 2087px;
  background-image: url('~assets/images/blurred-blob.svg');
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 5;
  &.blob-top,
  &.blob-bottom {
    filter: blur(65px);
    opacity: 0.9;
  }
  &.blob-top {
    top: -40rem;
    left: calc(50% - #{math.div($containerWidth, 2)} - 15rem);
    transform: rotate(315deg);
  }
  &.blob-right {
    top: 30rem;
    left: calc(50% - #{math.div($containerWidth, 2)} + 20rem);
    transform: rotate(370deg) scale(0.5);
    filter: blur(100px);
    opacity: 0.75;
  }
  &.blob-bottom {
    bottom: -35rem;
    right: calc(50% - #{math.div($containerWidth, 2)});
    transform: rotate(140deg);
  }
  &.hidden {
    display: none;
  }
}
</style>
