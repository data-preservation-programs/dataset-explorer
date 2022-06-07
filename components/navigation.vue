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
              <DottedBorder />
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

import DottedBorder from '@/components/dotted-border'

// ====================================================================== Export
export default {
  name: 'Navigation',

  components: {
    Logo,
    HamburgerNav,
    DottedBorder
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
  padding-bottom: 3rem;
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
  width: 5rem;
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
  position: relative;
  margin-right: 3rem;
  @include mini {
    margin-right: 2rem;
  }
  ::v-deep .dotted-border {
    transform: scale(0);
    transition: all 0.25s ease-in-out;
    rect {
      transform: scale(1.2, 1.5) translate(-3px, 24.5px);
    }
    &:before {
      bottom: 0;
      left: -1px;
    }
    &:after {
      bottom: 0;
      right: -1px;
    }
  }
  &:hover {
    ::v-deep .dotted-border {
      transform: scale(1);
    }
  }
  @include tiny {
    margin-right: 0;
    &:first-child {
      margin-right: 3rem;
    }
  }
}

////////////////////////////////////////////////////////////////// Hamburger Nav

.hamburger-nav {
  display: none;
  @include tiny {
    display: block;
  }
}

</style>
