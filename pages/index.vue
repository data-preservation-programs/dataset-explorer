<template>
  <div :class="`page page-${tag}`">

    <HeaderIndex />

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import HeaderIndex from '@/components/header-index'

import IndexPageData from '@/content/pages/index.yml'

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    HeaderIndex
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, route }) {
    // await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
  },

  head () {
    // return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    })
  },

  watch: {
  },

  mounted () {
    console.log(IndexPageData)
  },

  beforeDestroy () {
  },

  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

// /////////////////////////////////////////////////////////////// [Toolbar] Top

// /////////////////////////////////////////////////////////////////////// Table

// //////////////////////////////////////////////////////////// [Toolbar] Bottom

</style>
