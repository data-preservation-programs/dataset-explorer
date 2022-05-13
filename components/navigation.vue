<template>
  <section id="nav">
    <div class="grid">
      <div class="col">
        <nav class="navigation">

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
              :class="link.class_names">
              {{ link.text }}
              <div class="dashed-border"></div>
            </component>
          </div>

          <HamburgerNav
            class="hamburger-nav"
            :links="links" />

        </nav>
      </div>
    </div>
  </section>
</template>

<script>
// ===================================================================== Imports
import { mapGetters } from 'vuex'

import Logo from '@/components/logo'
import HamburgerNav from '@/components/hamburger-nav'

// ====================================================================== Export
export default {
  name: 'Navigation',

  components: {
    Logo,
    HamburgerNav
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    navigation () {
      return this.siteContent.general.navigation
    },
    linkLogo () {
      return this.navigation.logo
    },
    links () {
      return this.navigation.links
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General

// ////////////////////////////////////////////////////////////////// Navigation
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-left: 1.75rem;
  padding-bottom: 4rem;
  @include small {
    padding-left: 1.5rem;
  }
  @include tiny {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
}

.logo-link {
  display: flex;
  flex-direction: row;
  padding-right: 2rem;
  transition: 250ms ease-out;
  @include mini {
    margin-bottom: 1rem;
  }
  @include tiny {
    margin-bottom: 0;
  }
  &:hover {
    transition: 250ms ease-in;
    transform: scale(1.05);
  }
}

.logo {
  width: 5.9375rem;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 1rem;
  @include tiny {
    display: none;
  }
}

.nav-link {
  @include leading_Large;
  @include fontWeight_Semibold;
  @include fontSize_Regular;
  text-transform: uppercase;
  margin-right: 3rem;
  @include mini {
    margin-right: 2rem;
  }
  .dashed-border {
    width: 100%;
    height: 0.25rem;
    transition: all 0.25s ease-in-out;
    transform: scale(0);
    position: relative;
    background-repeat: no-repeat;
    overflow: visible;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='-1' y='1' width='105.5%25' height='105.5%25' fill='none' stroke='blue' stroke-width='2' stroke-dasharray='1.5%2c 10' stroke-dashoffset='2 0' stroke-linecap='round'/%3e%3c/svg%3e");
    &::before {
      content: '';
      position: absolute;
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse ry='4' rx='4' cy='4' cx='4' fill='blue'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      transform: translateY(-50%);
      width: 0.3125rem;
      height: 0.3125rem;
      left: -0.1875rem;
      bottom: -0.125rem;
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
      bottom: 0;
      right: -0.25rem;
    }
  }
  @include tiny {
    margin-right: 0;
    &:first-child {
      margin-right: 3rem;
    }
  }
  &:hover {
    .dashed-border {
      transform: scale(1);
    }
  }
}

.hamburger-nav {
  display: none;
  @include tiny {
    display: block;
  }
}

</style>
