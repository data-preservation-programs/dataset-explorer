<template>
  <div class="main-container">

    <Navigation />

    <nuxt />

    <SiteFooter />

  </div>
</template>

<script>
// ===================================================================== Imports

import SiteFooter from '@/components/site-footer'
import Navigation from '@/components/navigation'
// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    Navigation,
    SiteFooter
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

</style>
