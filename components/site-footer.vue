<template>
  <footer id="site-footer">
    <div class="grid">
      <div class="col">
        <div class="content-wrapper">
          <div class="inner-content">
            <div class="grid-center">
              <div class="col-5_sm-12">
                <LogoDatasetExplorer
                  class="logo-block" />
              </div>
              <div class="col-5_md-6_sm-12" data-push-left="off-2_md-1_sm-0">
                <nav>
                  <nuxt-link
                    v-for="(link, index) in navLinks"
                    :key="index"
                    :to="link.url"
                    :class="'link'">
                    {{ link.text }}
                  </nuxt-link>
                </nav>
                <div class="info-text">
                  <p>{{ content.info_text }}</p>
                </div>
              </div>
            </div>
            <DottedBorder />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'
import LogoDatasetExplorer from '@/components/logo-dataset-explorer'
import DottedBorder from '@/components/dotted-border'

// ====================================================================== Export
export default {
  name: 'SiteFooter',

  components: {
    LogoDatasetExplorer,
    DottedBorder
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    content () {
      return this.siteContent.general.footer.right_column
    },
    navLinks () {
      return this.content.nav_links
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#site-footer {
  padding-bottom: 4rem;
  margin-left: -0.5rem;
}

::v-deep .dotted-border {
  left: 0;
  &:before {
    bottom: -1px;
    left: -1px;
  }
  &:after {
    top: -1px;
    right: -1px;
  }
  rect {
    transform: scale(0.999, 0.999) translate(2px, 2px);
  }
}

.content-wrapper {
  position: relative;
}

.inner-content {
  padding-top: 4rem;
  margin-left: 4.5rem;
  padding-bottom: 1.18rem;
  @include small {
    margin-left: 2.5rem;
  }
  @include tiny {
    padding-top: 2.5rem;
    padding-bottom: 0.5rem;
  }
}
// //////////////////////////////////////////////////////////////////// Sections
.logo-block {
 padding-top: 0.5rem;
}

nav {
  @include fontWeight_Semibold;
  @include fontSize_Regular;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  .link {
    padding: 0 1rem;
    @include small {
      padding: 0 0.5rem;
    }
  }
  @include small {
    margin-left: -0.5rem;
  }
  @include tiny {
    display: flex;
    flex-direction: column;
    padding-top: 1.25rem;
  }
}

.info-text {
  @include fontWeight_Medium;
  @include fontSize_Medium;
  line-height: 2.1875rem;
  padding-top: 2.5rem;
  padding-left: 1rem;
  @include small {
    margin-left: -1rem;
  }
  @include tiny {
    padding-top: 1.75rem;
  }
}

</style>
