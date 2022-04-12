<template>
  <section id="site-footer">
    <div class="dotted-border">
      <div class="grid-center">
        <div class="col-5">
          <LogoDatasetExplorer
            class="logo-block" />
        </div>
        <div class="col-5" data-push-left="off-2">
          <div class="nav-links">
            <template v-for="(link, index) in navLinks">
              <nuxt-link
                :key="index"
                :to="link.url"
                :class="'link'">
                {{ link.text }}
              </nuxt-link>
            </template>
          </div>
          <div class="info-text">
            <p>{{ content.info_text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'
import LogoDatasetExplorer from '@/components/logo-dataset-explorer'

// ====================================================================== Export
export default {
  name: 'SiteFooter',

  components: {
    LogoDatasetExplorer
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
  margin-top: 3rem;
}
.dotted-border {
  position: relative;
  margin-left: 11.625rem;
  margin-right: 18rem;
  margin-bottom: 5rem;
  border: 0 0 1rem 1rem;
  background-repeat: no-repeat;
  overflow: visible;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='105%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='6' y='5' width='102.5%25' height='105.5%25' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
  &::before {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateY(-50%);
    width: 0.3125rem;
    height: 0.3125rem;
    left: .22rem;
    bottom: -0.625rem;
  }
  &::after {
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(50%);
    width: 0.3125rem;
    height: 0.3125rem;
    top: 0.125rem;
    right: -0.625rem;
  }
}

.dotted-border>div {
  margin-left: 4.75rem;
  padding-top: 4rem;
}
// ///////////////////////////////////////////////////////////////////// Sections
.nav-links {
  @include fontWeight_Semibold;
  @include fontSize_Regular;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  .link {
    padding: 0 1rem;
  }
}

.info-text {
  @include fontWeight_Medium;
  @include fontSize_Medium;
  line-height: 2.1875rem;
  padding-top: 1.25rem;
  padding-left: 1rem;
}

</style>
