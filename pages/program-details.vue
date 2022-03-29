<template>
  <div :class="`page page-${tag}`">
    Program Details
  </div>
</template>

<script>
// ===================================================================== Imports

// ====================================================================== Export
export default {
  name: 'ProgramDetailsPage',

  components: {
  },

  data () {
    return {
      tag: 'program-details'
    }
  },

  async fetch ({ store, route }) {
  },

  head () {
    // return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
</style>
