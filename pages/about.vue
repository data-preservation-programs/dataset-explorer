<template>
  <div :class="`page page-${tag}`">

    <MarkdownParser
      :markdown="markdown" />

  </div>
</template>

<script>
// ===================================================================== Imports
import MarkdownParser from '@/components/markdown-parser'

import AboutPageContent from '@/content/markdown/about.md'
import AboutPageData from '@/content/pages/about.json'
// ====================================================================== Export
export default {
  name: 'AboutPage',

  components: {
    MarkdownParser
  },

  data () {
    return {
      tag: 'about'
    }
  },

  async fetch ({ store, route }) {
    await store.dispatch('global/getBaseData', { key: 'about-data', data: AboutPageData })
  },

  head () {
    // return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    markdown () {
      return AboutPageContent
    }
  }

}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

// /////////////////////////////////////////////////////////////// [Toolbar] Top

// /////////////////////////////////////////////////////////////////////// Table

// //////////////////////////////////////////////////////////// [Toolbar] Bottom

</style>
