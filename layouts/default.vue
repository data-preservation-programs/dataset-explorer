<template>
  <div class="main-container">

    <Navigation />

    <nuxt />

    <SiteFooter />

    <BackgroundShapes />


  </div>
</template>

<script>
// ===================================================================== Imports
import Navigation from '@/components/navigation'
import SiteFooter from '@/components/site-footer'
import BackgroundShapes from '@/components/background-shapes'

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    Navigation,
    SiteFooter,
    BackgroundShapes
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
