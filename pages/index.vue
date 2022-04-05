<template>
  <div :class="`page page-${tag}`">

    INDEX

    <SiteFooter />

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'
import SiteFooter from '@/components/site-footer'

// ====================================================================== Export
export default {
  name: 'IndexPage',

  components: {
    SiteFooter
  },

  data () {
    return {
      tag: 'index'
    }
  },

  async fetch ({ store, route }) {
  },

  head () {
    // return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
    })
  },

  watch: {
  },

  mounted () {
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
