<template>
  <section id="site-footer">
    <div class="grid">

      <div class="col-4_mi-12">
        <div class="panel-left">

          <nuxt-link
            :to="linkLogo.to"
            class="logo-link">
            <Logo class="logo" />
          </nuxt-link>

          <div class="links">
            <component
              :is="link.type"
              v-for="(link, index) in links"
              :key="index"
              :to="link.type === 'nuxt-link' ? link.url : undefined"
              :href="link.type === 'a' ? link.url : undefined"
              :target="link.target"
              class="footer-link link-hover left">
              {{ link.text }}
            </component>
          </div>

        </div>
      </div>

      <div class="col-8_mi-12">
        <div class="panel-right">

          <MarkdownParser :markdown="markdown" />

        </div>
      </div>

    </div>
  </section>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import Logo from '@/components/logo'
import MarkdownParser from '@/components/markdown-parser'

import FooterDescription from '@/content/markdown/footer.md'

// ====================================================================== Export
export default {
  name: 'SiteFooter',

  components: {
    Logo,
    MarkdownParser
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    footer () {
      return this.siteContent.general.footer
    },
    linkLogo () {
      return this.footer.logo
    },
    links () {
      return this.footer.links
    },
    markdown () {
      return FooterDescription
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#site-footer {
  padding-bottom: 5rem;
  @include tiny {
    padding-bottom: 1rem;
  }
}

.panel-right {
  padding-left: 3rem;
  @include mini {
    margin-top: 3rem;
    padding-left: 0;
  }
}

// ////////////////////////////////////////////////////////////////// Navigation
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.logo-link {
  display: block;
  margin-bottom: 2rem;
  transition: 250ms ease-out;
  &:hover {
    transition: 250ms ease-in;
    transform: scale(1.05);
  }
}

.logo {
  width: 15rem;
}

.links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-link {
  @include fontSize_Medium;
  @include leading_Large;
  @include textShadow;
  @include fontWeight_Semibold;
  display: inline-block;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
