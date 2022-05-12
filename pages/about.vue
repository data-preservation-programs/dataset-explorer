<template>
  <div :class="`page page-${tag}`">
    <div class="content-wrapper">
      <div class="grid">
        <div class="col-10_ti-12">
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

        </div>
        <div class="dotted-border" />
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
.heading {
  @include header;
  padding-bottom: 2rem;
  @include tiny {
    font-size: 3.125rem;
    padding-bottom: 2.5rem;
  }
}

.dotted-border {
  position: absolute;
  height: 100%;
  top: 0;
  width: 0.5rem;
  margin-left: -5rem;
  background-repeat: no-repeat;
  overflow: visible;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='6' y='-1.5' width='102.5%25' height='100.5%25' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
  &:before {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateY(-50%);
    width: 0.3125rem;
    height: 0.3125rem;
    left: .22rem;
    top: 0;
    @include tiny {
      top: 0.2rem;
    }
  }
  &:after {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(50%);
    width: 0.3125rem;
    height: 0.3125rem;
    bottom: 0;
    left: 0.0625rem;
  }
  @include tiny {
    margin-left: -2rem;
  }
}

.content-wrapper {
  position: relative;
  margin-top: 3rem;
  margin-right: 5.34375rem;
  margin-bottom: 7.125rem;
  margin-left: 5.34375rem;
  // margin: 3rem 5.34375rem 7.125rem 5.34375rem;
  @include tiny {
    margin-bottom: 2.125rem;
    margin-right: 0;
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
      border-radius: 0.5rem
    }
  }
}

.markdown-wrapper {
  padding-top: 3.125rem;
  @include tiny {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }
}

</style>
