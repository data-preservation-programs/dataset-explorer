<template>
  <div class="main-container">
    <TopBackgroundShapes />

    <Navigation />

    <nuxt />

    <SiteFooter />

    <BottomBackgroundShapes />

  </div>
</template>

<script>
// ===================================================================== Imports
import Navigation from '@/components/navigation'
import SiteFooter from '@/components/site-footer'
import BottomBackgroundShapes from '@/components/background-shapes-bottom'
import TopBackgroundShapes from '@/components/background-shapes-top'

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    Navigation,
    SiteFooter,
    BottomBackgroundShapes,
    TopBackgroundShapes
  },

  async fetch ({ store, route, $content }) {
    await store.dispatch('global/getBaseData', 'general')
  },

  created () {
    this.$store.dispatch('global/getBaseData', 'general')
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.main-container {
  position: relative;
}
</style>
