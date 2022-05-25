<template>
  <div :class="`page page-${tag}`">
    <div class="content-wrapper">
      <div class="grid">
        <div class="col-10_ti-12">
          <div class="inner-content">
            <h1 class="heading">
              {{ heading }}
            </h1>
            <div class="featured-image-wrapper">
              <img :src="featuredImage" />
            </div>

            <div class="markdown-wrapper">
              <MarkdownParser
                :markdown="markdown" />
            </div>
            <DottedBorder />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import MarkdownParser from '@/components/markdown-parser'

import AboutPageContent from '@/content/markdown/about.md'
import AboutPageData from '@/content/pages/about.json'

import DottedBorder from '@/components/dotted-border'
// ====================================================================== Export
export default {
  name: 'AboutPage',

  components: {
    MarkdownParser,
    DottedBorder
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
    markdown () {
      return AboutPageContent
    },
    heading () {
      return this.siteContent[this.tag].page_content.heading
    },
    featuredImage () {
      return this.siteContent[this.tag].page_content.featured_image
    }
  }

}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.content-wrapper {
  margin-top: 3rem;
  margin-right: 5.34375rem;
  margin-bottom: 7.125rem;
  margin-left: 15.5rem;
  @include tiny {
    margin-bottom: 2.125rem;
    margin-right: 0;
    margin-left: 2.34375rem;
  }
  @include small {
    margin-bottom: 2.125rem;
    margin-right: 0;
  }
}

.inner-content {
  position: relative;
}

.heading {
  @include header;
  padding-bottom: 2rem;
  @include mini {
    font-size: 3.75rem;
    padding-bottom: 3rem;
  }
  @include tiny {
    font-size: 3.125rem;
    padding-bottom: 2.5rem;
  }
}

.featured-image-wrapper {
  background: linear-gradient(131.13deg, #F7F9FA 8.78%, #E2E8EF 94.22%);
  border-radius: 0.313rem;
  box-shadow: 0px 100px 70px rgba(169, 180, 203, 0.3), -3px -3px 0px #FFFFFF, 0px 3px 0px #D6DADF, inset 0px -20px 20px rgba(255, 255, 255, 0.2);
  img {
    filter: blur(1px);
    border-radius: 1rem;
    padding: 0.5rem;
    width: 100%;
    @include tiny {
      padding: 0.2rem;
      border-radius: 0.5rem;
    }
    @include mini {
      padding: 0.2rem;
      border-radius: 0.5rem;
    }
  }
}

.markdown-wrapper {
  padding-top: 3.125rem;
  @include tiny {
    padding-top: 1.75rem;
    padding-bottom: 4rem;
  }
  @include mini {
    padding-top: 2.5rem;
    padding-bottom: 4rem;
  }
}

::v-deep .dotted-border {
  margin-left: -5rem;
  &:before {
    top: 0px;
    left: -1px;
  }
  &:after {
    bottom: 0;
    left: -1px;
  }
  rect {
    transform: scale(1.2, 1.5) translate(2px, -3px);
  }
  @include tiny {
    margin-left: -2rem;
  }
  @include mini {
    margin-left: -2rem;
  }
}
</style>
