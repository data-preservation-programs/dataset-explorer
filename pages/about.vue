<template>
  <div :class="`page page-${tag}`">
    <div class="grid">
      <div class="dotted-border">
        <div class="col-10">
          <MarkdownParser
            :markdown="markdown" />
        </div>
      </div>
    </div>
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
// .heading {
//   @include header;
//   padding-bottom: 3.6875rem;
//   margin-top: 1.5rem;
//   margin-left: 5.1875rem;
// }

.dotted-border {
  position: relative;
  margin-top: 5rem;
  margin-bottom: 5rem;
  margin-left: -5.1875rem;
  background-repeat: no-repeat;
  overflow: visible;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='6' y='-2' width='102.5%25' height='100.5%25' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
}

.dotted-border::before {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateY(-50%);
  width: 0.3125rem;
  height: 0.3125rem;
  left: .22rem;
  top: -0.25rem;
}

.dotted-border::after {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateX(50%);
  width: 0.3125rem;
  height: 0.3125rem;
  bottom: 0.325rem;
  left: 0.0625rem;
}
</style>
