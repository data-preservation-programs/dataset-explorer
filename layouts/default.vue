<template>
  <div class="main-container">

    <Navigation />

    <nuxt />

    <div class="divider" />

    <SiteFooter />

    <Underlays />

  </div>
</template>

<script>
// ===================================================================== Imports
import Navigation from '@/components/navigation'
import SiteFooter from '@/components/site-footer'

import Underlays from '@/components/underlays.vue'

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    Navigation,
    Underlays,
    SiteFooter
  },

  created () {
    this.$store.dispatch('global/getBaseData', 'general')
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page,
#navigation,
#site-footer,
.divider {
  position: relative;
  z-index: 25;
}

.divider {
  margin-top: 4.5rem;
  margin-bottom: 3.5rem;
}
</style>
