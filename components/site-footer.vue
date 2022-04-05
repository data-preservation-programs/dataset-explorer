<template>
  <section id="site-footer">
    <div class="grid-center">
      <div class="col-6">
        <h1>{{ Dataset Explorer }}</h1>
      </div>
      <div class="col-6">
        <div class="grid">
          <div class="col-3"><nuxt-link></nuxt-link></div>
          <div class="col-3"><nuxt-link></nuxt-link></div>
          <div class="col-3"><nuxt-link></nuxt-link></div>
          <div class="col-3"><nuxt-link></nuxt-link></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

// ====================================================================== Export
export default {
  name: 'SiteFooter',

  components: {
  },

  computed: {
    ...mapGetters({
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

</style>
