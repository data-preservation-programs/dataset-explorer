<template>
  <div class="main-container">
    <TopBackgroundShapes
      :blur-change-top="blurChangeTop" />

    <Navigation />

    <Banner />

    <nuxt />

    <SiteFooter />

    <BottomBackgroundShapes
      :blur-change-bottom="blurChangeBottom" />

  </div>
</template>

<script>
// ===================================================================== Imports
import Banner from '@/components/banner'
import Navigation from '@/components/navigation'
import SiteFooter from '@/components/site-footer'
import BottomBackgroundShapes from '@/components/background-shapes-bottom'
import TopBackgroundShapes from '@/components/background-shapes-top'

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    Banner,
    Navigation,
    SiteFooter,
    BottomBackgroundShapes,
    TopBackgroundShapes
  },

  data () {
    return {
      tag: 'index',
      scroll: false,
      blurChangeTop: false,
      blurChangeBottom: false
    }
  },

  async fetch ({ store, route, $content }) {
    await store.dispatch('global/getBaseData', 'general')
  },

  created () {
    this.$store.dispatch('global/getBaseData', 'general')
  },

  mounted () {
    this.scroll = () => {
      const topElement = document.getElementById('blur-trigger')
      const footer = document.getElementById('site-footer')
      if (topElement) {
        const rect = topElement.getBoundingClientRect()
        const elementIsInViewport = ((rect.top + 40) <= window.innerHeight)
        if (elementIsInViewport && !this.blurChange) {
          this.blurChangeTop = true
        } else if (!elementIsInViewport) {
          this.blurChangeTop = false
        }
      }
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const footerIsInViewport = ((footerRect.top + 40) <= window.innerHeight)
        if (footerIsInViewport && !this.blurChange) {
          this.blurChangeBottom = true
        } else if (!footerIsInViewport) {
          this.blurChangeBottom = false
        }
      }
    }
    window.addEventListener('scroll', this.scroll)
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.main-container {
  position: relative;
}
</style>
