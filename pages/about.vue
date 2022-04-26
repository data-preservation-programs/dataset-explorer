<template>
  <div :class="`page page-${tag}`">

  </div> 
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import AboutPageData from '@/content/markdown/about.md'
// ====================================================================== Export
export default {
  name: 'AboutPage',

  components: {

  },

  data () {
    return {
      tag: 'about'
    }
  },

  async fetch ({ store, route }) {
    await store.dispatch('global/getBaseData', { key: 'about', data: AboutPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    pageContent () {

    }
  },

  watch: {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {
   
  }

}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

// /////////////////////////////////////////////////////////////// [Toolbar] Top

// /////////////////////////////////////////////////////////////////////// Table

// //////////////////////////////////////////////////////////// [Toolbar] Bottom

</style>
