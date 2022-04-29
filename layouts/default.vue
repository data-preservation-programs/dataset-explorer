<template>
  <div class="main-container">

    <nuxt />

    <BackgroundShapes />

  </div>
</template>

<script>
// ===================================================================== Imports
import BackgroundShapes from '@/components/background-shapes'
// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    BackgroundShapes
  },

  created () {
    // this.$store.dispatch('global/getBaseData', 'general')
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.main-container {
  position: relative; // In order for BackgroundShapes to be positioned abosolute to each page
}

</style>
