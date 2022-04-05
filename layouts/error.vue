<template>
  <div class="error-page">
    <div class="grid">
      <div class="col">
        <div class="inner-content">

          <div class="code">
            {{ code }}
          </div>

          <h1 class="message">
            {{ message }}
          </h1>

          <nuxt-link
            :to="link.to"
            class="link-home link-hover">
            {{ link.text }}
          </nuxt-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

// ====================================================================== Export
export default {
  name: 'ErrorPage',

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageContent () {
      return this.siteContent.general
    },
    // content () {
    //   return this.siteContent.general.page_404
    // },
    code () {
      return this.content.code
    },
    message () {
      return this.content.message
    },
    link () {
      return this.content.link
    }
  },

  mounted () {
    this.setLoadingStatus(false)
  },

  methods: {
    ...mapActions({
      setLoadingStatus: 'deals/setLoadingStatus'
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.error-page {
  position: relative;
  z-index: 25;
}

.inner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.code {
  font-size: 6.25rem;
  line-height: 1;
  margin-bottom: 3.75rem;
}

.message {
  margin-bottom: 2.5rem;
}

.link-home {
  @include leading_Large;
}
</style>
