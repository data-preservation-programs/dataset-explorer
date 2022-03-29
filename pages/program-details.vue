<template>
  <div :class="`page page-${tag}`">
    <div class="grid">
      <div class="col">
        <div class="inner-content">

          <div class="grid-center">
            <div class="col-8_sm-10">

              <MarkdownParser :markdown="markdown" />

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ===================================================================== Imports
import MarkdownParser from '@/components/markdown-parser'

import ProgramDetailsPageData from '@/content/pages/program-details.json'
import ProgramDetailsContent from '@/content/markdown/program-details.md'

// ====================================================================== Export
export default {
  name: 'ProgramDetailsPage',

  components: {
    MarkdownParser
  },

  data () {
    return {
      tag: 'program-details'
    }
  },

  async fetch ({ store, route }) {
    await store.dispatch('global/getBaseData', { key: 'program-details', data: ProgramDetailsPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    markdown () {
      return ProgramDetailsContent
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.page {
  @include tiny {
    margin-top: -4rem
  }
}

.inner-content {
  padding: 6.25rem 0;
  background-color: $logCabin;
  border-radius: 0.5rem;
  @include small {
    padding: 4rem 0;
  }
}
</style>
